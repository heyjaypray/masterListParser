var Scraper = require("email-crawler");
var emailScraper = new Scraper("http://portadoor.com");
var emailList = [];
// A level is how far removed (in  terms of link clicks) a page is from the root page (only follows same domain routes)

// emailScraper.getLevels(2).then((emails) => {
//   console.log(emails); // Here are the emails crawled from traveling two levels down this domain

// })
// .catch((e) => {
//   console.log("error");
// })

module.exports = {
  emailScraper:emailScraper
}



