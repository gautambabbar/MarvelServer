const path = require('path');
const fs = require('fs');
const YAML = require('yamljs');

const yamlRootDir = path.resolve(__dirname, '..', '..', 'data');

function parseToJson(callback) {
  fs.readdir(yamlRootDir, (err, fileNames) => {
    if (err) {
      console.error(err);
    }
    const fileReadPromise = [];
  
    fileNames.forEach((file)  => {
      fileReadPromise.push(new Promise( (resolve, reject) => {
        const filePath = path.resolve(yamlRootDir, file);
        YAML.load(filePath, (obj) => {
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
      .then( (results) => {
        console.log('success');
        callback(null, results);
        return results;
      })
      .catch((err) => {
        // console.log(err);
        callback(err);
      });
  });
}



module.exports = parseToJson;





