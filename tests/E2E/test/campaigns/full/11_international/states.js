const {Menu} = require('../../../selectors/BO/menu.js');
const {States} = require('../../../selectors/BO/international/states')
let promise = Promise.resolve();

module.exports = {
  createState(name, isoCode) {
    scenario('Create new state', client => {
      test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
      test('should go to "States" page', () => client.waitForExistAndClick(Menu.Improve.International.states_tab));
      test('should click on "Add new state"', () => client.waitForExistAndClick(States.add_new_state));
      test('should set the "Name" input', () => client.waitAndSetValue(States.name_input, name));
      test('should set the "Iso Code" input', () => client.waitAndSetValue(States.iso_code_input, isoCode));
      test('should select the country "Indonesia"', () => client.waitAndSelectByValue(States.country_list, '111'));
      test('should select the Zone "Asia" ', () => client.waitAndSelectByValue(States.zone_list, '3'));
      test('should enable the state status', () => client.waitForExistAndClick(States.status_on));
      test('should click on save button', () => client.waitForExistAndClick(States.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(States.success_panel, 'Successful creation.', "contain"));
    }, 'common_client');
  },
  editState(name, updatedNamed, updatedIsoCode) {
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

  checkState(name, isoCode) {
    scenario('Check the state creation', client => {
      test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
      test('should go to "States" page', () => client.waitForExistAndClick(Menu.Improve.International.states_tab));
      test('should search for the state by name', () => client.searchByValue(States.search_name_input, States.search_button, name))
      test('should check that the "Name" value is equal to "' + name + '"', () => client.checkTextValue(States.state_name, name));
      test('should check that the "ISO code" value is equal to "' + isoCode + '"', () => client.checkTextValue(States.state_iso_code, isoCode));
      test('should check that the "Zone" value is equal to "Asia"', () => client.checkTextValue(States.state_zone, 'Asia'));
      test('should check that the "Country" value is equal to "Indonesia"', () => client.checkTextValue(States.state_country, 'Indonesia'));
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
  }
};
