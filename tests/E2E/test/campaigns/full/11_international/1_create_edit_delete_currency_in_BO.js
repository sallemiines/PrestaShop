const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./currency');
let currencyInformations = {
  isoCode: 'USD',
  exchangeRate: '2'
};

scenario('Create, edit, check and delete "Currency" in the Back Office', client => {
  scenario('Open the browser and connect to the BO', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createCurrency(currencyInformations.isoCode, currencyInformations.exchangeRate);
  common_scenarios.updateExchangeRate(currencyInformations.isoCode, currencyInformations.exchangeRate);
  common_scenarios.editCurrencyStatus(currencyInformations.isoCode);
  common_scenarios.deleteCurrency(currencyInformations.isoCode);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

