const admin = require("firebase-admin");
const {PROJECT_ID, FAQ_COLLECTION_NAME} = require('./constants');
const serviceAccount = require("./configs/firebase-admin-service-key.json");

admin.initializeApp({
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

class FAQDBService {
  static fetchFAQ(domain) {
    return db.collection(FAQ_COLLECTION_NAME).doc(domain).get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      else {
        return {data: []};
      }
    });
  }

  static setFAQS(domain, content) {
    return db.collection(FAQ_COLLECTION_NAME).doc(domain).set({
      data: content
    });
  }
}

module.exports = FAQDBService;