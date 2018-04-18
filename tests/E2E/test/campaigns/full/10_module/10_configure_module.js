const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ModulePage} = require('../../../selectors/BO/module_page');
const {Menu} = require('../../../selectors/BO/menu');
const {CommonSelectors} = require('../../../selectors/BO/common_selectors');
const module_common_scenarios = require('../../common_scenarios/module');

scenario('Configure "Payments by check" module', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Search for the "Payments by check" module', client => {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should set the name of the module in the search input', () => client.waitAndSetValue(ModulePage.module_selection_input, 'ps_checkpayment'));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.selection_search_button));
    test('should click on "Configure" button', () => client.waitForExistAndClick(ModulePage.configure_module_button.split('%moduleTechName').join('ps_checkpayment')));
  }, 'common_client');

  scenario('Configure "Payments by check" module', client => {
    test('should set the "Payee" ', () => client.waitAndSetValue(ModulePage.ModulePaymentsByCheckPage.payee_input, 'France'));
    test('should set the "Adress" ', () => client.waitAndSetValue(ModulePage.ModulePaymentsByCheckPage.adress_input, 'Boulvard street n°9 - 70501'));
    test('should click on "Save" button', () => client.waitForExistAndClick(ModulePage.ModulePaymentsByCheckPage.save_button));
    test('should check the green validation', () => client.waitForVisible(ModulePage.ModulePaymentsByCheckPage.green_validation));
  }, 'common_client');

  scenario('Reset the configured module', client => {
    module_common_scenarios.resetModule(client, ModulePage, CommonSelectors, Menu, 'Payments by check', 'ps_checkpayment');
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
