const path = require('path');
const fs = require('fs');

const outputDir = path.resolve(__dirname, '..', '..', 'output');

function output(domainName, content) {
  const outputFileName = path.resolve(outputDir, domainName + '.json');

  fs.writeFile(outputFileName, JSON.stringify(content, null, 2), function (err) {
    if (err) {
      console.error('error');
    }
    console.log("success");
  });
}

module.exports = output;