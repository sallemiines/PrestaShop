var PrestashopClient = require('./prestashop_client');
var {selector} = require('../globals.webdriverio.js');

class Order extends PrestashopClient {


  goToOrdersList() {
    return this.client
      .waitForExist(selector.BO.OrderPage.orders_subtab, 90000)
      .moveToObject(selector.BO.OrderPage.orders_subtab)
      .waitForExist(selector.BO.OrderPage.order_submenu, 90000)
      .click(selector.BO.OrderPage.order_submenu)
  }

  clickOnAddNewOrderButton() {
    return this.client
      .waitForExist(selector.BO.OrderPage.new_order_button, 90000)
      .click(selector.BO.OrderPage.new_order_button)
  }

  searchCustumer(customerName) {
    return this.client
      .waitForExist(selector.BO.OrderPage.customer_search_input, 90000)
      .setValue(selector.BO.OrderPage.customer_search_input, customerName)
      .waitForExist(selector.BO.OrderPage.choose_customer_button, 90000)
      .click(selector.BO.OrderPage.choose_customer_button)
  }

  searchProduct(productName, qty) {
    return this.client
      .waitForExist(selector.BO.OrderPage.product_search_input, 90000)
      .setValue(selector.BO.OrderPage.product_search_input, productName)
  }

  selectProductType(type) {
    return this.client
      .scroll(0, 900)
      .waitForExist(selector.BO.OrderPage.product, 9000)
      .selectByValue(selector.BO.OrderPage.product, type)
  }

  selectProductCombination(combination) {
    return this.client
      .waitForExist(selector.BO.OrderPage.product_combination, 9000)
      .selectByValue(selector.BO.OrderPage.product_combination, combination)

  }

  addProductQuantity(qty) {
    return this.client
      .waitForExist(selector.BO.OrderPage.quantity_input, 90000)
      .setValue(selector.BO.OrderPage.quantity_input, qty)
  }

  clickOnAddToCartButton() {
    return this.client
      .waitForExist(selector.BO.OrderPage.add_to_cart_button, 90000)
      .click(selector.BO.OrderPage.add_to_cart_button)
  }

  getBasicPriceValue() {
    return this.client
      .waitForExist(selector.BO.OrderPage.basic_price_value, 90000)
      .then(() => this.client.getValue(selector.BO.OrderPage.basic_price_value))
      .then((price) => global.basic_price = price)
  }

  selectDelivery() {
    return this.client
      .scroll(0, 900)
      .waitForExist(selector.BO.OrderPage.delivery_option, 90000)
      .selectByIndex(selector.BO.OrderPage.delivery_option, 1)
  }

  checkShippingPrice(price) {
    return this.client
      .pause(2000)
      .waitForExist(selector.BO.OrderPage.shipping_price, 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.shipping_price))
      .then((value) => {
        expect(value).to.eql(price)
      })
  }

  addOrderMessage(mesageOrder) {
    return this.client
      .scroll(0.900)
      .waitForExist(selector.BO.OrderPage.order_message, 90000)
      .setValue(selector.BO.OrderPage.order_message, mesageOrder)
  }

  selectPayment() {
    return this.client
      .waitForExist(selector.BO.OrderPage.payment, 90000)
      .selectByIndex(selector.BO.OrderPage.payment, 0)
  }

  selectOrderStatus() {
    return this.client
      .waitForExist(selector.BO.OrderPage.order_state_select, 90000)
      .selectByValue(selector.BO.OrderPage.order_state_select, '2')
  }

  clickOnCreateOrder() {
    return this.client
      .waitForExist(selector.BO.OrderPage.create_order_button, 90000)
      .click(selector.BO.OrderPage.create_order_button)
  }

  checkOrderStatus(status, rang = "") {
    return this.client
      .waitForExist(selector.BO.OrderPage.order_check_status.replace('%number', rang), 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.order_check_status.replace('%number', rang)))
      .then((status_txt) => {
        expect(status_txt).to.eql(status)
      })
  }

  checkShippingCost(cost) {
    return this.client
      .waitForExist(selector.BO.OrderPage.check_shipping_Cost, 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.check_shipping_Cost))
      .then((value) => {
        expect(value).to.eql(cost)
      })
  }

  checkOrderMessage(message) {
    return this.client
      .waitForExist(selector.BO.OrderPage.check_message_order, 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.check_message_order))
      .then((value) => {
        expect(value).to.eql(message)
      })
  }

  checkPayment(payment) {
    return this.client
      .waitForExist(selector.BO.OrderPage.check_payment_type, 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.check_payment_type))
      .then((value) => {
        expect(value).to.eql(payment)
      })

  }

  checkQuantity(qty) {
    return this.client
      .waitForExist(selector.BO.OrderPage.check_quantity, 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.check_quantity))
      .then((value) => {
        expect(value).to.eql(qty)
      })
  }

  checkProductInformations(color, productName, reference, size) {
    return this.client
      .waitForExist(selector.BO.OrderPage.product_Url, 9000)
      .then(() => this.client.getText(selector.BO.OrderPage.product_Url))
      .then((value) => {
        expect(value).to.contains(color, productName, reference, size);
      })
  }

  checkCustomer(customerName) {
    return this.client
      .waitForExist(selector.BO.OrderPage.customer_name, 90000)
      .then(() => this.client.getText(selector.BO.OrderPage.customer_name))
      .then((name) => {
        expect(name).to.contain(customerName);
      })
  }

  checkBasicPrice() {
    return this.client
      .scroll(0, 600)
      .waitForExist(selector.BO.OrderPage.edit_product_button, 90000)
      .click(selector.BO.OrderPage.edit_product_button)
      .waitForExist(selector.BO.OrderPage.product_basic_price, 90000)
      .then(() => this.client.getValue(selector.BO.OrderPage.product_basic_price))
      .then((basicPrice) => {
        expect(basicPrice).to.eql(global.basic_price);
      })
  }

  updateStatus(value) {
    return this.client
      .execute(function () {
        document.querySelector('#id_order_state').style = "";
      })
      .selectByValue(selector.BO.OrderPage.order_state_select, value)
      .then(() => this.client.getValue(selector.BO.OrderPage.order_state_select))
      .then((order) => global.order_status = order)
  }

  clickOnUpdateStatusButton() {
    return this.client
      .waitForExist(selector.BO.OrderPage.update_order_status_button, 90000)
      .click(selector.BO.OrderPage.update_order_status_button)
  }

}

module.exports = Order;
