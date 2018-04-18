const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ModulePage} = require('../../../selectors/BO/module_page');
const {CommonSelectors} = require('../../../selectors/BO/common_selectors');
const module_common_scenarios = require('../../common_scenarios/module');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Install "Guaranteed Reviews Company " module', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Install "Guaranteed Reviews Company " module in the selection page', client => {
    module_common_scenarios.installTypeModule(client, ModulePage, CommonSelectors, Menu, "Guaranteed Reviews Company ", "steavisgarantis", "Official Partner");
  }, 'common_client');

  scenario('Check Configuration page of "Guaranteed Reviews Company " module', client => {
    module_common_scenarios.checkConfigPage(client, ModulePage, "steavisgarantis");
  }, 'common_client');

  scenario('Check the module "Guaranteed Reviews Company " is installed', client => {
    module_common_scenarios.checkModuleInstallation(client, ModulePage, Menu, "Guaranteed Reviews Company ", "steavisgarantis", false);
  }, 'common_client');

  scenario('Uninstall "Guaranteed Reviews Company " module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, CommonSelectors, "steavisgarantis");
  }, 'common_client');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);


