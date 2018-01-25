// const Scraper = require("email-crawler");
// const GoogleSearch = require('google-search');
const fs = require('fs')
var Scraper = require("email-crawler");
var recursively = require('recursively');
const emailScraper = require('./emailScraper.js');
const googleSearch = require('./googleSearch.js');
const output = require("./output.json")
// const data2 = require("./data2.JSON")

// let customers = []
// let emailList = []
// let websites = [];
var a;


var Database = function(name, email, website) {
    this.name = name;
	this.email = email;
	this.website = website;
};

//Here in the paranthesis you need to find 
//a way to pass all 3 parameters for each search...






//run through JSON file to grab Company Names and Push to Array


    

    function search(){
        for (var i=0; i< 10; i++){
        
        
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

              var websites = response.items[0].link
              var company = response.items[0].title
             
              
              console.log("website " + websites)


              var a = new Database(company, "emailList", websites);
              var makeJSON = function() {
                  fs.appendFile('data2.json',JSON.stringify(a, null, 2) + ',', function(err) {
                      err ? console.log(err) : console.log('Content added...');
                  });
              }             
              makeJSON();
              
        
              
          });


          
        };
    };





//Google Search With Names of Companies from 'Customers' Array




//Will eventually use this function to scrap emails and add to array
function scrape(){
    var emailScraper = new Scraper(websites)
    emailScraper.getLevels(2).then((emails) => {
        console.log(emails);   
        emails=emails;
    })
    .catch((e) => {
        console.log("error");
    })
};


//Promise so that it wont do google search until array push is done
var startApp = new Promise (function(resolve, reject){
    if (true) {
        search();

        console.log("stuff")

        
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

