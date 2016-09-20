/**
 * Created by jacky.
 */

'use strict';

describe('E2E: fake test for waiting page loading', function () {


    beforeEach(function () {
        browser.get('#/login/');
        browser.ignoreSynchronization = true; //crazy important
    });


    it('#0 prepare to load the web page', function () {

        expect(true).toBe(true);
        browser.waitForAngular();
        browser.sleep(5000);

    });

});