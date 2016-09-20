/**
 * Created by jacky.
 */

'use strict';

var TabsPage = function () {

        this.elementTab = element(by.css('#infa-elements'));
        this.topologyTab = element(by.css('#infa-topology'));
        this.tagsTab = element(by.css('#infa-tags'));
        this.expectedCorrectUrl = browser.baseUrl + '#/infrastructure/elements/';
        this.expectedIncorrectUrl = browser.baseUrl + '#/login/';

    },
    ElementsPage = function () {

        this.elementContainer = element(by.css('#infa-elements-container'));
        this.sortFieldOption = element(by.css('#view-select'));
        this.sizeOfPage = element(by.css('#per-page-select'));
        this.searchField = element(by.css('#element-search'));
        this.searchBtn = element(by.css('#element-search-button'));
        this.selectedViewOption = element(by.css('#view-select')).element(by.css('[selected="selected"]'));
        this.firstOption = element(by.css('#view-select')).element(by.css('option[value="0"]'));
        this.secondOption = element(by.css('#view-select')).element(by.css('option[value="1"]'));
        this.firstGroup = element(by.linkText('My Infrastructure'));
        this.secondGroup = element(by.linkText('Automated Group'));
        this.firstMonitorOfFirstElement = element(by.partialLinkText('Warn Application'));
        this.firstMonitorOfSecondElement = element(by.partialLinkText('ALL-WS2008.rd2.local'));
        this.columnNames = element(by.css('#infrastructure-elements-table-view')).all(by.tagName('div'));
        this.linuxIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[2]/div/div'));
        this.windowsIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[5]/div/div'));
        this.solarisIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[13]/div/div'));
        this.vmwareIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[14]/div/div'));
        this.hpIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[18]/div/div'));
        this.vCenterIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[23]/div/div'));
        this.aixIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[30]/div/div'));
        this.novellIcon = element(by.xpath('.//*[@id=\'infa-elements-container\']/div/div[1]/div/div[2]/div/ul[1]/li/span/ul/li[32]/div/div'));
        this.declineAccessMessage = element(by.css('#routed-from'));
        this.expectedDeclineAccessMessage = 'You do not have access to infrastructure/elements. Please login to access this page.';

    },
    TopologyPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/infrastructure/topology/';
        this.expectedDeclineAccessMessage = 'You do not have access to infrastructure/topology. Please login to access this page.';

    },
    TagsPage = function () {

        this.expectedCorrectUrl = browser.baseUrl + '#/infrastructure/tags/';
        this.expectedDeclineAccessMessage = 'You do not have access to infrastructure/tags. Please login to access this page.';

    };

module.exports = {
    tabs: new TabsPage(),
    elements: new ElementsPage(),
    topology: new TopologyPage(),
    tags: new TagsPage()
};

