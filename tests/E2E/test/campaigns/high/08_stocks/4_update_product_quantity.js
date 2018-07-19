const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const commonStock = require('../../common_scenarios/stock');
const commonProduct = require('../../common_scenarios/product');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

let productData = [{
  name: 'FirstProduct',
  reference: 'firstProduct',
  quantity: "100",
  price: '5',
  image_name: 'image_test.jpg'
}, {
  name: 'SecondProduct',
  reference: 'secondProduct',
  quantity: "100",
  price: '5',
  image_name: 'image_test.jpg'
}];

scenario('Increase & decrease the quantity for one product using the arrow up/down button and save by the "Check sign" ', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    commonProduct.createProduct(AddProductPage, productData[0]);
    //commonProduct.createProduct(AddProductPage, productData[1]);
  }, 'stocks');

  scenario('Increase quantity of  products using the arrow up button .', client => {
    test('should go to "Stocks" page', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon.replace('%ID','asc'),2000))
        .then(() => client.pause(5000));
    });
    for (let i = 1; i <= 2; i++) {
      commonStock.updateStockProductQuantity(Menu, Movement, Stock, productData, 5, i, '+', true, true);
    }
  }, 'stocks');
  scenario('Verify the new "Quantity" and "Type" of the changed product', client => {
    commonStock.CheckMovement(client, Menu, Movement, Stock, 2, productData[0], '+', 5);
    commonStock.CheckMovement(client, Menu, Movement, Stock, 4, productData[1], '+', 5);
  }, 'stocks');

  scenario('Decrease quantity of products using the arrow down button .', client => {
    test('should go to "Stocks" page', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon.replace('%ID','asc'), 2000))
        .then(() => client.pause(5000));
    });
    for (let i = 1; i <= 2; i++) {
      commonStock.updateStockProductQuantity(Menu, Movement, Stock, productData, 3, i, '-', '', true);
    }
  }, 'stocks');

  scenario('Verify the new "Quantity" and "Type" of the changed product', client => {
    commonStock.CheckMovement(client, Menu, Movement, Stock, 1, productData[0], '-', 3);
    commonStock.CheckMovement(client, Menu, Movement, Stock, 4, productData[1], '-', 3);
  }, 'stocks');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks');
}, 'stocks');

scenario('Increase & decrease quantity for one product using the arrow up/down button and and save by the "Apply new quantities" button ', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  scenario('Increase quantity of  products using the arrow up button .', client => {
    test('should go to "Stocks" page', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon, 2000))
        .then(() => client.pause(5000));
    });
    for (let i = 1; i <= 2; i++) {
      commonStock.updateStockProductQuantity(Menu, Movement, Stock, productData, 2, i, '+', true, false);
    }
  }, 'stocks');

  scenario('Decrease quantity of products using the arrow  down button .', client => {
    test('should go to "Stocks" page', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon, 2000))
        .then(() => client.pause(5000));
    });
    for (let i = 1; i <= 2; i++) {
      commonStock.updateStockProductQuantity(Menu, Movement, Stock, productData, 4, i, '-', '', false);
    }
  }, 'stocks');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks', true);
}, 'stocks', true);

scenario('Change the quantity for one product entering the value in the field', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  scenario('Change the quantity for one product entering the value in the field, and click on the "check" sign', () => {
    test('should go to "Stocks" page', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon, 2000))
        .then(() => client.pause(5000));
    });
    for (let i = 1; i <= 2; i++) {
      test('should set the "Quantity" of the product to 50', () => client.modifyProductQuantity(Stock, i, 50));
    }
  }, 'stocks');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks', true);
}, 'stocks', true);

/**
 * This scenario is based on the bug described in this ticket
 * http://forge.prestashop.com/browse/BOOM-5789
 **/
scenario('Enter a negative quantity with keyboard for one product in the field ', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  scenario('Change the quantity for one product entering the value in the field, and click on the "check" sign', client => {
    test('should go to "Stocks" page', () => {
      return promise
        .then(() => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon, 2000))
        .then(() => client.pause(5000));
    });
    test('should set the "Quantity" of the  product -10', () => client.modifyProductQuantity(Stock, 1, -10));
  }, 'stocks');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'stocks', true);
}, 'stocks', true);



