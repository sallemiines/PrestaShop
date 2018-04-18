const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ModulePage} = require('../../../selectors/BO/module_page');
const {CommonSelectors} = require('../../../selectors/BO/common_selectors');
const module_common_scenarios = require('../../common_scenarios/module');
const {Menu} = require('../../../selectors/BO/menu.js');

scenario('Install native module made by PrestaShop', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Install "Legal Compliance" module in the selection page', client => {
    module_common_scenarios.installTypeModule(client, ModulePage, CommonSelectors, Menu, "Legal Compliance", "ps_legalcompliance", "Made by PrestaShop", 'true');
  }, 'common_client');

  scenario('Check Configuration page of "Legal Compliance" module', client => {
    module_common_scenarios.checkConfigPage(client, ModulePage, "ps_legalcompliance");
  }, 'common_client');

  scenario('Check the module "Legal compliance" is installed', client => {
    module_common_scenarios.checkModuleInstallation(client, ModulePage, Menu, "Legal Compliance", "ps_legalcompliance", true);
  }, 'common_client');

  scenario('Uninstall "Legal compliance" module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, CommonSelectors, "ps_legalcompliance");
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

