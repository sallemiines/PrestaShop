const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();
const {ProductList} = require('../../selectors/BO/add_product_page');
const {AddProductPage} = require('../../selectors/BO/add_product_page');
const {CategorySubMenu} = require('../../selectors/BO/catalogpage/category_submenu');
global.categories = new Array('Home');
global.productCategories = new Array('Home');
var async = require("async");

/**** Example of product data ****
 * var productData = {
 *  name: 'product_name',
 *  reference: 'product_reference',
 *  quantity: 'product_quantity',
 *  price: 'product_price',
 *  image_name: 'picture_file_name',
 *  type: "product_type(standard, pack, virtual)",
 *  attribute: {
 *      name: 'attribute_name',
 *      variation_quantity: 'product_variation_quantity'
 *  },
 *  feature: {
 *      name: 'feature_name',
 *      value: 'feature_value'
 *  },
 *  pricing: {
 *      unitPrice: "product_unit_price",
 *      unity: "product_unity",
 *      wholesale: "product_wholesale",
 *      type: 'percentage',
 *      discount: 'product_discount'
 *  }
 * };
 */
module.exports = {
  createProduct: function (AddProductPage, productData) {
    scenario('Create a new product in the Back Office', client => {
      test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should click on "New Product" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));
      test('should set the "Name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, productData["name"] + date_time));
      test('should set the "Reference"', () => client.waitAndSetValue(AddProductPage.product_reference, productData["reference"]));
      test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, productData["quantity"]));
      test('should set the "Price" input', () => client.setPrice(AddProductPage.priceTE_shortcut, productData["price"]));
      test('should upload the first product picture', () => client.uploadPicture(productData["image_name"], AddProductPage.picture));

      if (productData.hasOwnProperty('type') && productData.type === 'pack') {
        scenario('Add the created product to pack', client => {
          test('should select the "Pack of products"', () => client.waitAndSelectByValue(AddProductPage.product_type, 1));
          test('should add products to the pack', () => client.addPackProduct(productData['product']['name'] + date_time, productData['product']['quantity']));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('attribute')) {
        scenario('Add Attribute', client => {
          test('should select the "Product with combination" radio button', () => client.scrollWaitForExistAndClick(AddProductPage.variations_type_button));
          test('should go to "Combinations" tab', () => client.scrollWaitForExistAndClick(AddProductPage.variations_tab));
          test('should select the variation', () => {
            if (productData.type === 'combination') {
              return promise
                .then(() => client.createCombination(AddProductPage.combination_size_m, AddProductPage.combination_color_beige))
            } else {
              return promise
                .then(() => client.waitAndSetValue(AddProductPage.variations_input, productData['attribute']['name'] + date_time + " : All"))
                .then(() => client.waitForExistAndClick(AddProductPage.variations_select));
            }
          });
          test('should click on "Generate" button', () => {
            return promise
              .then(() => client.waitForExistAndClick(AddProductPage.variations_generate))
              .then(() => client.getCombinationData(1))
          });
          test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
          test('should select all the generated variations', () => client.waitForVisibleAndClick(AddProductPage.var_selected));
          test('should set the "Variations quantity" input', () => client.setVariationsQuantity(AddProductPage, productData['attribute']['variation_quantity']));
        }, 'product/create_combinations');
      }

      if (productData.hasOwnProperty('feature')) {
        scenario('Add Feature', client => {
          test('should click on "Add feature" button', () => {
            return promise
              .then(() => client.scrollTo(AddProductPage.product_create_category_btn))
              .then(() => client.waitForExistAndClick(AddProductPage.add_feature_to_product_button));
          });
          test('should select the created feature', () => client.selectFeature(AddProductPage, productData['feature']['name'] + date_time, productData['feature']['value']));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('pricing')) {
        scenario('Edit product pricing', client => {
          test('should click on "Pricing"', () => client.scrollWaitForExistAndClick(AddProductPage.product_pricing_tab, 50));
          test('should set the "Price per unit (tax excl.)"', () => client.waitAndSetValue(AddProductPage.unit_price, productData['pricing']['unitPrice']));
          test('should set the "Unit"', () => client.waitAndSetValue(AddProductPage.unity, productData['pricing']['unity']));
          test('should set the "Price (tax excl.)"', () => client.waitAndSetValue(AddProductPage.pricing_wholesale, productData['pricing']['wholesale']));
          test('should click on "Add specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button));
          test('should change the reduction type to "Percentage"', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, productData['pricing']['type']));
          test('should set the "Discount" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, productData['pricing']['discount']));
          test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
        }, 'product/product');
      }

      scenario('Save the created product', client => {
        test('should switch the product online', () => {
          return promise
            .then(() => client.isVisible(AddProductPage.symfony_toolbar))
            .then(() => {
              if (global.isVisible) {
                client.waitForExistAndClick(AddProductPage.symfony_toolbar)
              }
            })
            .then(() => client.waitForExistAndClick(AddProductPage.product_online_toggle));
        });
        test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
        test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
      }, 'product/product');

    }, 'product/product');

  },

  checkProductBO(AddProductPage, productData) {
    scenario('Check the product creation in the Back Office', client => {
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should search for product by name', () => client.searchProductByName(productData.name + date_time));
      test('should check the existence of product name', () => client.checkTextValue(AddProductPage.catalog_product_name, productData.name + date_time));
      test('should check the existence of product reference', () => client.checkTextValue(AddProductPage.catalog_product_reference, productData.reference));
      test('should check the existence of product category', () => client.checkTextValue(AddProductPage.catalog_product_category, 'Home'));
      test('should check the existence of product price TE', () => client.checkProductPriceTE(productData.price));
      test('should check the existence of product quantity', () => client.checkTextValue(AddProductPage.catalog_product_quantity, productData.quantity));
      test('should check the existence of product status', () => client.checkTextValue(AddProductPage.catalog_product_online, 'check'));
      test('should reset filter', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
    }, 'product/check_product');
  },

  sortProduct: function (selector, sortBy) {
    scenario('Check the sort of products by "' + sortBy.toUpperCase() + '"', client => {
      test('should click on "Sort by ASC" icon', () => {
        for (let j = 0; j < global.productsPageNumber; j++) {
          promise = client.getProductsInformation(selector, j);
        }
        return promise
          .then(() => client.waitForExistAndClick(ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc")))
      });

      test('should check that the products is well sorted by ASC', () => {
        for (let j = 0; j < global.productsPageNumber; j++) {
          promise = client.getProductsInformation(selector, j, true);
        }
        return promise
          .then(() => client.sortTable("ASC", sortBy))
          .then(() => client.checkSortProduct())
      });

      test('should click on "Sort by DESC" icon', () => client.waitForExistAndClick(ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "desc")));

      test('should check that the products is well sorted by DESC', () => {
        for (let j = 0; j < global.productsPageNumber; j++) {
          promise = client.getProductsInformation(selector, j, true);
        }
        return promise
          .then(() => client.sortTable("DESC", sortBy))
          .then(() => client.checkSortProduct())
      });
    }, 'product/product');
  },

  getCategories(categoriesNumber) {
    scenario('Check categories', client => {
      for (let i = 1; i <= categoriesNumber; i++) {
        test('should go to categories page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.category_submenu));
        test('should get the name of category', () => {
          return promise
            .then(() => client.getTextInVar(CategorySubMenu.category_name.replace('%ID', i), "category"))
            .then(() => categories [tab["category"]] = new Array())
        });

        test('should check the view button visibility and extract the sub categories list ', () => {
          return promise
            .then(() => client.isVisible(CategorySubMenu.view_button.replace('%ID', i)))
            .then(() => {
              let isVisible = global.isVisible;
              if (isVisible) {
                return promise
                  .then(() => client.waitForExistAndClick(CategorySubMenu.view_button.replace('%ID', i)))
                  .then(() => client.getProductPageNumber('table-category'))
                  .then(() => {
                    let subCat = global.productsPageNumber;
                    for (let j = 1; j <= subCat; j++) {
                      promise
                        .then(() => client.getTextInVar(CategorySubMenu.category_name.replace('%ID', j), "subCategory"))
                        .then(() => categories [tab["category"]].push(tab["subCategory"]))
                    }
                  })
              }
            })
        });
      }
    }, 'product/product');
  },

  checkCategories(categoriesNumber) {
    scenario('Check categories', client => {
      test('should go to products page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should click on "Filter by categories" button', () => client.waitForExistAndClick(ProductList.filter_by_catrgory_button));
      test('should click on "Expand" button', () => client.waitForExistAndClick(ProductList.expand_filter_button));
      for (let i = 1; i <= categoriesNumber; i++) {
        test('should get the name of category', () => {
          return promise
            .then(() => client.getTextInVar(ProductList.category.replace('%ID', i), "productCategory"))
            .then(() => productCategories [tab["productCategory"]] = new Array())
        });
        test('should check the view button visibility', () => {
          return promise
            .then(() => client.isVisible(ProductList.subCat.replace('%I', i).replace('%J', i)))
            .then(() => {
              let isVis = global.isVisible;
              if (isVis) {
                return promise
                  .then(() => {
                    for (let j = 1; j <= 2; j++) {
                      promise
                        .then(() => client.getTextInVar(ProductList.subCat.replace('%I', i).replace('%J', j), 'psubCategory'))
                        .then(() => productCategories [tab["productCategory"]].push(tab["psubCategory"]))
                    }
                  })
              }
            })
        });
      }
      test('should check that the list categories is existing in the catalog page', () => {
        return promise
          .then(() => expect(categories).to.deep.equal(productCategories))
      });
      test('should choose the "Accessories" category from the list', () => client.waitForExistAndClick(AddProductPage.accessories_category));
      test('should click outside', () => client.waitForExistAndClick(ProductList.click_outside));
      test('should count the filtered products ', () => client.getProductPageNumber('product_catalog_list'));
      for (let k = 1; k <= 11; k++) {
        test('should check that the chosen category is already selected', () => {
          return promise
            .then(() => client.getTextInVar(ProductList.categories_filters.replace('%ID', k), 'cat'))
            .then(() => console.log('tab cat' + tab['cat']))
            .then(() => {
              let subCategory_number = Object.keys(productCategories['Accessories']).length;
              for (let b = 0; b <= subCategory_number - 1; b++) {
                if (tab['cat'] !== productCategories['Accessories'][b]) {
                  promise
                    .then(() => console.log('productCategories' + k + productCategories['Accessories'][b]))
                    .then(() => client.waitForExistAndClick(ProductList.pencil.replace('%ID', k)))
                    .then(() => client.scrollWaitForExistAndClick(AddProductPage.expand_button))
                    .then(() => client.getAttributeInVar(AddProductPage.selected_category, 'checked', 'attributeVariable'))
                    .then(() => client.waitForExistAndClick(Menu.Sell.Catalog.products_submenu));
                }
                else {
                  console.log('exist !!!!! ' )
                }
              }
            })
        });
      }
    }, 'product/product');
  }
}

