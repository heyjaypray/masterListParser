const { Requester } = require("node-duckduckgo");
const requester = new Requester("node-duckduckgo-example");
requester.request("jay pray", (err, response, body) => {
  if (err) {
    console.log(JSON.stringify(err, null, 2));
    return;
  }
  console.log(JSON.stringify(body, null, 2));
});