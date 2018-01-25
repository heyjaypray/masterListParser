// const Scraper = require("email-crawler");
// const GoogleSearch = require('google-search');
const fs = require('fs')
var recursively = require('recursively');
const emailScraper = require('./emailScraper.js');
const googleSearch = require('./googleSearch.js');
const output = require("./output.json")

let customers = []
let websites = []



//run through JSON file to grab Company Names and Push to Array


    

    function search(){
        for (var i=0; i< 5; i++){

        googleSearch.googleSearch.build({
            //Q is the search query built into NPM package
            q: output[i].Customer,
            start: 1,
    
            gl: "countryUS",
            lr: "lang_en",
            num: 1, 
            // siteSearch: response.items[0].link 
          }, function(error, response) {
              console.log(response.items[0].link);

              websites.push()

              console.log("website " + websites)
        
              
          });

        };
    };





//Google Search With Names of Companies from 'Customers' Array




//Will eventually use this function to scrap emails and add to array
function scrape(){
    var emailScraper = new Scraper("http://portadoor.com")
    emailScraper.getLevels(2).then((emails) => {
        console.log(emails);   
    })
    .catch((e) => {
        console.log("error");
    })
};





//Promise so that it wont do google search until array push is done
var startApp = new Promise (function(resolve, reject){
    if (customers = output.length) {
        resolve("asdf")
        search();
        
    } else{
        reject("failure")
    }
});

//Then Perform Search Function
startApp.then(function(q){
    console.log('searching')
    
})









  //Loop through JSON to get Customer Names
  //push business name to an array
  //Loop through array for google research terms **
  //with the top listed site link - go through site and scrape emails **
  //create new JSON Object with Name, Website, Email, Date Last Modified **

