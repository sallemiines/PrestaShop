let promise = Promise.resolve();
module.exports = {
  changeStockProductQuantity: function (client, Stock, orderProduct, itemNumber, option = "add") {
    test('should change the product quantity', () => {
      promise
        .then(() => client.getTextInVar(Stock.product_quantity.replace('%O', orderProduct), "productQuantity"))
        .then(() => client.moveToObject(Stock.product_quantity_input.replace('%O', orderProduct)));
      if (option == "add") {
        for (let i = 1; i < itemNumber; i++) {
          promise = client.waitForExistAndClick(Stock.add_quantity_button);
        }
      } else {
        for (let i = 1; i < itemNumber; i++) {
          promise = client.waitForExistAndClick(Stock.remove_quantity_button);
        }
      }
      return promise
        .then(() => client.getTextInVar(Stock.product_quantity.replace('%O', orderProduct), "productQuantity"))
        .then(() => client.checkTextValue(Stock.product_quantity_modified.replace('%O', orderProduct), global.tab["productQuantity"].substring(18), "contain"));
    });
    test('should click on "Check" button of the third product quantity', () => client.waitForExistAndClick(Stock.save_product_quantity_button));
  },

  checkMovementHistory: function (client, Menu, Movement, movementIndex, itemNumber, option, type) {
    test('should go to "Movements" tab', () => {
      return promise
        .then(() => client.goToStockMovements(Menu, Movement))
        .then(() => client.pause(5000));
    });
    test('should check movement history', () => client.checkMovement(Movement, movementIndex, itemNumber, option, type));
  },

  updateStockProductQuantity: function (Menu, Movement, Stock, productData, updatedQuantity, position, operator, arrowUP = false, checkSign = false) {
    scenario('Update quantity of a product using the arrow button and check the change .', client => {
      test('should pause', () => client.pause(2000));
      test('Should get the current quantity', () => client.getTextInVar(Stock.product_quantity.replace('%O', position), "quantity"));
      for (let i = 1; i <= updatedQuantity; i++) {
        if (arrowUP) {
          test('should increase the quantity by ' + updatedQuantity + ' using the arrow up', () => client.modifyQuantity(Stock, position, (Number(global.tab["quantity"]) + i).toString(), Stock.add_quantity_button.replace('%ITEM', position)));
        }
        else {
          test('should decrease the quantity by ' + updatedQuantity + ' using the arrow down', () => client.modifyQuantity(Stock, position, (Number(global.tab["quantity"]) - i).toString(), Stock.remove_quantity_button.replace('%ITEM', position)));
        }
      }
      if (checkSign) {
        test('Click on the "check" sign ', () => client.waitForExistAndClick(Stock.check_sign));
      }
      else {
        test('Click on the "apply new quantities" button', () => client.waitForExistAndClick(Stock.group_apply_button));
      }
      test('Should check and close the green validation', () => client.waitForVisibleAndClick(Stock.green_validation));
      test('Should Verify if the quantity has been changed in physical column', () => client.checkTextValue(Stock.physical_column.replace('%ID', position), global.tab["quantity"], 'notequal'));
      test('Should Verify if the quantity has been changed in available column', () => client.checkTextValue(Stock.available_column.replace('%ID', position), global.tab["quantity"], 'notequal'));

    }, 'stocks');
  },

  CheckMovement: function (client, Menu, Movement, Stock, order, productData, operator, updatedQuantity) {
    test('should click on "Movements" tab', () => {
      return promise
        .then(() => client.goToStockMovements(Menu, Movement))
        .then(() => client.waitForExistAndClick(Stock.sort_product_icon.replace('%ID', 'asc'), 2000))
    });
    test('should check the Product name  ', () => client.checkTextValue(Stock.product_column.replace('%O', order), productData.name + date_time));
    test('should check the product reference ', () => client.checkTextValue(Stock.reference_product_column.replace('%O', order), productData.reference));
    test('should verify the new "Quantity" and "Type" of the changed product', () => client.checkMovement(Movement, order, updatedQuantity.toString(), operator, "Employee Edition"));
    test('should check the Employee name  ', () => client.checkTextValue(Stock.employee_column.replace('%O', order), 'Demo Prestashop'));
  },
};
