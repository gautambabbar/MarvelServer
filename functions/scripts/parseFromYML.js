const path = require('path');
const fs = require('fs');
const YAML = require('yamljs');

const yamlRootDir = path.resolve(__dirname, '..', '..', 'data');

function parseToJson(callback) {
  fs.readdir(yamlRootDir, function (err, fileNames) {
    if (err) {
      console.error(err);
    }
    const fileReadPromise = [];
  
    fileNames.forEach(function (file) {
      fileReadPromise.push(new Promise(function (resolve, reject) {
        const filePath = path.resolve(yamlRootDir, file);
        YAML.load(filePath, function (obj) {
          const baseName = path.basename(filePath);
          const domainName = baseName.slice(0, baseName.lastIndexOf('.'));
          resolve({
            name: domainName,
            content: obj
          });
        });
      }));
    });
  
    Promise.all(fileReadPromise)
      .then(function (results) {
        callback(null, results);
        console.log('success');
      })
      .catch(function (err) {
        // console.log(err);
        callback(err);
      });
  });
}



module.exports = parseToJson;





