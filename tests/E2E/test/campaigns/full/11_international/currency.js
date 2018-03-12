const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Currencies} = require('../../../selectors/BO/international/currencies');
let promise = Promise.resolve();

scenario('Add CRUD for Currencies', client => {
  scenario('Open the browser and connect to the BO', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Case N°1 : Add a new currency in BO', client => {
    test('should go to "Currencies" tab', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
        .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
    });
    test('should click on "Add new currency" button', () => client.waitForExistAndClick(Currencies.add_new_button));
    test('should choose the "US Dollar (USD)" currency', () => client.waitAndSelectByValue(Currencies.currencies_list, 'USD'));
    test('should set the "Exchange rate" Value', () => client.waitAndSetValue(Currencies.exchange_rate_input, '2'));
    test('should enable the "Currency status"', () => client.waitForExistAndClick(Currencies.currency_status));
    test('should click on "Save" button', () => client.waitForExistAndClick(Currencies.save_button));
    test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nSuccessful creation.'));
  }, 'common_client');

  scenario('Case N°2 : Update the exchange rates', client => {
    test('should go to "Currencies" tab', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
        .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
    });
    test('should search for the created currency by "ISO CODE" and Update the exchange rates', () => {
      return promise
        .then(() => client.searchByValue(Currencies.iso_code_input, Currencies.search_button, 'USD'))
        .then(() => client.waitForExistAndClick(Currencies.exchange_rate_update_button))
    });
    test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nThe settings have been successfully updated.'));
    test('should check that the value is successfully updated', () => client.checkTextValue(Currencies.exchange_rate_value, '2', 'notequal'))
  }, 'common_client');

  scenario('Case N°3 : Edit the currency', client => {
    test('should go to "Currencies" tab', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
        .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
    });
    test('should search for the currency and click on "Edit" button', () => {
      return promise
        .then(() => client.searchByValue(Currencies.iso_code_input, Currencies.search_button, 'USD'))
        .then(() => client.waitForExistAndClick(Currencies.edit_button))

    });
    test('should change the currency status ', () => client.waitForExistAndClick(Currencies.currency_status));
    test('should click on "Save" button', () => client.waitForExistAndClick(Currencies.save_button));
    test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nSuccessful update.'));
  }, 'common_client');

  scenario('Case N°4 : Delete the currency', () => {
    test('Go to currencies page ', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu))
        .then(() => client.waitForExistAndClick(Menu.Improve.International.currencies_tab))
    });
    test('should search for the currency and click on "Delete" button', () => {
      return promise
        .then(() => client.searchByValue(Currencies.iso_code_input, Currencies.search_button, 'USD'))
        .then(() => client.waitForExistAndClick(Currencies.dropdown_button))
        .then(() => client.waitForExistAndClick(Currencies.delete_button))
        .then(() => client.alertAccept())
    });
    test('should check that the success alert message is well displayed ', () => client.checkTextValue(Currencies.green_validation, '×\nSuccessful deletion.'));
    test('should logout successfully from the Front Office', () => client.signOutBO(AccessPageBO));
  }, 'common_client');
}, 'common_client', true);

