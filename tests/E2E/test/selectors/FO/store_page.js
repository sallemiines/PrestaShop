module.exports = {
  StorePage: {
    search_input: '//*[@id="search_widget"]//input[@name="s"]',
    name_en_input: '#name_1',
    adresse_en_input: '#address1_1',
    postcode_input: '#postcode',
    city_input: '#city',
    country_list: '#id_country',
    latitude_input: '#latitude',
    longitude_input: '#longitude',
    phone_input: '#phone',
    fax_input: '#fax',
    email_address_input: '#email',
    note_en_input: '#note_1',
    picture: '#image',
    save_button: '#store_form_submit_btn',
    active_button: '//*[@id="fieldset_0"]//div[@class="col-lg-9"]//label[@for="active_on"]',
    hours_day_input: '//*[@id="fieldset_0"]//div[@class="col-lg-7"]/input[@name="hours[%ID][1]"]',
    success_panel: '//*[@id="content"]//div[@class="alert alert-success"]'
  }
};
