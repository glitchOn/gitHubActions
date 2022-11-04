/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 994:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 594:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 674:
/***/ ((module) => {

module.exports = eval("require")("fast-csv");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var fs = __nccwpck_require__(147);
const path = __nccwpck_require__(17);
const fastcsv = __nccwpck_require__(674);
const currDir = __nccwpck_require__.ab + "data";
const core = __nccwpck_require__(994);
const github = __nccwpck_require__(594);
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
  core.info(`The event payload: ${payload}`);
  
//==================================≠≠≠≠≠====================≠≠≠≠≠≠≠≠
// Step 1 : "Get JWT token
//==================================≠≠≠≠≠====================≠≠≠≠≠≠≠≠
/* fetch("https://myDomain/api/login", {
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
        });*/
      
 run();
  /*
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

   
} catch (error) {
  core.setFailed(error.message);
}


async function run() {
    readdir(__nccwpck_require__.ab + "data").then((filenames) => {
        filenames = filenames.filter(filtercsvFiles);
      
        for (let i = 0; i < filenames.length; i++) {
          let currFilePath = __nccwpck_require__.ab + "data/" + filenames[i];
      
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

})();

module.exports = __webpack_exports__;
/******/ })()
;