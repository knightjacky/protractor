/**
 * Created by jacky.
 */

'use strict';

describe('E2E: infrastructure Page topology tab test', function () {

    var loginPage = require('./page-objects/login-page'),
        mainMenuPage = require('./page-objects/mainmenu-page'),
        infrastructurePage = require('./page-objects/infrastructure-page'); //call the page object

    beforeEach(function () {

        browser.get('#/infrastructure/topology/');
        browser.ignoreSynchronization = true; //crazy important
        browser.waitForAngular();
        loginPage.auth.login('admin', 'admin');

    });

    afterEach(function () {

        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.logoutMessage).toBeDefined();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(infrastructurePage.elements.declineAccessMessage.isPresent()).toBe(false);

    });

    it('#1 testing redirect function to login page', function () {

        mainMenuPage.mainMenu.logout();
        browser.get('#/infrastructure/topology/');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toBe(infrastructurePage.tabs.expectedIncorrectUrl);   // verify before login  infrastructure web page
        expect(infrastructurePage.elements.declineAccessMessage.getText()).toBe(infrastructurePage.topology.expectedDeclineAccessMessage);
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);
        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain(infrastructurePage.topology.expectedCorrectUrl); // verify after login infrastructure web page

    });

    it('#2 verify 5 options on main menu bars', function () { // does work

        mainMenuPage.mainMenu.mainNav.then(function (items) {
            expect(items.length).toBe(5);
            items.forEach(function (ele, i) { // loop through array
                expect(ele.getText()).toBe(mainMenuPage.mainMenu.mainMenuList[i]); // expect current element to be equal to one of the items in mainMenuList
            });
        });

    });

});