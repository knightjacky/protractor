/**
 * Created by jacky.
 */

'use strict';

var MainMenuPage = function () {

    this.mainNav = element.all(by.css('#main-nav-list li'));
    this.mainMenuList = [ 'Dashboard', 'Reports', 'Infrastructure', 'Monitors', 'Configure' ];
    this.dropdownToggleBtn = element(by.css('#dropdown-toggle-btn'));
    this.logoutBtn = element(by.css('#logout-btn'));
    this.error401Btn = element(by.css('#simulate-401-btn'));
    this.error500Btn = element(by.css('#simulate-500-btn'));

    this.logout = function () {

        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#dropdown-toggle-btn')).click();
        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#logout-btn')).click();
        browser.waitForAngular();
        browser.sleep(500);
        expect(browser.getCurrentUrl()).toContain('#/login/');

    };

    this.error401Function = function () {

        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#dropdown-toggle-btn')).click();
        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#simulate-401-btn')).click();
        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#dropdown-toggle-btn')).click();

    };

    this.error500Function = function () {

        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#dropdown-toggle-btn')).click();
        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#simulate-500-btn')).click();
        browser.waitForAngular();
        browser.sleep(300);
        element(by.css('#dropdown-toggle-btn')).click();
    };

};

module.exports = {
    mainMenu: new MainMenuPage()
};