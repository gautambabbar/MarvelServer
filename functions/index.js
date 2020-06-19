
const functions = require('firebase-functions');
const FAQDBService = require('./faqDBService');
const {getFAQParamText} = require('./helpers');

exports.faqFor = functions.https.onCall((data) => {
  const domainName = getFAQParamText(data.url);
  return FAQDBService.fetchFAQ(domainName);
});


exports.faqForHTTP = functions.https.onRequest( async (req, res) => {
  const domainName = req.query.domainName;
  const faqs = await FAQDBService.fetchFAQ(domainName);
  res.json(faqs);
});

exports.setFaqForHTTP = functions.https.onRequest(async (req, res) => {
  const {
    domainName, 
    faqs
  } = req.body;
  await FAQDBService.setFAQS(domainName, faqs);
  res.json({result: `faqs set for ${domainName}`});
})