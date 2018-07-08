const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const commonProduct = require('../../common_scenarios/product');
let promise = Promise.resolve();

scenario('Filters by categories in catalog page', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Check the categories', client => {
    test('should go to categories page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.category_submenu));
    test('should check the', () => {
      return promise
        .then(() => client.getProductPageNumber('table-category'))
        .then(() => {
          if (global.productsPageNumber !== 0) {
            commonProduct.getCategories(global.productsPageNumber);
          }
          commonProduct.checkCategories(global.productsPageNumber);
        });
    }, 'product/product');
  }, 'product/product');
}, 'common_client');
