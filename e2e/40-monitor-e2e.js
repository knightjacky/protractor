/**
 * Created by jacky.
 */

'use strict';

describe('E2E: Monitors Page test', function () {

    var loginPage = require('./page-objects/login-page'),
        mainMenuPage = require('./page-objects/mainmenu-page'),
        monitorsPage = require('./page-objects/monitor-page');

    beforeEach(function () {

        browser.get('#/monitors/');
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        loginPage.auth.login('admin', 'admin');

    });

    afterEach(function () {

        mainMenuPage.mainMenu.logout();
        expect(loginPage.auth.logoutMessage).toBeDefined();
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(monitorsPage.monitors.declineAccessMessage.isPresent()).toBe(false);

    });

    it('#1 testing redirect function to login page', function () {

        mainMenuPage.mainMenu.logout();
        browser.get('#/monitors/');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toBe(monitorsPage.monitors.expectedIncorrectUrl);  // verify before login  monitors web page
        expect(monitorsPage.monitors.declineAccessMessage.getText()).toBe(monitorsPage.monitors.expectedDeclineAccessMessage); //verify decline access message
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);
        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain(monitorsPage.monitors.expectedCorrectUrl);  // verify after login  monitors web page

    });

    it('#2 verify 5 options on main menu bars', function () { // does work

        mainMenuPage.mainMenu.mainNav.then(function (items) {
            expect(items.length).toBe(5);
            items.forEach(function (ele, i) { // loop through array
                expect(ele.getText()).toBe(mainMenuPage.mainMenu.mainMenuList[i]); // expect current element to be equal to one of the items in mainMenuList
            });
        });

    });

    it('#3 verify live data monitors table column names', function () {

        browser.waitForAngular();
        expect(monitorsPage.monitors.monitorContainer).toBeDefined();              // verify monitors container exist
        expect(monitorsPage.monitors.accordionMonitors).toBeDefined();
        expect(monitorsPage.monitors.tableName.getText()).toContain('Monitors');
        monitorsPage.monitors.monitorContainerDetails.then(function (items) {
            expect(items[4].getText()).toBe('Name');
            expect(items[5].getText()).toBe('Description');
            expect(items[6].getText()).toBe('Type');
        });
        expect(loginPage.auth.footer).toBeDefined();

    });

    it('#4 verify monitor details', function () {

        browser.waitForAngular();
        monitorsPage.monitors.pingMonitor.click();   // click first monitor service
        browser.waitForAngular();
        expect(monitorsPage.monitors.monitorDetailsTable.getText()).toBeDefined();  // verify monitor details table exist

    });

    it('#5 verify Specific monitor (UPTIME-RH63.rd2.local) and check monitor detail', function () {

        browser.waitForAngular();
        expect(monitorsPage.monitors.monitorContainer.element(by.partialLinkText('UPTIME-RH63.rd2.local'))).toBeDefined();
        monitorsPage.monitors.monitorContainer.element(by.partialLinkText('UPTIME-RH63.rd2.local')).click();
        browser.waitForAngular();
        expect(monitorsPage.monitors.monitorDetailsTable.getText()).toBeDefined();
    });

    it('#6 verify default login page does not overwrite', function () {

        browser.waitForAngular();
        mainMenuPage.mainMenu.logout();
        browser.waitForAngular();
        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain('#/dashboard/global-scan/');

    });

    it('#7 verify monitor page details', function () {

        monitorsPage.monitors.verifyFirstMonitor('Platform Performance Gatherer');
        monitorsPage.monitors.clickPage.get(1).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('PING-sol11sparc.rd2.local');
        monitorsPage.monitors.clickPage.get(2).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Oracle Advanced Metrics');
        monitorsPage.monitors.clickPage.get(3).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Platform Performance Gatherer');
        monitorsPage.monitors.clickPage.get(4).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('NIS Service Monitor');
        monitorsPage.monitors.monitorContainer.element(by.linkText('»')).click();
        browser.waitForAngular();
        monitorsPage.monitors.clickPage.get(0).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Configuration Update Gatherer');
        monitorsPage.monitors.clickPage.get(1).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('ALL ESX Performance Monitor (master)');
        monitorsPage.monitors.clickPage.get(2).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Configuration Update Gatherer');
        monitorsPage.monitors.clickPage.get(3).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('EXTERNAL UNKNOWN');
        monitorsPage.monitors.clickPage.get(4).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('PING-child-maint02.rd2.local');
        monitorsPage.monitors.monitorContainer.element(by.linkText('»')).click();
        browser.waitForAngular();
        monitorsPage.monitors.clickPage.get(0).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Configuration Update Gatherer');
        monitorsPage.monitors.clickPage.get(1).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('UPTIME-qa-fake00.rd.local');
        monitorsPage.monitors.clickPage.get(2).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('PING-vesxi5-01.rd.local');
        monitorsPage.monitors.clickPage.get(3).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Configuration Update Gatherer');
        monitorsPage.monitors.clickPage.get(4).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('PING-test-enable-labnovell');
        monitorsPage.monitors.monitorContainer.element(by.linkText('»')).click();
        browser.waitForAngular();
        monitorsPage.monitors.clickPage.get(0).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('PING-test-disable-netsnmpv3.rd2.local');
        monitorsPage.monitors.clickPage.get(1).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Topological PS (member)');
        monitorsPage.monitors.monitorContainer.element(by.linkText('«')).click();
        monitorsPage.monitors.monitorContainer.element(by.linkText('«')).click();
        monitorsPage.monitors.monitorContainer.element(by.linkText('«')).click();
        browser.waitForAngular();
        monitorsPage.monitors.clickPage.get(0).click();
        browser.waitForAngular();
        monitorsPage.monitors.verifyFirstMonitor('Platform Performance Gatherer');

    });

});