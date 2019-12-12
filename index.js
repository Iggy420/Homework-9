const inquirer = require ('inquirer') ;
const open = require ('open') ;
const path = require ('path') ;
const fs = require ('fs');
const convertFactory = require('electron-html-to');

// two const questions to ask user

const questions= [
    {    message: "What is your favorite color?",
        type: "list",
        name: "FavoriteColor",
        choices: ["blue", "red", "green"]
    },
    {
        message: "What is your Github user name?",
        type: "input",
        name: "user name"
        
    }];

    
    inquirer
    inquirer.prompt(questions); 
// Acces token key for github
// 3da150a9c8b23083adf24381a5a5bcd0b3caa8e1
// $.getJSON( "https://api.github.com/users?since=135>; rel="next" ", function data ) {
console.log(data);
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });
 
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });
    
    
    
