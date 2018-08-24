const {CreditSlip} = require('../../../selectors/BO/order');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

require('./7_credit_slip');

scenario('Generate and check a Credit slips options ', () => {
  scenario('Open the browser and login successfully in the Back Office ', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Change the credit slip prefix ', client => {
    test('should go to "Credit slip" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.credit_slips_submenu));
    test('should change the credit slip prefix value', () => client.waitAndSetValue(CreditSlip.credit_slip_prefix_input, 'PrefixTest'));
    test('should click on "Save" button', () => client.waitForExistAndClick(CreditSlip.save_button));
    test('should check the green validation message', () => client.checkTextValue(CreditSlip.green_validation, 'The settings have been successfully updated.', 'contain'));
  }, 'common_client');

  scenario('Verify the prefix value', client => {
    test('should click on "Download credit slip" button', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(CreditSlip.download_btn.replace('%ID', global.tab['OrderID'].replace("#", ''))))
        .then(() => client.pause(5000));
    });
    test('should check the existence of "prefix value" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, 'PrefixTest'));
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
