const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ModulePage} = require('../../../selectors/BO/module_page');
const {CommonSelectors} = require('../../../selectors/BO/common_selectors');
const module_common_scenarios = require('../../common_scenarios/module');
let path = require('path');

scenario('Install,check and uninstall "PrestaShop Security" module', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Install "PrestaShop Security" module by uploading a ZIP file', client => {
    module_common_scenarios.installZipModule(client, ModulePage, "v1.1.7-prestafraud.zip", "prestafraud")
  }, 'common_client');

  scenario('Check the configuration page of "PrestaShop Security" module', client => {
    module_common_scenarios.checkConfigPage(client, ModulePage, "prestafraud");
  }, 'common_client');
  scenario('Uninstall "PrestaShop Security" module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, CommonSelectors, "prestafraud", false);
  }, 'common_client');
  scenario('Check the module folder is still exist ', client => {
    module_common_scenarios.checkModuleUninstallation(client, path.join(__dirname, '../../../../../../modules/'), "prestafraud", true);
  }, 'module');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client')
}, 'common_client', true);

scenario('Install,check and uninstall "PrestaShop Security" with deleting the folder module', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Install "PrestaShop Security" module by uploading a ZIP file', client => {
    module_common_scenarios.installZipModule(client, ModulePage, "v1.1.7-prestafraud.zip", "prestafraud")
  }, 'common_client');

  scenario('Check Configuration page of "PrestaShop Security" module', client => {
    module_common_scenarios.checkConfigPage(client, ModulePage, "prestafraud");
  }, 'common_client');
  scenario('Uninstall "PrestaShop Security" module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, CommonSelectors, "prestafraud", true);
  }, 'common_client');
  scenario('Check that the module folder is successfully deleted', client => {
    module_common_scenarios.checkModuleUninstallation(client, path.join(__dirname, '../../../../../../modules/'), "prestafraud", false);
  }, 'module');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);


