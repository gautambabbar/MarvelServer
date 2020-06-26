const admin = require("firebase-admin");
const {PROJECT_ID, FAQ_COLLECTION_NAME} = require('./constants');
const serviceAccount = require("./configs/firebase-admin-service-key.json");
const defaultFAQS = require('./defaultsFAQs.json');

admin.initializeApp({
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


class FAQDBService {
  static fetchFAQ(domain) {
    return db.collection(FAQ_COLLECTION_NAME).doc(domain).get().then((doc) => {
      if (doc.exists) {
        return {
          data: [
            ...doc.data().data,
            ...defaultFAQS
          ]
        }
      }
      else {
        return {data: defaultFAQS};
      }
    });
  }

  static setFAQS(domain, content) {
    return db.collection(FAQ_COLLECTION_NAME).doc(domain).set({
      data: content
    });
  }

  static setAllFAQs(domains = []) {
    return domains.map((domainObj) => {
      return db.collection(FAQ_COLLECTION_NAME).doc(domainObj.name).set({
      data: domainObj.content
    })});
  }
}

module.exports = FAQDBService;