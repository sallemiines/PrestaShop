module.exports = {
  changeStockProductQuantity: function (client, Stock, orderProduct, itemNumber, option = "add") {
    let promise = Promise.resolve();
    test('should change the third product quantity', () => {
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

  checkMovementHistory: function (client, Movement, movementIndex, itemNumber, option, type) {
    test('should go to "Movements" tab', () => client.goToStockMovements(Movement));
    test('should check movement history', () => client.checkMovement(Movement, movementIndex, itemNumber, option, type));
  },

  updateStockProductQuantity: function (Menu, Movement, Stock, productData, updatedQuantity, order, operator, arrowUP = false) {
    scenario('Update quantity of a product using the arrow button .', client => {
      test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
      test('should search for the product', () => client.searchByValue(Stock.search_input, Stock.search_button, productData.name + date_time));
      test('should pause', () => client.pause(2000));

      test('Should get the current quantity', () => client.getTextInVar(Stock.product_quantity.replace('%O', 1), "quantity"));
      for (let i = 1; i <= updatedQuantity; i++) {
        if (arrowUP) {
          test('should increase the quantity by ' + updatedQuantity + ' using the arrow up', () => client.modifyQuantity(Stock, 1, (Number(global.tab["quantity"]) + i).toString(), Stock.add_quantity_button));
        }
        else {
          test('should decrease the quantity by ' + updatedQuantity + ' using the arrow down', () => client.modifyQuantity(Stock, 1, (Number(global.tab["quantity"]) - i).toString(), Stock.remove_quantity_button));
        }
      }
      this.checkChanges(Menu, Movement, Stock, order, productData, operator, updatedQuantity, arrowUP);

    }, 'stocks');
  },


  updateProductQuantity: function (Menu, Movement, Stock, productData, updatedQuantity, order, operator, arrowUp) {
    scenario('Update quantity of a product using the arrow button .', client => {
      test('should go to "Stocks" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu));
      test('should search for the product', () => client.searchByValue(Stock.search_input, Stock.search_button, productData.name + date_time));
      test('should pause', () => client.pause(2000));
      test('Should get the current quantity', () => client.getTextInVar(Stock.product_quantity.replace('%O', 1), "quantity"));
      for (let i = 1; i <= updatedQuantity; i++) {

        test('should enter a negative quantity with the arrow down for one product in the field ', () => client.modifyQuantity(Stock, 1, (Number(global.tab["quantity"]) - i).toString(), Stock.remove_quantity_button));
      }
      this.checkChanges(Menu, Movement, Stock, order, productData, operator, updatedQuantity, arrowUp);

    }, 'stocks');
  },


  checkChanges: function (Menu, Movement, Stock, order, productData, operator, updatedQuantity, arrowUP) {
    scenario('check the changes made', client => {
      if (arrowUP) {
        test('Click on the "check" sign next to the input field', () => client.waitForExistAndClick(Stock.check_sign));
      }
      else {
        test('Click on the "apply new quantities" button', () => client.waitForExistAndClick(Stock.group_apply_button));
      }
      test('should ', () => client.pause(2000));
      test('Should check and close the green validation', () => client.waitForVisibleAndClick(Stock.green_validation));
      test('Should Verify if the quantity has been changed in physical column', () => client.checkTextValue(Stock.physical_column, global.tab["quantity"], 'notequal'));
      test('Should Verify if the quantity has been changed in available column', () => client.checkTextValue(Stock.available_column, global.tab["quantity"], 'notequal'));
      test('should click on "Movements" tab', () => client.goToStockMovements(Movement));
      test('should search for the product', () => client.searchByValue(Stock.search_input, Stock.search_button, 'FirstProduct' + date_time));
      test('should ', () => client.pause(2000));
      test('should check the Product name  ', () => client.checkTextValue(Stock.product_column.replace('%O', order), productData.name + date_time));
      test('should check the product reference ', () => client.checkTextValue(Stock.reference_product_column.replace('%O', order), productData.reference));
      test('should verify the new "Quantity" and "Type" of the changed product', () => client.checkMovement(Movement, order, updatedQuantity.toString(), operator, "Employee Edition"));
      test('should verify date', () => client.checkDate(Stock, order));
      test('should verify the hour', () => client.checkHour(Stock, order));
      test('should check the Employee name  ', () => client.checkTextValue(Stock.employee_column.replace('%O', order), 'Demo Prestashop'));
    }, 'stocks');
  }
};
