const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const commonStock = require('../../common_scenarios/stock');
const commonProduct = require('../../common_scenarios/product');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

let productData = {
  name: 'FirstProduct',
  reference: 'firstProduct',
  quantity: "100",
  price: '5',
  image_name: 'image_test.jpg'
};


scenario('Increase & decrease the quantity for one product using the arrow up/down button and check the product movement ', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  commonProduct.createProduct(AddProductPage, productData);
  commonStock.updateStockProductQuantity(Menu, Movement, Stock, productData, 2, 2, '+', true);
  commonStock.updateStockProductQuantity(Menu, Movement, Stock, productData, 3, 3, '-');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks');
}, 'stocks', true);

scenario('Enter a negative quantity with the arrow down for one product in the field', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  commonStock.updateProductQuantity(Menu, Movement, Stock, productData, 4, 4, '-', true);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks');
}, 'stocks', true);


scenario('Change the quantity for one product entering the value in the field', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  scenario('Change the quantity for one product entering the value in the field', client => {
    test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
    test('should search for the product', () => client.searchByValue(Stock.search_input, Stock.search_button, productData.name + date_time));
    test('should set the "Quantity" of the second product to 50', () => client.modifyProductQuantity(Stock, 1, 50));
  }, 'stocks');
  commonStock.checkChanges(Menu, Movement, Stock, 5, productData, '+', 50, true)
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks');
}, 'stocks', true);

/*
scenario('Enter a negative quantity with keyboard for one product in the field', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  scenario('Change the quantity for one product entering the value in the field', client => {
    test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
    test('should search for the product', () => client.searchByValue(Stock.search_input, Stock.search_button, productData.name + date_time));
    test('should set the "Quantity" of the second product to 50', () => client.modifyProductQuantity(Stock, 1, -10));
  }, 'stocks');
  commonStock.checkChanges(Menu, Movement, Stock, 6, productData, '-', -10 , true)
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks');
}, 'stocks');
*/
