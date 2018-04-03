var CommonClient = require('./common_client');

class ChangeLogo extends CommonClient {
  getAttributeValue(selector, attribute) {
    return this.client
      .waitForExist(selector, 90000)
      .getAttribute(selector, attribute)
      .then(function (value) {
        global.value = value;
        console.log(value);
      })
  }
}

module.exports = ChangeLogo;
