var fs = require('fs');
const path = require('path');

const fastcsv = require('fast-csv');
const currDir = path.join(__dirname + '/../data/');



const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('userId');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

function createSTDResource() { 
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

Axios.post( 
  'http://localhost:8000/api/v1/get_token_payloads',
  bodyParameters,
  config
).then(console.log).catch(console.log);

}

async function run() {
    readdir(currDir).then((filenames) => {
        filenames = filenames.filter(filtercsvFiles);
      
        for (let i = 0; i < filenames.length; i++) {
          let currFilePath = currDir + filenames[i];
      
          //Use fast-csv to parse the files
          let csvData = [];
          fastcsv
            .parseFile(currFilePath)
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



  

  run();
