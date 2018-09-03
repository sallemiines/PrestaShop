const {Menu} = require('../../../selectors/BO/menu.js');
const commonOrder = require('../../common_scenarios/order');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
let promise = Promise.resolve();

/*scenario('Open the browser login successfully in the Front Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
}, 'common_client');

scenario('Create orders and change the stats to "Shipped"', () => {
  for (let i = 1; i <= 3; i++) {
    commonOrder.createOrderFO();
    scenario('Logout from the Front Office', client => {
      test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO))
    }, 'common_client', true);
    scenario('Login in the Back Office ', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
      commonOrder.updateStatus("Shipped");
      //commonOrder.getDeliveryInformations();
    }, 'common_client');
    scenario('Login to the Front Office and create a new order ', client => {
      test('should go to the Front Office', () => {
        return promise
          .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1))
      });
      test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    }, 'common_client');
  }
}, 'order');*/
scenario('Open the browser login successfully in the Back Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
}, 'common_client');


scenario('Verify all the informations on the deliveries slips', client => {
  test('should go to the orders list', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
  test('should search for the created orders by stats "shipped" and Date', () => {
    return promise
      .then(() => client.waitAndSelectByVisibleText('//*[@id="table-order"]/thead/tr[2]/th[9]/select', 'Shipped'))
      .then(() => client.waitForExistAndClick('//*[@id="submitFilterButtonorder"]'))
      .then(() => client.getTextInVar('//*[@id="form-order"]/div/div[1]/span[1]', 'total'))
  });
}, 'order');

scenario('etgr', client => {
  for (let i = 1; i <= global.tab['total']; i++) {
    test('should go to the created order', () => client.waitForExistAndClick(OrderPage.order_view_button.replace("%ORDERNumber",i)));
    commonOrder.getDeliveryInformations();
    test('should click on "DOCUMENTS" subtab', () => client.scrollWaitForExistAndClick(OrderPage.document_submenu));
    test('should get the credit slip name', () => client.getDocumentName(OrderPage.delivery_document_name));
    test('should go to the Delivery slips ', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.delivery_slips_submenu));

  }

}, 'order');
