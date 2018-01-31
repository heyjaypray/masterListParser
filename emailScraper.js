var Scraper = require("email-crawler");
const output = require("./ctList.json");
const fs = require('fs');




var counter = 0;

const scrape = async (website) => {
  var emailScraper = new Scraper(website);
  console.log(website)

  emailScraper
    .getLevels(1)
    .then((emails) => {
      const companyInfo = [website, emails]
      console.log('Emails', emails)
      // fs.appendFile('newCustomerListWithEmails.csv', companyInfo.join(',') + '\n', function(err){
      //   err ? console.log(err) : console.log('Content added...' + counter)
      //   console.log(emails)
      // })

      counter++;
      console.log(counter)
    })


    .catch((e) => {
      console.log("error");
    })
}






function search(){

  for (var i=0; i < 2; i++){
    // var name=output[i].Company;
    var website=output[i].Website;
    // var phone=output[i].Phone;
    // var address1=output[i].Address1;
    // var address2=output[i].Address2;
    // var city=output[i].City;
    // var state=output[i].State;
    // var zip=output[i].Zip;


    scrape(website)

  };
};



  search();







  