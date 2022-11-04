const fs = require('fs');

async function run() {
    fs.readFile("/data/test.csv", "utf8", function (err, data) {
        console.log(data);
      });
  }
   

  

  run();