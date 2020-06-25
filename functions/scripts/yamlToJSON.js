const FAQDBService = require('../faqDBService');
const parseToJson = require('./parseFromYML');
const output = require('./output');

parseToJson(async function(err, response) {
  response.forEach(r => {
    output(r.name, r.content);
  });
  console.log('success');
});