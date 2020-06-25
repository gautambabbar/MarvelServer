const FAQDBService = require('../faqDBService');
const parseToJson = require('./parseFromYML');

parseToJson(async function(err, jsonStrings) {
  if(err) {
    return;
  }
  await FAQDBService.setAllFAQs(jsonStrings);
  console.log('success');
});