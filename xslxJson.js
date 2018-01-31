xlsxj = require("xlsx-to-json");
xlsxj({
  input: "ctList2.xlsx", 
  output: "ctList.json"
}, function(err, result) {
  if(err) {
    console.error(err);
  }else {
    console.log(result);
  }
});