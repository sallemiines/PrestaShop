const CommonClient = require('./common_client');
let fs = require('fs');
let path = require('path');
//const unzip = require('unzip');

let cmd = require('node-cmd');

class ChangeLogo extends CommonClient {
  getAttributeValue(selector, attribute) {
    return this.client
      .waitForExist(selector, 90000)
      .getAttribute(selector, attribute)
      .then(function (value) {
        global.value = value;
        console.log(value);
      })
  }

  //to_do unzipp the file and check the folders//
  zipp(path, folderPath) {
    cmd.get(
      'unzip' + path + ' -d ' + folderPath + '&& ls',
      function (err, data, stderr) {
        console.log('err: ' + err);
        console.log('the current dir contains these files :\n\n', data);
      }
    );

  }

  checkFile(folderPath, fileName, pause = 0) {
    fs.stat(folderPath + fileName, function (err, stats) {
      err === null && stats.isFile() ? global.existingFile = true : global.existingFile = false;
      console.log(stats.size)

    });
    return this.client
      .pause(pause)
      .then(() => expect(global.existingFile).to.be.true)
  }

  //checkDoc(folderPath, docname, pause = 0) {
  //  fs.stat(folderPath + docname, function (err, stats) {
  //    err === null && stats.isDirectory() ? global.existingDoc = true : global.existingDoc = false;
  //    console.log(stats)
  //  });
  //  return this.client
  //    .pause(pause)
  //    .then(() => expect(global.existingDoc).to.be.true)
  //}

}

module.exports = ChangeLogo;
