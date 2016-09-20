/**
 * Created by jacky.
 */

//'use strict';
//
//describe('E2E: Report Page test', function () {
//
//    var globalPage = require('./page-objects/report-page'); //call the page object
//
//    beforeEach(function () {
//        browser.get('#/reports/');
//        //browser.waitForAngular();
//        browser.ignoreSynchronization = true; //crazy important
//    });

//it('#1 should redirect to login page, log into and then go back to infrastructure page', function () {
//
//  browser.waitForAngular();
//  browser.sleep(100);
//  expect(browser.getCurrentUrl()).toBe(infrastructurePage.tabs.expectedIncorrectUrl);
//  loginPage.auth.login('admin', 'admin');
//  browser.waitForAngular();
//  browser.sleep(100);
//  expect(browser.getCurrentUrl()).toContain(infrastructurePage.tabs.expectedCorrectUrl);
//
//});
//
//    it('should have a main menu a main menu with 5 items (normal)', function () { // does work
//
//        var mainMenuList = [ 'Dashboard', 'Reports', 'Infrastructure', 'Monitors', 'Configure' ];
//
//        globalPage.mainMenu.mainNav.then(function (items) {
//            expect(items.length).toBe(5);
//            items.forEach(function (ele, i) { // loop through array
//                expect(ele.getText()).toBe(mainMenuList[i]); // expect current element to be equal to one of the items in mainMenuList
//            });
//        });
//
//    });
//
//    it('should have a main menu a main menu with 5 items (mapped array)', function () { // does work
//
//        var mainMenuList = [ 'Dashboard', 'Reports', 'Infrastructure', 'Monitors', 'Configure' ],
//            tabs = globalPage.mainMenu.mainNav.map(function (items) {
//                return items.getText();
//            });
//
//        tabs.then(function (items) {
//            expect(items.length).toBe(5);
//            items.forEach(function (ele, i) { // loop through array
//                expect(ele).toBe(mainMenuList[i]); // expect current element to be equal to one of the items in mainMenuList
//            });
//        });
//
//    });
//
//});