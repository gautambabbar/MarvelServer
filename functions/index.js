
const functions = require('firebase-functions');
const FAQDBService = require('./faqDBService');
const {getFAQParamText} = require('./helpers');

exports.faqFor = functions.https.onCall((data) => {
  const domainName = getFAQParamText(data.url);
  return FAQDBService.fetchFAQ(domainName);
});