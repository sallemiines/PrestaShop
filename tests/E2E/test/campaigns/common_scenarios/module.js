const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();

module.exports = {
  checkConfigPage: function (client, ModulePage, moduleTechName) {
    test('should click on "Configure" button', () => client.waitForExistAndClick(ModulePage.configure_module_button.split('%moduleTechName').join(moduleTechName)));
    test('should check the configuration page', () => client.checkTextValue(ModulePage.config_legend.replace("%moduleTechName", moduleTechName), moduleTechName));
  },
  installModule: function (client, ModulePage, Common, moduleTechName) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should set the name of the module in the search input', () => client.waitAndSetValue(ModulePage.module_selection_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.selection_search_button));
    test('should click on "Install" button', () => client.waitForExistAndClick(ModulePage.install_button.replace("%moduleTechName", moduleTechName)));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Common.close_validation));
    test('should click on "Installed Modules"', () => client.waitForVisibleAndClick(ModulePage.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should check if the module ' + moduleTechName + ' was installed', () => client.isExisting(ModulePage.installed_module_div.replace('%moduleTechName', moduleTechName)));
  },
  uninstallModule: function (client, ModulePage, Common, moduleTechName, deleteModule = false) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should click on "Installed Modules"', () => client.waitForVisibleAndClick(ModulePage.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should click on module dropdown', () => client.waitForVisibleAndClick(ModulePage.action_dropdown.replace('%moduleTechName', moduleTechName)));
    test('should click on "Uninstall" button', () => client.waitForExistAndClick(ModulePage.uninstall_button.split('%moduleTechName').join(moduleTechName)));

    if (deleteModule) {
      test('should click on "optional : delete Module Folder"', () => client.waitForVisibleAndClick(ModulePage.force_deletion));
    }
    test('should click on "Yes, uninstall it" button', () => client.waitForVisibleAndClick(ModulePage.uninstall_module_modal));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Common.close_validation));
    test('should check that the backdrop is hidden', () => client.checkIsNotVisible(ModulePage.backdrop_modale));
    test('should check if the module ' + moduleTechName + ' was uninstalled', () => client.checkTextValue(ModulePage.built_in_module_span, "0", "contain"));
  },
  disableModule: function (client, ModulePage, Common, moduleTechName) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should click on "Installed Modules"', () => client.waitForVisibleAndClick(ModulePage.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should click on module dropdown', () => client.waitForVisibleAndClick(ModulePage.action_dropdown.replace('%moduleTechName', moduleTechName)));
    test('should click on "Disable" button', () => client.waitForExistAndClick(ModulePage.disable_module.split('%moduleTechName').join(moduleTechName)));
    test('should click on "Yes, disable it" button', () => client.waitForVisibleAndClick(ModulePage.confirmation_disable_module));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Common.close_validation));
  },
  enableModule: function (client, ModulePage, Common, moduleTechName) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should click on "Installed Modules"', () => client.waitForVisibleAndClick(ModulePage.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should click on "Enable" button', () => client.waitForExistAndClick(ModulePage.enable_module.split('%moduleTechName').join(moduleTechName)));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Common.close_validation));
  },
  resetModule: function (client, ModulePage, Common, Menu, moduleName, moduleTechName) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should click on "Installed Modules"', () => client.waitForVisibleAndClick(ModulePage.installed_modules_tabs));
    test('should search for "' + moduleName + '" module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should click on module dropdown', () => client.waitForVisibleAndClick(ModulePage.action_dropdown.replace('%moduleTechName', moduleTechName)));
    test('should click on "Reset" action', () => client.waitForExistAndClick(ModulePage.reset_module.split('%moduleTechName').join(moduleTechName)));
    test('should click on "Yes, reset it" button', () => client.waitForVisibleAndClick(ModulePage.reset_button_modal.replace('%moduleTechName', moduleTechName)));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Common.close_validation));
    test('should go to "Dashboard" page', () => client.waitForExistAndClick(Menu.dashboard_menu));
  },
  sortModule: function (client, ModulePage, sortType, attribute) {
    test('should select sort by "' + sortType + '"', () => client.waitAndSelectByValue(ModulePage.sort_select, sortType));
    test('should check sort modules by "' + sortType + '"', () => {
      for (let i = 0; i < (parseInt((tab["modules_number"].match(/[0-9]+/g)[0]))); i++) {
        promise = client.getModuleAttr(ModulePage.module_list, attribute, i)
      }
      if (sortType == "name") {
        return promise
          .then(() => client.checkSortByName((parseInt((tab["modules_number"].match(/[0-9]+/g)[0])))))
      } else if (sortType == "price") {
        return promise
          .then(() => client.checkSortByIncPrice((parseInt((tab["modules_number"].match(/[0-9]+/g)[0])))))
      } else {
        return promise
          .then(() => client.checkSortDesc((parseInt((tab["modules_number"].match(/[0-9]+/g)[0])))))
      }
    });
  },
  installTypeModule: function (client, ModulePage, Common, Menu, moduleName, moduleTechName, status) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should go to "Selection" page', () => client.waitForExistAndClick(ModulePage.selection_modules_tab));
    test('should search for "' + moduleName + '" module in the selection module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should check that the module is "' + status + '"', () => client.checkTextValue(ModulePage.module_container, status, 'contain'));
    test('should click on "Install" button', () => client.waitForExistAndClick(ModulePage.install_button.replace("%moduleTechName", moduleTechName)));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Common.close_validation));
    test('should get the module version', () => client.getTextInVar(ModulePage.current_version_module, 'version'));
  },
  checkModuleInstallation: function (client, ModulePage, Menu, moduleName, moduleTechName, native = false) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should search for "' + moduleName + '" module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleTechName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    if (native) {
      test('should check if the module "Legal compliance" was installed', () => client.checkTextValue(ModulePage.built_in_module_span, "1", "contain"));
      test('should check the module version', () => client.checkTextValue(ModulePage.module_version.replace('%ID', 'native'), tab['version'], 'contain'));
    } else {
      test('should check if the module "Legal compliance" was installed', () => client.checkTextValue(ModulePage.installed_modules, "1", "contain"));
      test('should check the module version', () => client.checkTextValue(ModulePage.module_version.replace('%ID', 'all'), tab['version'], 'contain'));
    }
  },

  checkModuleUninstallation: function (client, path, directoryName, exist) {
    test('should check the module folder ', () => client.checkFolder(path, directoryName, exist, 30000));
  },
  installZipModule: function (client, ModulePage, moduleZip, moduleName) {
    test('should go to "Module" page', () => client.goToSubtabMenuPage(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu));
    test('should click on "Upload a module" button', () => client.waitForExistAndClick(ModulePage.upload_button));
    test('should add zip file', () => client.addFile(ModulePage.zip_file_input, moduleZip));
    test('should verify that the module is installed', () => {
      return promise
        .then(() => client.waitForVisible(ModulePage.success_install_message))
        .then(() => client.checkTextValue(ModulePage.module_import_success, "Module installed!"))
    });
    test('should click on close modal button', () => client.waitForExistAndClick(ModulePage.close_modal_button));
    test('should click on "Installed Modules"', () => client.waitForExistAndClick(ModulePage.installed_modules_tabs, 1000));
    test('should search for "' + moduleName + '" module in the installed module tab', () => client.waitAndSetValue(ModulePage.modules_search_input, moduleName));
    test('should click on "Search" button', () => client.waitForExistAndClick(ModulePage.modules_search_button));
    test('should check if the module "' + moduleName + '" was installed', () => client.checkTextValue(ModulePage.installed_modules, "1", "contain"));
  }
};
