var Scraper = require("email-crawler");
const output = require("./ctList.json");
const fs = require('fs');


var counter = 0;

function scrape(name, website, phone, address1, address2, city, state, zip){

  var emailScraper = new Scraper(website);
  console.log(website)
  counter++;

  emailScraper.getLevels(2).then((emails) => {
    // console.log(emails); // Here are the emails crawled from traveling two levels down this domain

    
    const companyInfo = [name, website, emails, phone, address1, address2, city, state, zip]
    fs.appendFile('newCustomerListWithEmails.csv', companyInfo.join(',') + '\n', function(err){
      err ? console.log(err) : console.log('Content added...' + counter)
      console.log(emails)
    })
  })
  .catch((e) => {
    console.log("error");
  })



}






function search(){


  for (var i=0; i< 2; i++){

    var name=output[i].Company;
    var website=output[i].Website;
    var phone=output[i].Phone;
    var address1=output[i].Address1;
    var address2=output[i].Address2;
    var city=output[i].City;
    var state=output[i].State;
    var zip=output[i].Zip;


    scrape(name, website, phone, address1, address2, city, state, zip)

  };
};



  search();







  