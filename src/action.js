var fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const currDir = path.join(__dirname + '/../data/');
const core = require('@actions/core');
const github = require('@actions/github');
const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dirname, (error, filenames) => {
        if (error) {
          reject(error);
        } else {
          resolve(filenames);
        }
      });
    });
  };
  const filtercsvFiles = (filename) => {
    return filename.split('.')[1] == 'csv';
  };
try {
  // `who-to-greet` input defined in action metadata file
  const userId = core.getInput('userId');
  console.log(userId)

  const password = core.getInput('userId');
  console.log(password)

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  
//==================================≠≠≠≠≠====================≠≠≠≠≠≠≠≠
// Step 1 : "Get JWT token
//==================================≠≠≠≠≠====================≠≠≠≠≠≠≠≠
/*fetch("https://myDomain/api/login", {
    method: "POST",
    body: JSON.stringify({ username: "username", password: "password" }),
    headers: { "Content-type": "application/json" }
  })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res.token;
      })
      .then((token) => {
        fetchlist(token)
        $('.clickMe').click(function(){
          // alert(this.id);
          fetchSingle(token)
        });
      });
  
  //==================================≠≠≠≠≠====================≠≠≠≠≠≠≠≠
  // Step 2 : "Get Object list
  //==================================≠≠≠≠≠====================≠≠≠≠≠≠≠≠
  const fetchlist = (token) => {
    const baseUrl = "https://myDomain/api/request/"
      fetch(baseUrl, {
        headers: {Authorization: `Bearer ${token}`}
      })
          .then((response) => {
            if (response.status == 200) {
              // alert ("json ok");
              // console.log(response);
              return response.json();
            } else {
              throw new Error("NETWORK RESPONSE ERROR");
            }
          })
          .then((data) => {
             console.log(data);
          })
          .catch(error => {
            console.error(error)
          });
    } */

    run();
} catch (error) {
  core.setFailed(error.message);
}


async function run() {
    readdir(currDir).then((filenames) => {
        filenames = filenames.filter(filtercsvFiles);
      
        for (let i = 0; i < filenames.length; i++) {
          let currFilePath = currDir + filenames[i];
      
          //Use fast-csv to parse the files
          let csvData = [];
          fastcsv            
            .parseFile(currFilePath,      { headers: true })
            .on('data', (data) => {
                    console.log(data);
                    console.log(currFilePath);

            })
            .on('end', () => {
              csvData.shift();


            });
        }
      });


  }
