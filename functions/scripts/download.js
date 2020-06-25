const FAQDBService = require('../faqDBService');
const output = require('./output');


function downloadFAQ() {
  const args = process.argv.slice(2);
  console.log(args);
  if(args && Array.isArray(args)) {
    args.forEach(async argument =>  {
      const domainName = argument;
      const faqs = await FAQDBService.fetchFAQ(domainName);
      output(domainName, faqs);
    });
  }
  else {
    console.log('domain name not provided')
  }
}

downloadFAQ();