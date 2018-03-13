const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./states');
let StateInformation = {
  name: 'StateTest',
  isoCode: 'TE',
};

scenario('Create, edit, check and delete "State" in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createState(StateInformation.name, StateInformation.isoCode);
  common_scenarios.checkState(StateInformation.name, StateInformation.isoCode);
  common_scenarios.editState(StateInformation.name, StateInformation.name + 'update', StateInformation.isoCode + 'UP');
  common_scenarios.checkState(StateInformation.name + 'update', StateInformation.isoCode + 'UP');
  common_scenarios.deleteState(StateInformation.name + 'update');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

scenario('Create, check and delete "State" in the Back Office with bulk actions', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createState(StateInformation.name + 'BulkAction', StateInformation.isoCode);
  common_scenarios.checkState(StateInformation.name + 'BulkAction', StateInformation.isoCode);
  common_scenarios.deleteStateWithBulkActions(StateInformation.name + 'BulkAction');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
