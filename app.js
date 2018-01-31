// const Scraper = require("email-crawler");
// const GoogleSearch = require('google-search');
const fs = require('fs')
var Scraper = require("email-crawler");
var recursively = require('recursively');
const emailScraper = require('./emailScraper.js');
const googleSearch = require('./googleSearch.js');
const output = require("./ctList.json")
// const Promise = require('promise')
// const data2 = require("./data2.JSON")

// let customers = []
// let emailList = []
// let websites = [];
var a;

var newArray = [];


var Database = function(name, email, website) {
    this.name = name;
	this.email = email;
	this.website = website;
};

//Here in the paranthesis you need to find 
//a way to pass all 3 parameters for each search...






//run through JSON file to grab Company Names and Push to Array

let counter = 0;
    
const searchForSite = function(name, contactInfo, mainPhone, street1, street2, city, state, zipCode) {
    

    googleSearch.googleSearch.build({
      q: name,
      start: 1,
      gl: 'countryUS',
      lr: 'lang_en',
      num: 2
    }, function(error, response) {

      const websites = response.items[0].link
      const website2 = response.items[1].link

      counter++

      
      const companyInfo = [name, websites, website2, contactInfo, mainPhone, street1, street2, city, state, zipCode]
      fs.appendFile('ctCustomerList1.csv', companyInfo.join(',') + '\n', function(err){
        err ? console.log(err) : console.log('Content added...' + counter)
      })


    })



  };

function search(){


  for (var i=1779; i< output.length; i++){

    var name=output[i].Customer;
    var contactInfo = output[i].primaryContact; 
    var mainPhone = output[i].mainPhone; 
    var street1 = output[i].Street1; 
    var street2 = output[i].Street2; 
    var city = output[i].City; 
    var state = output[i].State;
    var zipCode = output[i].Zip;

    searchForSite(name, contactInfo, mainPhone, street1, street2, city, state, zipCode, emailScraper)

  };
};



  search();




//Will eventually use this function to scrap emails and add to array



  //Loop through JSON to get Customer Names
  //push business name to an array
  //Loop through array for google research terms **
  //with the top listed site link - go through site and scrape emails **
  //create new JSON Object with Name, Website, Email, Date Last Modified **

