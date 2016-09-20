/**
 * Created by jacky.
 */

'use strict';

describe('E2E: infrastructure Page elements tab test', function () {

    var loginPage = require('./page-objects/login-page'),
        mainMenuPage = require('./page-objects/mainmenu-page'),
        infrastructurePage = require('./page-objects/infrastructure-page'); //call the page object

    beforeEach(function () {

        browser.get('#/infrastructure/elements/');
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
        browser.get('#/infrastructure/elements/');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toBe(infrastructurePage.tabs.expectedIncorrectUrl);   // verify before login  infrastructure web page
        expect(infrastructurePage.elements.declineAccessMessage.getText()).toBe(infrastructurePage.elements.expectedDeclineAccessMessage);
        expect(loginPage.auth.errorMessage.isPresent()).toBe(false);
        expect(loginPage.auth.logoutMessage.isPresent()).toBe(false);
        loginPage.auth.login('admin', 'admin');
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain(infrastructurePage.tabs.expectedCorrectUrl); // verify after login infrastructure web page

    });

    it('#2 verify 5 options on main menu bars', function () { // does work

        mainMenuPage.mainMenu.mainNav.then(function (items) {
            expect(items.length).toBe(5);
            items.forEach(function (ele, i) { // loop through array
                expect(ele.getText()).toBe(mainMenuPage.mainMenu.mainMenuList[i]); // expect current element to be equal to one of the items in mainMenuList
            });
        });

    });

    it('#3 verify and go though each tab under infrastructure page', function () {

        expect(infrastructurePage.tabs.elementTab).toBeDefined();              // verify elements tab exist
        expect(infrastructurePage.tabs.topologyTab).toBeDefined();          // verify topology tab exist
        expect(infrastructurePage.tabs.tagsTab).toBeDefined();          // verify tags tab exist
        infrastructurePage.tabs.topologyTab.click();          // click topology tab
        browser.waitForAngular();
        infrastructurePage.tabs.tagsTab.click();          // click tags tab
        browser.waitForAngular();
        infrastructurePage.tabs.elementTab.click();              // click elements tab

    });

    it('#4 verify view field, size of page, search field, elements container table on element tab', function () {

        expect(infrastructurePage.elements.elementContainer).toBeDefined();
        expect(infrastructurePage.elements.sortFieldOption).toBeDefined();
        expect(infrastructurePage.elements.sizeOfPage).toBeDefined();
        expect(infrastructurePage.elements.searchField).toBeDefined();
        expect(infrastructurePage.elements.searchBtn).toBeDefined();
        expect(loginPage.auth.footer).toBeDefined();

    });

    it('#5 testing search function on element tab', function () {

        browser.waitForAngular();
        infrastructurePage.elements.searchField.sendKeys('jacky');
        infrastructurePage.elements.searchBtn.click();

    });


    it('#6 verify default option and testing other option can be selected', function () {

        expect(infrastructurePage.elements.selectedViewOption.getText()).toContain('Hierarchy');    // verify default view option
        infrastructurePage.elements.sortFieldOption.click();
        infrastructurePage.elements.secondOption.click();
        expect(infrastructurePage.elements.firstOption.getAttribute('selected')).toBeFalsy();
        infrastructurePage.elements.sortFieldOption.click();
        infrastructurePage.elements.firstOption.click();
        expect(infrastructurePage.elements.firstOption.getAttribute('selected')).toBeTruthy();

    });

    it('#7 verify first and second elements and expand them to showing details', function () {

        browser.waitForAngular();
        infrastructurePage.elements.firstGroup.click();   // click first element and expand the details
        browser.waitForAngular();
        expect(infrastructurePage.elements.firstMonitorOfFirstElement.getText()).toContain('Warn Application'); // after click the first element and it shows custom monitor
        infrastructurePage.elements.secondGroup.click();  // click second element and expand the details
        browser.waitForAngular();
        expect(infrastructurePage.elements.firstMonitorOfSecondElement.getText()).toContain('ALL-WS2008.rd2.local'); // after click the second element and it shows all IIS monitor

    });

    it('#8 verify table Container column names', function () {

        infrastructurePage.elements.sortFieldOption.click();
        infrastructurePage.elements.secondOption.click();
        browser.waitForAngular();
        infrastructurePage.elements.columnNames.then(function (items) {
            expect(items[2].getText()).toEqual('Element');   // verify table column name
            expect(items[3].getText()).toEqual('Host Name');
            expect(items[4].getText()).toEqual('Description');
            expect(items[5].getText()).toEqual('Architecture');
            expect(items[6].getText()).toEqual('Monitored');
        });
    });

    it('#9 verify element detail page', function () {

        browser.waitForAngular();
        infrastructurePage.elements.firstGroup.click();
        browser.waitForAngular();
        infrastructurePage.elements.firstMonitorOfFirstElement.click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:9999/#/element/3691353');

//        infrastructurePage.elements.sortFieldOption.click();
//        infrastructurePage.elements.secondOption.click();
//        browser.waitForAngular();
//        browser.sleep(500);
//        element(by.linkText('RH63.rd2.local')).click();
//        expect(browser.getCurrentUrl()).toBe('http://localhost:9999/#/element/2365');

    });

    it('#10 verify element icon image', function () {

        browser.waitForAngular();
        infrastructurePage.elements.firstGroup.click();
        browser.waitForAngular();
        browser.sleep(500);
        expect(infrastructurePage.elements.linuxIcon.getAttribute('class')).toContain('linux');
        expect(infrastructurePage.elements.windowsIcon.getAttribute('class')).toContain('window');
        expect(infrastructurePage.elements.solarisIcon.getAttribute('class')).toContain('solaris');
        expect(infrastructurePage.elements.vmwareIcon.getAttribute('class')).toContain('vmware');
        expect(infrastructurePage.elements.hpIcon.getAttribute('class')).toContain('hp');
        expect(infrastructurePage.elements.vCenterIcon.getAttribute('class')).toContain('vcenter');
        expect(infrastructurePage.elements.aixIcon.getAttribute('class')).toContain('aix');
        expect(infrastructurePage.elements.novellIcon.getAttribute('class')).toContain('novell');

    });

});