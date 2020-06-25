const FAQDBService = require('../faqDBService');
const parseToJson = require('./parseFromYML');
const output = require('./output');

parseToJson(async (err, response) => {
  if(err) {
    return;
  }
  response.forEach(r => {
    output(r.name, r.content);
  });
  console.log('success');
});