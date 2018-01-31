var Scraper = require("email-crawler");
const output = require("./ctList.json");
const fs = require('fs');
var Crawler = require("crawler");


function crawler(website, bodyText) {
  var c = new Crawler({
    rateLimit: 1000,
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
            bodyText = ($("body").text());
            
            var emails = extractEmails(bodyText)
            console.log(emails)
            

        }
        done();
    }
  });

  c.queue(website);
}

function extractEmails (bodyText)
{
  return bodyText.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}





function search(){

  for (var i=0; i < 5; i++){
    // var name=output[i].Company;
    var website=output[i].Website;
    // var phone=output[i].Phone;
    // var address1=output[i].Address1;
    // var address2=output[i].Address2;
    // var city=output[i].City;
    // var state=output[i].State;
    // var zip=output[i].Zip;


    crawler(website)

  };
};



  search();







  