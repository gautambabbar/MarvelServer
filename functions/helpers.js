var url = require('url');

function getFAQParamText(urlText) {
  let hostname = url.parse(urlText).hostname;
  if (hostname.startsWith('www.')) {
    hostname = hostname.slice(4);
  }
  return hostname;
}

module.exports = {
  getFAQParamText
}