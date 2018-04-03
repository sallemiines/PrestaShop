const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('../../common_scenarios/design_theme');

scenario('Change images of the current theme ', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  common_scenarios.changeCurrentImage();
  common_scenarios.checkImage();
}, 'common_client', true);

