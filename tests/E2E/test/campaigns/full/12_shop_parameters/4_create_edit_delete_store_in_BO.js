const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./store');
let storeInformation = {
  name: 'storeTest',
  adresse: 'TE',
  postcode: '30211',
  longitude: '12',
  latitude: '1',
  city: 'Paris',
  noteFR: 'note',
  noteEN: 'TE',
  picture: 'store.jpg',
  phone: '123456789',
  fax: '12345',
  email: 'test@test.com'
};

scenario('Create, edit, check and delete "Store"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createStore(storeInformation.name, storeInformation.adresse, storeInformation.postcode, storeInformation.city, storeInformation.latitude, storeInformation.longitude, storeInformation.noteEN, storeInformation.phone, storeInformation.fax, storeInformation.picture, storeInformation.email);
  common_scenarios.checkStore(storeInformation.name, storeInformation.adresse, storeInformation.postcode, storeInformation.city, storeInformation.latitude, storeInformation.longitude, storeInformation.noteEN, storeInformation.phone, storeInformation.fax, storeInformation.picture, storeInformation.email);
  // common_scenarios.editState(StateInformation.name, StateInformation.name + 'update', StateInformation.isoCode + 'UP');
  // common_scenarios.checkState(StateInformation.name + 'update', StateInformation.isoCode + 'UP');
  // common_scenarios.deleteState(StateInformation.name + 'update');
  // scenario('Logout from the Back Office', client => {
  //   test('should logout successfully from Back Office', () => client.signOutBO());
  // }, 'common_client');
}, 'common_client');
/*

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
*/
