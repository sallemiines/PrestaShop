var CommonClient = require('./common_client');

class ContactStore extends CommonClient {

  getTextValue(selector) {
    return this.client
      .waitForExist(selector, 90000)
      .getText(selector)
      .then(function (text) {
        global.text = text;
      })
  }
}

module.exports = ContactStore;
