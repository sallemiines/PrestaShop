const {Menu} = require('../../../selectors/BO/menu.js');
const {Store} = require('../../../selectors/BO/shopParameters/contact_store');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
let promise = Promise.resolve();

module.exports = {
  createStore(name, adresse, postcode, city, latitude, longitude, note, phone, fax, picture, email) {
    scenario('Test case n°1 :Add new english store in Back office', client => {
      test('should go to "Shop parameters" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu));
      test('should go to "Store" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.stores_tab));
      test('should click on "Add new store"', () => client.waitForExistAndClick(Store.add_new_store));
      test('should set the "Name" input in English language', () => client.waitAndSetValue(Store.name_en_input, name));
      test('should set the "Address" input in English language', () => client.waitAndSetValue(Store.adresse_en_input, adresse));
      test('should set the "Zip/postal code" input', () => client.waitAndSetValue(Store.postcode_input, postcode));
      test('should set the "City" input', () => client.waitAndSetValue(Store.city_input, city));
      test('should choose the "Country France"', () => client.waitAndSelectByValue(Store.country_list, '8'));
      test('should set the "Latitude" input', () => client.waitAndSetValue(Store.latitude_input, latitude));
      test('should set the "Longitude" input', () => client.waitAndSetValue(Store.longitude_input, longitude));
      test('should set the " Phone" input', () => client.waitAndSetValue(Store.phone_input, phone));
      test('should set the " Fax" input', () => client.waitAndSetValue(Store.fax_input, fax));
      test('should set the " Email address" input', () => client.waitAndSetValue(Store.email_address_input, email));
      test('should set the " Note" input in English language', () => client.waitAndSetValue(Store.note_en_input, note));
      test('should upload the store picture', () => client.uploadPicture(picture, Store.picture, 'hide'));
      test('should set the hours of week day by day ', () => {
        return promise
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '1'), '09:00AM - 07:00PM'))
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '2'), '09:00AM - 07:00PM'))
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '3'), '07:00AM - 07:00PM'))
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '4'), '09:00AM - 07:00PM'))
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '5'), '09:00AM - 07:00PM'))
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '6'), '08:00AM - 07:00PM'))
          .then(() => client.waitAndSetValue(Store.hours_day_input.replace('%ID', '7'), '10:00AM - 04:00PM'))
      });
      test('should search for the created store', () => client.searchByValue('//*[@id="table-store"]/thead/tr[2]/th[3]/input','//*[@id="submitFilterButtonstore"]',name));
      test('should get the id', () => client.getTextInVar(Store.active_button));
      test('should click on "Active"', () => client.waitForExistAndClick(Store.active_button));
      test('should click on save button', () => client.waitForExistAndClick(Store.save_button))
      test('should verify the appearance of the green validation', () => client.checkTextValue(Store.success_panel, 'Successful creation.', "contain"));
    }, 'common_client');
  },
  checkStore(name, adresse, postcode, city, latitude, longitude, note, phone, fax, picture, email) {
    scenario('Check the store creation in front office', client => {
      test('should access to the front office', () => client.accessToFO(AccessPageFO));
      test('should set the shop language to "English"', () => client.changeLanguage('english'));
      test('should go to "Stores" page', () => client.scrollWaitForExistAndClick('//*[@id="link-static-page-stores-2"]'))
      //test('should check the created store', () => client.waitForVisible();
      //test('should search for the store', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.standard.name + date_time));
      //test('should check that the "Name" value is equal to "' + name + '"', () => client.checkTextValue(States.state_name, name));
      //test('should check that the "ISO code" value is equal to "' + isoCode + '"', () => client.checkTextValue(States.state_iso_code, isoCode));
      //test('should check that the "Zone" value is equal to "Asia"', () => client.checkTextValue(States.state_zone, 'Asia'));
      //test('should check that the "Country" value is equal to "Indonesia"', () => client.checkTextValue(States.state_country, 'Indonesia'));*/
    }, 'common_client');
  },

  /*editState(name, updatedNamed, updatedIsoCode) {
    scenario('Edit the created state', client => {
      test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
      test('should go to "States" page', () => client.waitForExistAndClick(Menu.Improve.International.states_tab));
      test('should search for the state by name', () => client.searchByValue(States.search_name_input, States.search_button, name))
      test('should click on Edit button', () => client.waitForExistAndClick(States.edit_button))
      test('should set the "Name" input', () => client.waitAndSetValue(States.name_input, updatedNamed));
      test('should set the "ISO Code" input', () => client.waitAndSetValue(States.iso_code_input, updatedIsoCode));
      test('should disable the state status', () => client.waitForExistAndClick(States.status_off));
      test('should click on save button', () => client.waitForExistAndClick(States.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(States.success_panel, 'Successful update.', "contain"));
    }, 'common_client');
  },



  deleteState(name) {
    scenario('Delete State  "' + name + '', client => {
      test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
      test('should go to "States" page', () => client.waitForExistAndClick(Menu.Improve.International.states_tab));
      test('should search for the state by name', () => client.searchByValue(States.search_name_input, States.search_button, name))
      test('should delete the catalog rule price', () => {
        return promise
          .then(() => client.waitForExistAndClick(States.dropdown_button))
          .then(() => client.waitForExistAndClick(States.delete_button))
      });
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(States.success_panel, 'Successful deletion.', "contain"));
    }, 'common_client');
  },

  deleteStateWithBulkActions(name) {
    scenario('Delete the created state with bulk actions', client => {
      test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
      test('should go to "States" page', () => client.waitForExistAndClick(Menu.Improve.International.states_tab));
      test('should search for the state by name', () => client.searchByValue(States.search_name_input, States.search_button, name));
      test('should select the state', () => client.waitForExistAndClick(States.selected_state));
      test('should click on "Bulk actions" button', () => client.waitForExistAndClick(States.bulk_actions_button));
      test('should choose "Deleted selected" action', () => client.waitForExistAndClick(States.delete_selected_item));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(States.success_panel, 'The selection has been successfully deleted.', "contain"));
    }, 'common_client');
  }*/


};
