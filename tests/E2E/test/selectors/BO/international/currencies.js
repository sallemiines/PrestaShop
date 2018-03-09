module.exports = {
  Currencies:{
  add_new_button:'//*[@id="page-header-desc-currency-new_currency"]/i',
    currencies_list:'//*[@id="iso_code"]',
    exchange_rate_input:'//*[@id="conversion_rate"]',
    currency_status:'//*[@id="currencyStatus"]',
    save_button:'//*[@id="currency_form_submit_btn"]',
    green_validation:'//*[@id="content"]/div[@class="bootstrap"]/div[contains(@class, "success")]',
    iso_code_input:'//*[@id="table-currency"]/thead/tr[2]/th[3]/input',
    search_button:'//*[@id="submitFilterButtoncurrency"]',
    exchange_rate_update_button:'//*[@id="currency_form"]/button',
    exchange_rate_value:'//*[@id="table-currency"]/tbody/tr/td[4]',
    edit_button:'//*[@id="table-currency"]/tbody/tr/td[6]/div/div/a',
    dropdown_button:'//*[@id="table-currency"]/tbody/tr/td[6]/div/div/button',
    delete_button:'//*[@id="table-currency"]/tbody/tr/td[6]/div/div/ul/li/a',
  }
};
