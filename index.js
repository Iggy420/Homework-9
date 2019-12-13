const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require('html-pdf');

class DoMyHomework {
  constructor() {
    this.githubUserName = null;
    this.color = null;
  }

  promptUser() {
    return inquirer.prompt([
      {
        message: 'What is your user name',
        name: 'githubUserName'
      },
      {
          message: 'What is your favorite color?',
          name: 'color'
      }
      
    ]).then(({ githubUserName }) => {
      this.githubUserName = githubUserName;
      this.makeApiRequest();
    })
  }

  makeApiRequest() {
    return Promise.all(
      [
        axios.get(`https://api.github.com/users/${this.githubUserName}`),
        axios.get(`https://api.github.com/users/${this.githubUserName}/starred`)
      ])
      .then((
        [
          {
            data:
            {
              avatar_url,
              location,
              name,
              blog,
              bio,
              public_repos,
              followers,
              following,
              html_url
            }
          },
          {
            data:
            {
              length
            }
          }
        ]
      ) => {
        this.avatar_url = avatar_url;
        this.location = location;
        this.name = name;
        this.blog = blog;
        this.bio = bio;
        this.html_url = html_url;
        this.public_repos = public_repos;
        this.followers = followers;
        this.following = following;
        console.log('THIS', this);
        this.createHtml();
      })
  }

  createHtml() {
    this.html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Javascript Fetch Api Example</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="style.css"/>
        <style>
        .image {
            background_color: ${this.color};
            text-align: center;
            position: relative;
        }
        .login{
            background_color: ${this.color};
            text-align: center;
        }
        .bio{
            text-align: center;
        }
        .repositories{
            float: left;
          width: 50%;
            text-align: center;
        }
        .stars{
            float: left;
        
          width: 50%;
            text-align: center;
        }
        .followers{
            float: right;
          width: 50%;
            text-align: center;
        }
        .following{
            float: right;
          width: 50%;
            text-align: center;
        }
        </style>
      </head>
      <body>
         <div class="container">
            <div style="background-color:rosybrown;color:black;" class="jumbotron">
                <div>
                    <img src="${this.avatar_url}" />
                    <h2 class="login">${this.githubUserName}</h2>
                </div>
              <div >
                <h2 class="bio">${this.bio}</h2>
              </div>
              <div class="row">
              <div class="repositories">
                <h2>Public repositories:${this.public_repos}</h2>
              </div>
              <div class="followers">
                <h2>Followers:${this.followers}</h2>
              </div>
            </div>
            <div class="row">
            <div>
            <h4>location:${this.location}</h4>
            <a href="${this.html_url}">Github Page</a>
            </div>
              <div class="stars">
                  <h2>Github Stars:</h2>
                </div>  
              <div class="following">
                <h2>Following:${this.following}</h2>
              </div>
            </div>
         </div>
    
       </body>
      <!-- jQuery library -->
      <script
      src="https://code.jquery.com/jquery-3.4.1.js"
      integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
      crossorigin="anonymous"></script>
      <script src="index.js"></script>
    </html> 
    `;

    this.createPdf();
  }

  createPdf() {
    pdf.create(this.html).toFile('./class-test.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  }

}

var newHomework = new DoMyHomework();
newHomework.promptUser();
