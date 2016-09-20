/**
 * Created by jacky.
 */

'use strict';

var MonitorsPage = function () {

    this.expectedCorrectUrl = browser.baseUrl + '#/monitors/';
    this.expectedIncorrectUrl = browser.baseUrl + '#/login/';
    this.monitorContainer = element(by.css('#monitor-container'));
    this.accordionMonitors = element(by.css('#accordion-monitors'));
    this.tableName = element(by.xpath('html/body/div[1]/div[2]/div/div/div/div/div[1]'));
    this.clickPage = element.all(by.css('[ng-click="pageClick({data:data})"]'));
    this.monitorContainerDetails = element(by.css('#monitor-container')).all(by.tagName('div'));
    this.monitorNames = element(by.css('#monitor-container')).all(by.tagName('a'));
    this.pingMonitor = element(by.linkText('PING-RH63.rd2.local'));
    this.monitorDetailsTable = element(by.xpath('html/body/div[1]/div[2]/div[2]/div/div'));       // ******** need chester provide the ID for detail table
    this.declineAccessMessage = element(by.css('#routed-from'));
    this.expectedDeclineAccessMessage = 'You do not have access to monitors. Please login to access this page.';

    this.verifyFirstMonitor = function (name) {

        this.monitorNames.then(function (items) {
            expect(items[0].getText()).toBe(name);
        });

    };

};

module.exports = {
    monitors: new MonitorsPage()
};