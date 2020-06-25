const FAQDBService = require('../faqDBService');
const parseToJson = require('./parseFromYML');

parseToJson(async (err, jsonStrings) => {
  if(err) {
    return;
  }
  await FAQDBService.setAllFAQs(jsonStrings);
  console.log('success');
});