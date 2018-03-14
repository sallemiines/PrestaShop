const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Store} = require('../../../selectors/BO/shopParameters/contact_store');
const {ContactDetails} = require('../../../selectors/BO/shopParameters/contact_store');
const {StorePage} = require('../../../selectors/FO/store_page');
let promise = Promise.resolve();

module.exports = {
  createStore: function (name, adresse, postcode, city, latitude, longitude, note, phone, fax, picture, email) {
    scenario('Test case n°1 :Add new english store in Back office', client => {
      test('should go to "Shop Parameters > Contact" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu));
      test('should go to "Store" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.stores_tab));
      test('should click on "Add new store"', () => client.waitForExistAndClick(Store.add_new_store));
      test('should set the "Name" input in English language', () => client.waitAndSetValue(Store.name_input, name));
      test('should set the "Address" input in English language', () => client.waitAndSetValue(Store.adresse_input, adresse));
      test('should set the "Zip/postal code" input', () => client.waitAndSetValue(Store.postcode_input, postcode));
      test('should set the "City" input', () => client.waitAndSetValue(Store.city_input, city));
      test('should choose the "Country France"', () => client.waitAndSelectByValue(Store.shop_country_list, '8'));
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
      test('should click on "Active"', () => client.waitForExistAndClick(Store.active_button));
      test('should click on save button', () => client.waitForExistAndClick(Store.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(Store.success_panel, 'Successful creation.', "contain"));
      test('should search for the store by name', () => client.searchByValue(Store.search_name_input, Store.search_button, name));
      test('should get the store id', () => client.getTextValue(Store.store_id))
    }, 'contact_store');
  },
  checkStore: function (name, adresse, phone, fax, email) {
    scenario('Check the store creation in front office', client => {
      test('should access to the front office', () => {
        return promise
          .then(() => client.scrollWaitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1))
      });
      test('should set the shop language to "English"', () => client.changeLanguage());
      test('should go to "Stores" page', () => client.scrollWaitForExistAndClick(StorePage.store_page));
      test('should check the existence of the created store', () => client.waitForExist(StorePage.store_title.replace('%ID', global.text)));
      test('should check that the "Name" value is equal to "' + name + '"', () => client.checkTextValue(StorePage.store_title.replace('%ID', global.text), name.toUpperCase()));
      test('should check the "Adresse" value' + adresse + '"', () => client.checkTextValue(StorePage.adress_block.replace('%ID', global.text), adresse, 'contain'));
      test('should click on "About and Contact" link "', () => client.waitForExistAndClick(StorePage.store_contact_link.replace('%ID', global.text)));
      test('should check that the "Phone" value is equal to "' + phone + '"', () => client.checkTextValue(StorePage.card_block.replace('%ID', global.text).replace("%LI", 1), phone, 'contain'));
      test('should check that the "FAX " value is equal to "' + fax + '"', () => client.checkTextValue(StorePage.card_block.replace('%ID', global.text).replace("%LI", 2), fax, 'contain'));
      test('should check that the "Email" value is equal to "' + email + '"', () => client.checkTextValue(StorePage.card_block.replace('%ID', global.text).replace("%LI", 3), email, 'contain'));
    }, 'common_client');
  },

  editStore: function (name, updatedName, updatedAdresse, updatedFax) {
    scenario('Edit the created store', client => {
      test('should back to the back office"', () => client.switchWindow(0));
      test('should go to "Shop Parameters > Contact" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu));
      test('should go to "Store" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.stores_tab));
      test('should search for the store by name', () => client.searchByValue(Store.search_name_input, Store.search_button, name))
      test('should click on Edit button', () => client.waitForExistAndClick(Store.edit_button))
      test('should update the "Name" value to ' + updatedName + '"', () => client.waitAndSetValue(Store.name_input, updatedName));
      test('should update the "Adresse" value to' + updatedAdresse + '"', () => client.waitAndSetValue(Store.adresse_input, updatedAdresse));
      test('should update the "Fax" value to' + updatedFax + '"', () => client.waitAndSetValue(Store.fax_input, updatedFax));
      test('should click on save button', () => client.waitForExistAndClick(Store.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(Store.success_panel, 'Successful update.', "contain"));
    }, 'common_client');
  },

  deleteStore: function (name) {
    scenario('Delete the store  "' + name + '', client => {
      test('should go to "Shop Parameters > Contact" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu));
      test('should go to "Store" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.stores_tab));
      test('should search for the store by name', () => client.searchByValue(Store.search_name_input, Store.search_button, name));
      test('should delete the store', () => {
        return promise
          .then(() => client.waitForExistAndClick(Store.dropdown_button))
          .then(() => client.waitForExistAndClick(Store.delete_button))
      });
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(Store.success_panel, 'Successful deletion.', "contain"));
    }, 'common_client');
  },

  deleteStoreWithBulkAction: function (name) {
    scenario('Delete the created "Store"', client => {
      test('should back to the back office"', () => client.switchWindow(0));
      test('should go to "Shop Parameters > Contact" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu));
      test('should go to "Store" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.stores_tab));
      test('should search for the created store by name', () => client.searchByValue(Store.search_name_input, Store.search_button, name));
      test('should click on "Bulk action" button', () => client.waitForExistAndClick(Store.bulk_action_button));
      test('should click on "Select all" action', () => client.waitForExistAndClick(Store.action_button.replace('%ID', 1)));
      test('should click on "Bulk action" button', () => client.waitForExistAndClick(Store.bulk_action_button));
      test('should click on "Delete" action', () => {
        return promise
          .then(() => client.waitForExistAndClick(Store.action_button.replace('%ID', 7)))
          .then(() => client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(Store.success_panel, '×\nThe selection has been successfully deleted.'));
    }, 'common_client');

  },
  createContactDetails: function (name, email, registration_number, address, postcode, city, phone, fax) {
    scenario('Add the contact details', client => {
      test('should go to "Shop Parameters > Contact" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu));
      test('should go to "Store" page', () => client.waitForExistAndClick(Menu.Configure.ShopParameters.stores_tab));
      test('should set the " Shop name" input', () => client.waitAndSetValue(ContactDetails.shop_name, name));
      test('should set the "Shop email" input', () => client.waitAndSetValue(ContactDetails.shop_email, email));
      test('should set the "Registration number" input', () => client.waitAndSetValue(ContactDetails.shop_registration_number, registration_number));
      test('should set the "Shop address line 1" input', () => client.waitAndSetValue(ContactDetails.shop_adress, address));
      test('should set the "Zip/postal code" input', () => client.waitAndSetValue(ContactDetails.shop_postal_code, postcode));
      test('should set the "City" input', () => client.waitAndSetValue(ContactDetails.shop_city, city));
      test('should choose the "Country France"', () => client.waitAndSelectByValue(ContactDetails.shop_country_list, '8'));
      test('should set the " Phone" input', () => client.waitAndSetValue(ContactDetails.shop_phone, phone));
      test('should set the " Fax" input', () => client.waitAndSetValue(ContactDetails.shop_fax, fax));
      test('should click on save button', () => client.waitForExistAndClick(ContactDetails.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(Store.success_panel, 'The settings have been successfully updated.'));
    }, 'common_client');
  },
  checkContactDetails: function (name, email, registration_number, address, postcode, city, phone, fax) {
    scenario('Check the contact data in front office', client => {
      test('should access to the front office', () => {
        return promise
          .then(() => client.scrollWaitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1))
      });
      test('should set the shop language to "English"', () => client.changeLanguage());
      test('should go to "Store information" page', () => client.scrollTo(ContactDetails.store_informations_block));
      test('should check that the "Shop Name" value is equal to "' + name + '"', () => client.checkTextValue(ContactDetails.store_informations_block, name, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + email + '"', () => client.checkTextValue(ContactDetails.store_informations_block, email, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + registration_number + '"', () => client.checkTextValue(ContactDetails.store_informations_block, registration_number, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + address + '"', () => client.checkTextValue(ContactDetails.valu, address, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + postcode + '"', () => client.checkTextValue(ContactDetails.valu, postcode, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + city + '"', () => client.checkTextValue(ContactDetails.valu, city, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + phone + '"', () => client.checkTextValue(ContactDetails.valu, phone, 'contain'));
      test('should check that the "Shop Name" value is equal to "' + fax + '"', () => client.checkTextValue(ContactDetails.valu, fax, 'contain'));
    }, 'common_client');
  }
};
