module.exports = {
  Stock: {
    submenu: '//*[@id="collapse-9"]/li[8]/a',
    tabs: '//*[@id="tab"]/li[1]/a',
    product_quantity_input: '(//*[@id="app"]//div[contains(@class,"edit-qty")])[%O]/input',
    product_quantity: '//*[@id="app"]//tr[%O]/td[7]',
    product_quantity_modified: '(//*[@id="app"]//tr[%O]//span[contains(@class,"qty-update")])[1]',
    save_product_quantity_button: '(//*[@id="app"]//button[contains(@class,"check-button")])[1]',
    group_apply_button: '//*[@id="app"]//button[contains(@class,"update-qty")]',
    add_quantity_button: '(//*[@id="app"]//span[contains(@class,"ps-number-up")])[1]',
    remove_quantity_button: '(//*[@id="app"]//span[contains(@class,"ps-number-down")])[1]',
    success_panel: '//*[@id="growls"]',
    search_input: '(//*[@id="search"]//input[contains(@class,"input")])[1]',
    search_button: '//*[@id="search"]//button[contains(@class,"search-button")]',
    check_sign: '//*[@id="app"]//button[@class="check-button"]',
    green_validation: '//*[@id="search"]/div[2]/div/button',
    physical_column: '//*[@id="app"]//div//table[@class="table"]//td[5]',
    available_column: '//*[@id="app"]//div//table[@class="table"]//td[7]',
    date_time_column: '//*[@id="app"]//div/table[@class="table"]//tr[%O]/td[5]',
    reference_product_column: '//*[@id="app"]//div/table[@class="table"]//tr[%O]/td[2]',
    employee_column: '//*[@id="app"]//div/table[@class="table"]//tr[%O]/td[6]',
    product_column: '//*[@id="app"]//div/table[@class="table"]//tr[%O]/td[1]'
  }
};
