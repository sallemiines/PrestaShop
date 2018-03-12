module.exports = {
  Currencies: {
    add_new_button: '//*[@id="page-header-desc-currency-new_currency"]/i',
    currencies_list: '#iso_code',
    exchange_rate_input:'#conversion_rate',
    currency_status: '#currencyStatus',
    save_button: '#currency_form_submit_btn',
    green_validation: '//*[@id="content"]/div[@class="bootstrap"]/div[contains(@class, "success")]',
    iso_code_input: '//*[@id="table-currency"]//th[@class="center"]//input[@name="currencyFilter_iso_code"]',
    search_button: '#submitFilterButtoncurrency',
    exchange_rate_update_button: '//*[@id="currency_form"]/button',
    exchange_rate_value: '//*[@id="table-currency"]/tbody/tr/td[4]',
    edit_button: '//*[@id="table-currency"]//div[@class="btn-group pull-right"]//a[@class="edit btn btn-default"]',
    dropdown_button: '//*[@id="table-currency"]//button[@class="btn btn-default dropdown-toggle"]',
    delete_button: '//*[@id="table-currency"]//ul[@class="dropdown-menu"]//a[@class="delete"]',
  }
};
