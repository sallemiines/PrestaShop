const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./store');
let storeData = {
  name: 'Prestashop Store',
  adress: '3030 rue de boulvard',
  postcode: '75001',
  longitude: '12',
  latitude: '1',
  city: 'Paris',
  note: 'Store Contacts note',
  picture: 'store.jpg',
  phone: '123456789',
  fax: '123456789',
  email: 'demo@prestashop.com'
};
let contactData = {
  shopName: 'Prestashop Test',
  registrationNumber: '',
  shopAddress: '123123',
  city: 'Paris',
  phone: '123456789',
  fax: '123456789',
  shopEmail: 'demo@prestashop.com',
  postcode: '75001'
};

scenario('Create, edit, check and delete "Store"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createStore(storeData.name, storeData.adress, storeData.postcode, storeData.city, storeData.latitude, storeData.longitude, storeData.note, storeData.phone, storeData.fax, storeData.picture, storeData.email);
  common_scenarios.checkStore(storeData.name, storeData.adress, storeData.phone, storeData.fax, storeData.email);
  common_scenarios.editStore(storeData.name, storeData.name + 'update', storeData.adress + 'UP', storeData.fax + '00');
  common_scenarios.deleteStore(storeData.name + 'update');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

scenario('Create, check and delete "Store" in the Back Office with bulk actions', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createStore(storeData.name, storeData.adress, storeData.postcode, storeData.city, storeData.latitude, storeData.longitude, storeData.note, storeData.phone, storeData.fax, storeData.picture, storeData.email);
  common_scenarios.checkStore(storeData.name, storeData.adress, storeData.phone, storeData.fax, storeData.email);
  common_scenarios.deleteStoreWithBulkAction(storeData.name);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

scenario('Create, check "Contact details"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createContactDetails(contactData.shopName, contactData.shopEmail, contactData.registrationNumber, contactData.shopAddress, contactData.postcode, contactData.city, contactData.phone, contactData.fax);
  common_scenarios.checkContactDetails(contactData.shopName, contactData.shopEmail, contactData.registrationNumber, contactData.shopAddress, contactData.postcode, contactData.city, contactData.phone, contactData.fax);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
