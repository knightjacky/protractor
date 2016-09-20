/**
 * Created by jacky.
 */

'use strict';

var LoginPage = function () {

    this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/global-scan/';
    this.expectedIncorrectUrl = browser.baseUrl + '#/login/';
    this.userInput = element(by.css('#j_username'));
    this.passwordInput = element(by.css('#j_password'));
    this.loginBtn = element(by.css('#login-submit-btn'));
    this.errorMessagePane = element(by.css('#error-pane'));
    this.errorMessage = element(by.css('#access-denied'));
    this.expectedLoginErrorMessage = 'Access Denied: You have entered and incorrect username and/or password.';
    this.logoutMessage = element(by.css('#logged-out'));
    this.expectedLogoutMessage = 'You have been logged out successfully.';
    this.footer = element(by.css('#legal-footer'));
    this.logo = element(by.css('#main-uptime-logo'));

    this.login = function (username, password) {
        browser.waitForAngular();
        browser.sleep(300);
        this.userInput.clear();
        this.passwordInput.clear();
        browser.waitForAngular();
        browser.sleep(300);
        this.userInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
        this.loginBtn.click();
        browser.waitForAngular();
        browser.sleep(300);

    };


};

module.exports = {

    auth: new LoginPage()

};
