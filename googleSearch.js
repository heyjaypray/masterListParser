const googleAPI = "AIzaSyBZGVsByw2hYGpo40rm4xX12LKQumsk9vE"

var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
  key: googleAPI,
  cx: '012215341274280442454:x3e41iv-_14'
});
 
 
googleSearch.build({
  q: "boulter plywood",
  start: 1,
//   fileType: "pdf",
  gl: "countryUS", //geolocation, 
  lr: "lang_en",
  num: 3, // Number of search results to return between 1 and 10, inclusive 
  // siteSearch: "http://www.boulterplywood.com/" // Restricts results to URLs from a specified site 
}, function(error, response) {
    console.log(JSON.stringify(response, null, 2));
});

