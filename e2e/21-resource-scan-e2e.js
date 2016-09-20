/**
 * Created by jacky.
 */

'use strict';

describe('E2E: Dashboard Page resource-scan gadget test', function () {

    var loginPage = require('./page-objects/login-page'),
        mainMenuPage = require('./page-objects/mainmenu-page'),
        globalPage = require('./page-objects/dashboard-page');

    beforeEach(function () {

        browser.get('#/dashboard/resource-scan/');
        browser.ignoreSynchronization = true; //crazy important
        browser.waitForAngular();
        loginPage.auth.login('admin', 'admin');

    });

    afterEach(function () {

        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.logoutMessage).toBeDefined();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(globalPage.dashboard.declineAccessMessage.isPresent()).toBe(false);

    });

    it('#1 testing redirect function to login page', function () {

        mainMenuPage.mainMenu.logout();
        browser.get('#/dashboard/resource-scan/');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toBe(globalPage.dashboard.expectedIncorrectUrl);
        expect(globalPage.dashboard.declineAccessMessage.getText()).toBe(globalPage.resourceScan.expectedDeclineAccessMessage);
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);
        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain(globalPage.resourceScan.expectedCorrectUrl);

    });

    it('#2 verify 5 options on main menu bars', function () {

        expect(browser.getCurrentUrl()).toContain(globalPage.resourceScan.expectedCorrectUrl);
        mainMenuPage.mainMenu.mainNav.then(function (items) {
            expect(items.length).toBe(5);
            items.forEach(function (ele, i) {
                expect(ele.getText()).toBe(mainMenuPage.mainMenu.mainMenuList[i]);
            });
        });

    });

    it('#3 verify 8 tabs on dashboard page', function () {

        var tabs = globalPage.dashboard.globalScanNav.map(function (items) {
            return items.getText();
        });
        tabs.then(function (items) {
            expect(items.length).toBe(8);
            items.forEach(function (ele, i) {
                expect(ele).toBe(globalPage.dashboard.globalScanMenuList[i]);
            });
        });

    });

});