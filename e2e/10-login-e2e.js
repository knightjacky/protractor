/**
 * Created by jacky.
 */

'use strict';

describe('E2E: Login Page test', function () {

    var loginPage = require('./page-objects/login-page'),
        mainMenuPage = require('./page-objects/mainmenu-page');

    beforeEach(function () {

        browser.get('#/login/');
        browser.ignoreSynchronization = true;
        browser.waitForAngular();

    });

    it('#1 verify elements on login page', function () {

        expect(browser.getCurrentUrl()).toContain('#/login');        // verify login page URL is correct
        browser.waitForAngular();
        expect(loginPage.auth.userInput).toBeDefined();              // verify username input field exist
        expect(loginPage.auth.passwordInput).toBeDefined();          // verify password input field exist
        expect(loginPage.auth.loginBtn).toBeDefined();               // verify submit button exist
        expect(loginPage.auth.footer).toBeDefined();
        expect(loginPage.auth.logo).toBeDefined();
    });

    it('#2 testing login with empty username', function () {

        loginPage.auth.login('', 'uptime');          // enter empty username with password uptime
        browser.waitForAngular();
        expect(loginPage.auth.errorMessage.getText()).toBe(loginPage.auth.expectedLoginErrorMessage);    // capture the error message to be expected
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);

    });

    it('#3 testing login empty password', function () {

        loginPage.auth.login('jacky', '');
        browser.waitForAngular();
        expect(loginPage.auth.errorMessage.getText()).toBe(loginPage.auth.expectedLoginErrorMessage);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);

    });

    it('#4 testing login lower case username and password', function () {

        loginPage.auth.login('jacky', 'jacky');
        browser.waitForAngular();
        expect(loginPage.auth.errorMessage.getText()).toBe(loginPage.auth.expectedLoginErrorMessage);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);

    });

    it('#5 testing login upper case username and password', function () {

        loginPage.auth.login('JACKY', 'JACKY');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain('#/dashboard/global-scan/');
        browser.waitForAngular();
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#6 testing login special character username and password', function () {

        loginPage.auth.login('!@#$%Jacky\"\'', 'uptime');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain('#/dashboard/global-scan/');
        browser.waitForAngular();
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#7 testing login special character username with special character password', function () {

        loginPage.auth.login('Jacky^&*()', '!@#$%^\"\'');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain('#/dashboard/global-scan/');
        browser.waitForAngular();
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#8 testing login with "admin"', function () {

        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain('#/dashboard/global-scan/');
        browser.waitForAngular();
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#9 verify logout message', function () {

        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        mainMenuPage.mainMenu.logout();
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain('#/login/');
        expect(loginPage.auth.logoutMessage.getText()).toBe(loginPage.auth.expectedLogoutMessage);
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#10 testing error 401 message and close the alert', function () {

        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        browser.get('#/dashboard/global-scan/?devMode=true');
        browser.waitForAngular();
        browser.executeScript('window.location.reload()');
        browser.waitForAngular();
        mainMenuPage.mainMenu.error401Function();
        browser.waitForAngular();
        expect(loginPage.auth.errorMessagePane.getText()).toContain('401');   // capture the error message to be expected
        element(by.css('#close-button')).click();
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#11 testing error 401 message and wait for 20 sec', function () {

        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        browser.get('#/dashboard/global-scan/?devMode=true');
        browser.waitForAngular();
        browser.executeScript('window.location.reload()');
        browser.waitForAngular();
        mainMenuPage.mainMenu.error401Function();
        browser.waitForAngular();
        expect(loginPage.auth.errorMessagePane.getText()).toContain('401');   // capture the error message to be expected   // verify the error message should display and contain 401
        browser.sleep(10100);              // first time wait 10.1 seconds
        expect(loginPage.auth.errorMessagePane.getText()).toContain('401');   // after 10 second, the error message should still display with content 401
        browser.sleep(10100);              // second time to wait another 10.1 second
        expect(loginPage.auth.errorMessagePane.isDisplayed()).toEqual(false);
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#12 testing error 500 message and close the alert', function () {

        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        browser.get('#/dashboard/global-scan/?devMode=true');
        browser.waitForAngular();
        browser.executeScript('window.location.reload()');
        browser.waitForAngular();
        mainMenuPage.mainMenu.error500Function();
        browser.waitForAngular();
        expect(loginPage.auth.errorMessagePane.getText()).toContain('500');   // capture the error message to be expected
        element(by.css('#close-button')).click();
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#13 testing error 500 message and wait for 20 sec', function () {

        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        browser.get('#/dashboard/global-scan/?devMode=true');
        browser.waitForAngular();
        browser.executeScript('window.location.reload()');
        browser.waitForAngular();
        mainMenuPage.mainMenu.error500Function();
        browser.waitForAngular();
        expect(loginPage.auth.errorMessagePane.getText()).toContain('500');    // verify the error message should display and contain 500
        browser.sleep(10100);              // first time wait 10.1 seconds
        expect(loginPage.auth.errorMessagePane.getText()).toContain('500');    // after 10 second, the error message should still display with content 500
        browser.sleep(10100);              // second time to wait another 10.1 second
        expect(loginPage.auth.errorMessagePane.isDisplayed()).toBeFalsy();   // capture the error message to be expected
        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);

    });

    it('#14 testing same URL with login session at different browser', function () {

        loginPage.auth.login('admin', 'admin');    // login properly
        browser.waitForAngular();
        browser.get('#/monitors/');          // go to monitor webpage
        browser.waitForAngular();
        browser.getAllWindowHandles().then(function (handles) {        //setup browser handler

            var originalHandle = handles[0];   // handle of first window
            browser.executeScript('window.open("http://localhost:9999/#/monitors/", "second-window")');     // open new window for monitor page and name new window to second-window
            browser.waitForAngular();
            browser.switchTo().window('second-window');   // switch to new window
            expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/monitors/');   // the current URL should be monitor page
            browser.switchTo().window(originalHandle);        // switch to original window
            mainMenuPage.mainMenu.logout();                        // logged off at original main window
            browser.waitForAngular();
            browser.switchTo().window('second-window');   // switch back to second-window
            browser.get('#/reports/');
            browser.get('#/monitors/');
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/login/');     // the current URL should redirect to login page
            browser.executeScript('window.close()');              // closes the current window
            browser.switchTo().window(originalHandle);        // switch to original window
            browser.executeScript('window.close()');              // closes the current window
        });

    });

});

