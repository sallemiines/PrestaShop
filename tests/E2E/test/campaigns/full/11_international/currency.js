const {Menu} = require('../../../selectors/BO/menu.js');
const {Currencies} = require('../../../selectors/BO/international/currencies');
let promise = Promise.resolve();

module.exports = {
  createCurrency(isoCode, exchange_rate_value) {
    scenario('Create catalog price rules', client => {
      test('should go to "Currencies" tab', () => {
        return promise
          .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
          .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
      });
      test('should click on "Add new currency" button', () => client.waitForExistAndClick(Currencies.add_new_button));
      test('should choose the "US Dollar (USD)" currency', () => client.waitAndSelectByValue(Currencies.currencies_list, isoCode));
      test('should set the "Exchange rate" Value', () => client.waitAndSetValue(Currencies.exchange_rate_input, exchange_rate_value));
      test('should enable the "Currency status"', () => client.waitForExistAndClick(Currencies.currency_status));
      test('should click on "Save" button', () => client.waitForExistAndClick(Currencies.save_button));
      test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  updateExchangeRate(isoCode, exchangeRate) {
    scenario('Update the created currency', client => {
      test('should go to "Currencies" tab', () => {
        return promise
          .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
          .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
      });
      test('should search for the created currency by the "ISO CODE" ', () => client.searchByValue(Currencies.iso_code_input, Currencies.search_button, isoCode))
      test('should click on "Update" button ', () => client.waitForExistAndClick(Currencies.exchange_rate_update_button))
      test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nThe settings have been successfully updated.'));
      test('should check that the "Exchange rate" value is successfully updated', () => client.checkTextValue(Currencies.exchange_rate_value, exchangeRate, 'notequal'))
    }, 'common_client');
  },
  editCurrencyStatus(isoCode) {
    scenario('Edit the created currency', client => {
      test('should go to "Currencies" tab', () => {
        return promise
          .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
          .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
      });
      test('should search for the created currency by the "ISO CODE" ', () => client.searchByValue(Currencies.iso_code_input, Currencies.search_button, isoCode))
      test('should click on "Edit" button ', () => client.waitForExistAndClick(Currencies.edit_button))
      test('should change the currency status ', () => client.waitForExistAndClick(Currencies.currency_status));
      test('should click on "Save" button', () => client.waitForExistAndClick(Currencies.save_button));
      test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nSuccessful update.'));
    }, 'common_client');
  },
  deleteCurrency(isoCode) {
    scenario('Delete cureency', client => {
      test('should go to "Currencies" tab', () => {
        return promise
          .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
          .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
      });
      test('should search for the created currency by the "ISO CODE" ', () => client.searchByValue(Currencies.iso_code_input, Currencies.search_button, isoCode))
      test('should click on the dropdown menu " ', () => client.client.waitForExistAndClick(Currencies.dropdown_button))
      test('should choose the "Delete" button" ', () => {
        return promise
          .then(() => client.waitForExistAndClick(Currencies.delete_button))
          .then(() => client.alertAccept())
      });
      test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nSuccessful deletion.'));
    }, 'common_client');
  }
};



