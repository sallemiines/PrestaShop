const {AccessPageFO} = require('../../selectors/FO/access_page');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {DesignPage} = require('../../selectors/BO/design_page');
const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();
module.exports = {
  changeCurrentImage() {
    scenario('Add a new logo"', client => {
      test('should go to "Theme & Logo" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu, Menu.Improve.Design.theme_logo_submenu));
      test('should click on "Add file" button', () => client.uploadPicture("theme_logo.jpg", DesignPage.image, "PS_LOGO"));
      test('should click on "Save" button', () => client.waitForExistAndClick(DesignPage.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(DesignPage.green_validation, '×\nThe settings have been successfully updated.'));
      test('should get the image attribute value', () => client.getAttributeValue(DesignPage.header_logo, 'src'))
    }, 'change_logo');
  },
  checkImage() {
    scenario('Check the logo appearance in front office', client => {
      test('should access to the front office', () => {
        return promise
          .then(() => client.scrollWaitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1))
      });
      test('should check the shop logo  ', () => client.checkAttributeValue(AccessPageFO.logo_shop_page, 'src', global.value))
    }, 'common_client');
  },

  exportCurrentTheme(path) {
    scenario('Export the current theme', client => {
      test('should go to "Theme & Logo" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu, Menu.Improve.Design.theme_logo_submenu));
      test('should click on "Export current theme" button', () => client.waitForExistAndClick(DesignPage.export_theme_button));
      test('should check the green validation', () => client.waitForVisible(DesignPage.green_validation));
      test('should check that the current theme is successfully exported', () => client.checkFile(path + '/', 'classic.zip', 1000));
      test('should check the exported files', () => client.zipp(path + '/classic.zip', path));
    }, 'change_logo');
  }
};

