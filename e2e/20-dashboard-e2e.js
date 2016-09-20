/**
 * Created by jacky.
 */

'use strict';

describe('E2E: Dashboard Page Global-Scan gadget test', function () {

    var loginPage = require('./page-objects/login-page'),
        mainMenuPage = require('./page-objects/mainmenu-page'),
        globalPage = require('./page-objects/dashboard-page');

    beforeEach(function () {

        browser.get('#/dashboard/global-scan');
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
        browser.get('#/dashboard/global-scan');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toBe(globalPage.dashboard.expectedIncorrectUrl);
        expect(globalPage.dashboard.declineAccessMessage.getText()).toBe(globalPage.dashboard.expectedDeclineAccessMessage);
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);
        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain(globalPage.dashboard.expectedCorrectUrl);

    });

    it('#2 verify 5 options on main menu bars', function () {

        expect(browser.getCurrentUrl()).toContain(globalPage.globalScan.expectedCorrectUrl);
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

    it('#4 verify all charts should existed on global scan tab', function () {

        expect(globalPage.globalScan.monitorStatus).toBeDefined();
        expect(globalPage.globalScan.elementStatus).toBeDefined();
        expect(globalPage.globalScan.currentMonitorStatus).toBeDefined();
        expect(globalPage.globalScan.groupStatus).toBeDefined();
        expect(globalPage.globalScan.monitorStatus.getText()).toContain(globalPage.globalScan.expectedMonitorStatusName);
        expect(globalPage.globalScan.elementStatus.getText()).toContain(globalPage.globalScan.expectedElementStatusName);
        expect(globalPage.globalScan.currentMonitorStatus.getText()).toContain(globalPage.globalScan.expectedCurrentMonitorStatusName);
        expect(globalPage.globalScan.groupStatus.getText()).toContain(globalPage.globalScan.expectedGroupStatusName);
        expect(loginPage.auth.footer).toBeDefined();

    });

    it('#5 verify group status table column names', function () {

        expect(globalPage.globalScan.groupStatus.getText()).toContain(globalPage.globalScan.expectedGroupStatusName);
        globalPage.globalScan.verifyTableColumn('My Data Center','Elements','Monitors','## Active Incidents','Performance');
        globalPage.globalScan.groupElementDetails.then(function (items) {
            expect(items[6].getText()).toBe('CPU');
            expect(items[7].getText()).toBe('MEM');
            expect(items[8].getText()).toBe('SWAP');
            expect(items[9].getText()).toBe('NET I/O');
            expect(items[10].getText()).toBe('DISK I/O');
            expect(items[11].getText()).toBe('STORAGE');
        });

    });

    it('#6 verify group status chart page details', function () {

        globalPage.globalScan.verifyFirstGroup('My Infrastructure');
        globalPage.globalScan.clickGroupPage.get(1).click();
        browser.waitForAngular();
        globalPage.globalScan.verifyFirstGroup('Discovered Virtual Machines');
        globalPage.globalScan.clickGroupPage.get(2).click();
        browser.waitForAngular();
        globalPage.globalScan.verifyFirstGroup('TESTVC');
        globalPage.globalScan.clickGroupPage.get(3).click();
        browser.waitForAngular();
        globalPage.globalScan.verifyFirstGroup('Servers');
        globalPage.globalScan.clickGroupPage.get(0).click();
        browser.waitForAngular();
        globalPage.globalScan.verifyFirstGroup('My Infrastructure');

    });

    it('#7 verify each group of status details', function () {

        globalPage.globalScan.groupElementDetails.then(function (items) {
            //first group status details
            expect(items[14].getText()).toBe('My Infrastructure');
            expect(items[15].getText()).toBe('45');
            expect(items[16].getText()).toBe('191');
            expect(items[18].getText()).toBe('282');
            expect(items[19].getText()).toBe('8');
            expect(items[20].getText()).toBe('18');
            expect(items[21].getText()).toBe('0');
            expect(items[22].getText()).toBe('0');
            expect(items[23].getText()).toBe('298');
            //second group status details
            expect(items[26].getText()).toBe('Automated Group');
            expect(items[27].getText()).toBe('1');
            expect(items[28].getText()).toBe('7');
            expect(items[30].getText()).toBe('282');
            expect(items[31].getText()).toBe('8');
            expect(items[32].getText()).toBe('18');
            expect(items[33].getText()).toBe('0');
            expect(items[34].getText()).toBe('0');
            expect(items[35].getText()).toBe('298');
            //third group status details
            expect(items[38].getText()).toBe('Automated Sub Group');
            expect(items[39].getText()).toBe('1');
            expect(items[40].getText()).toBe('6');
            expect(items[42].getText()).toBe('282');
            expect(items[43].getText()).toBe('8');
            expect(items[44].getText()).toBe('18');
            expect(items[45].getText()).toBe('0');
            expect(items[46].getText()).toBe('0');
            expect(items[47].getText()).toBe('298');
            //fourth group status details
            expect(items[50].getText()).toBe('No Access Group');
            expect(items[51].getText()).toBe('1');
            expect(items[52].getText()).toBe('5');
            expect(items[54].getText()).toBe('282');
            expect(items[55].getText()).toBe('8');
            expect(items[56].getText()).toBe('18');
            expect(items[57].getText()).toBe('0');
            expect(items[58].getText()).toBe('0');
            expect(items[59].getText()).toBe('298');
            //fifth group status details
            expect(items[62].getText()).toBe('Data Center 1');
            expect(items[63].getText()).toBe('0');
            expect(items[64].getText()).toBe('0');
            expect(items[66].getText()).toBe('282');
            expect(items[67].getText()).toBe('8');
            expect(items[68].getText()).toBe('18');
            expect(items[69].getText()).toBe('0');
            expect(items[70].getText()).toBe('0');
            expect(items[71].getText()).toBe('298');

        });

    });

    it('#8 verify element status chart details', function () {

        globalPage.globalScan.elementStatus.all(by.tagName('li')).then(function(items){
            items[0].click();
            expect(items[0].getText()).toBe('Status Count');
            expect(globalPage.globalScan.elementTableRow1.getText()).toContain('OK');
            expect(globalPage.globalScan.elementTableRow1.getText()).toContain('0');
            expect(globalPage.globalScan.elementTableRow2.getText()).toContain('WARN');
            expect(globalPage.globalScan.elementTableRow2.getText()).toContain('0');
            expect(globalPage.globalScan.elementTableRow3.getText()).toContain('CRIT');
            expect(globalPage.globalScan.elementTableRow3.getText()).toContain('0');
            expect(globalPage.globalScan.elementTableRow4.getText()).toContain('UNKNOWN');
            expect(globalPage.globalScan.elementTableRow4.getText()).toContain('127');
            expect(globalPage.globalScan.elementTableRow5.getText()).toContain('MAINT');
            expect(globalPage.globalScan.elementTableRow5.getText()).toContain('0');
            items[1].click();
            expect(items[1].getText()).toBe('Types');
            browser.waitForAngular();
            expect(globalPage.globalScan.elementTableRow1.getText()).toContain('Server');
            expect(globalPage.globalScan.elementTableRow1.getText()).toContain('119');
            expect(globalPage.globalScan.elementTableRow2.getText()).toContain('NetworkDevice');
            expect(globalPage.globalScan.elementTableRow2.getText()).toContain('2');
            expect(globalPage.globalScan.elementTableRow3.getText()).toContain('Application');
            expect(globalPage.globalScan.elementTableRow3.getText()).toContain('3');
        });

    });

    it('#9 verify current monitor status chart details', function () {

        globalPage.globalScan.currentMonitorStatus.all(by.tagName('li')).then(function(items){
            items[0].click();
            expect(items[0].getText()).toBe('Status Count');
            expect(globalPage.globalScan.monitorTableRow1.getText()).toContain('OK');
            expect(globalPage.globalScan.monitorTableRow1.getText()).toContain('0');
            expect(globalPage.globalScan.monitorTableRow2.getText()).toContain('WARN');
            expect(globalPage.globalScan.monitorTableRow2.getText()).toContain('0');
            expect(globalPage.globalScan.monitorTableRow3.getText()).toContain('CRIT');
            expect(globalPage.globalScan.monitorTableRow3.getText()).toContain('0');
            expect(globalPage.globalScan.monitorTableRow4.getText()).toContain('UNKNOWN');
            expect(globalPage.globalScan.monitorTableRow4.getText()).toContain('419');
            expect(globalPage.globalScan.monitorTableRow5.getText()).toContain('MAINT');
            expect(globalPage.globalScan.monitorTableRow5.getText()).toContain('0');
            items[1].click();
            expect(items[1].getText()).toBe('Types');
            browser.waitForAngular();
            expect(globalPage.globalScan.monitorTableRow1.getText()).toContain('ERDClinux');
            expect(globalPage.globalScan.monitorTableRow1.getText()).toContain('61');
            expect(globalPage.globalScan.monitorTableRow2.getText()).toContain('Ping');
            expect(globalPage.globalScan.monitorTableRow2.getText()).toContain('93');
            expect(globalPage.globalScan.monitorTableRow3.getText()).toContain('up.time Agent');
            expect(globalPage.globalScan.monitorTableRow3.getText()).toContain('49');
            expect(globalPage.globalScan.monitorTableRow4.getText()).toContain('ERDCwindows');
            expect(globalPage.globalScan.monitorTableRow4.getText()).toContain('19');
            expect(globalPage.globalScan.monitorTableRow5.getText()).toContain('ERDCwmi');
            expect(globalPage.globalScan.monitorTableRow5.getText()).toContain('17');
        });

    });

    it('#10 verify current monitor status chart page details', function () {

        globalPage.globalScan.currentMonitorStatus.all(by.tagName('li')).then(function(items){
            items[0].click();
            expect(items[0].getText()).toBe('Status Count');
            items[1].click();
            expect(items[1].getText()).toBe('Types');
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('ERDClinux');
            globalPage.globalScan.clickMonitorPage.get(1).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('ERDCaix');
            globalPage.globalScan.clickMonitorPage.get(2).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('DNS');
            globalPage.globalScan.clickMonitorPage.get(3).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('Windows Event Log Scanner');
            globalPage.globalScan.clickMonitorPage.get(4).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('MySQL (Advanced Metrics)');
            globalPage.globalScan.currentMonitorStatus.element(by.linkText('»')).click();
            globalPage.globalScan.clickMonitorPage.get(0).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('SQL Server (Basic Checks)');
            globalPage.globalScan.clickMonitorPage.get(1).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('Windows File Shares (SMB)');
            globalPage.globalScan.clickMonitorPage.get(2).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('External Check');
            globalPage.globalScan.clickMonitorPage.get(3).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('Live Splunk Listener');
            globalPage.globalScan.clickMonitorPage.get(4).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('Exchange');
            globalPage.globalScan.currentMonitorStatus.element(by.linkText('»')).click();
            globalPage.globalScan.clickMonitorPage.get(0).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('SnmpErdc');
            globalPage.globalScan.clickMonitorPage.get(1).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('VirtualCenterErdc');
            globalPage.globalScan.clickMonitorPage.get(2).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('VmwareHostSystemBasicPerformanceErdc');
            globalPage.globalScan.clickMonitorPage.get(3).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('vApp Performance');
            globalPage.globalScan.clickMonitorPage.get(4).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('EsxErdc');
            globalPage.globalScan.currentMonitorStatus.element(by.linkText('«')).click();
            globalPage.globalScan.currentMonitorStatus.element(by.linkText('«')).click();
            globalPage.globalScan.clickMonitorPage.get(0).click();
            browser.waitForAngular();
            globalPage.globalScan.verifyFirstMonitor('ERDClinux');
        });

    });

});