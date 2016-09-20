/**
 * Created by jacky.
 */

'use strict';

var DashboardPage = function () {

        this.expectedIncorrectUrl = browser.baseUrl + '#/login/';
        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/global-scan/';
        this.declineAccessMessage = element(by.css('#routed-from'));
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/global-scan. Please login to access this page.';
        this.globalScanNav = element.all(by.css('#global-scan-menu li'));
        this.globalScanMenuList = [ 'Global Scan', 'Resource Scan', 'SLAs', 'Applications', 'Network', 'Servers', 'Performance', 'Incidents' ];

    },
    GlobalScanPage = function () {

        this.monitorStatus = element(by.css('#monitor-status'));
        this.elementStatus = element(by.css('#global-scan-element-status-panel'));
        this.currentMonitorStatus = element(by.css('#global-scan-monitor-status-panel'));
        this.groupStatus = element(by.css('#global-scan-groups-panel'));
        this.clickGroupPage = element(by.css('#global-scan-groups-panel')).all(by.css('[ng-click="pageClick({data:data})"]'));
        this.expectedMonitorStatusName = 'Monitor Status, past 24 hours';
        this.expectedElementStatusName = 'Element Status';
        this.expectedCurrentMonitorStatusName = 'Current Monitor Status';
        this.expectedGroupStatusName = 'Group Status';
        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/global-scan/';
        this.groupElementDetails = element(by.css('#global-scan-groups-panel')).all(by.tagName('td'));
        this.clickMonitorPage = element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).all(by.css('[ng-click="pageClick({data:data})"]'));
        this.elementTableRow1 = element(by.css('#global-scan-element-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-0'));
        this.elementTableRow2 = element(by.css('#global-scan-element-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-1'));
        this.elementTableRow3 = element(by.css('#global-scan-element-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-2'));
        this.elementTableRow4 = element(by.css('#global-scan-element-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-3'));
        this.elementTableRow5 = element(by.css('#global-scan-element-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-4'));
        this.monitorTableRow1 = element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-0'));
        this.monitorTableRow2 = element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-1'));
        this.monitorTableRow3 = element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-2'));
        this.monitorTableRow4 = element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-3'));
        this.monitorTableRow5 = element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-4'));


        this.verifyFirstGroup = function (name) {

            this.groupStatus.all(by.tagName('p')).then(function (items) {
                expect(items[0].getText()).toBe(name);
            });

        };

        this.verifyFirstMonitor = function (name) {
            expect(element(by.css('#global-scan-monitor-status-panel')).element(by.css('[class="tab-pane ng-scope active"]')).element(by.css('#element-status-row-0')).getText()).toContain(name);
        };

        this.verifyTableColumn = function (name1,name2,name3,name4,name5) {

            this.groupStatus.all(by.tagName('th')).then(function (items) {

                expect(items[2].getText()).toBe(name1);
                expect(items[3].getText()).toBe(name2);
                expect(items[4].getText()).toBe(name3);
                expect(items[5].getText()).toBe(name4);
                expect(items[6].getText()).toBe(name5);

            });

        };

    },
    ResourceScanPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/resource-scan/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/resource-scan. Please login to access this page.';

    },
    SLAsPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/sla/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/sla. Please login to access this page.';

    },
    ApplicationsPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/applications/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/applications. Please login to access this page.';

    },
    NetworkPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/network/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/network. Please login to access this page.';

    },
    ServersPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/servers/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/servers. Please login to access this page.';

    },
    PerformancePage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/performance/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/performance. Please login to access this page.';

    },
    IncidentsPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/dashboard/incidents/';
        this.expectedDeclineAccessMessage = 'You do not have access to dashboard/incidents. Please login to access this page.';

    };

module.exports = {
    dashboard: new DashboardPage(),
    globalScan: new GlobalScanPage(),
    resourceScan: new ResourceScanPage(),
    SLAs: new SLAsPage(),
    applications: new ApplicationsPage(),
    network: new NetworkPage(),
    servers: new ServersPage(),
    performance: new PerformancePage(),
    incidents: new IncidentsPage()
};

