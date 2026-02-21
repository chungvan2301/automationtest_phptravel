import { test, expect } from '../../fixtures/test-fixtures';

/**
 * TC-REG-02
 * Title: Verify Flight Search with Valid Data
 * Type: Regression
 * Priority: High
 */

test.describe('TC-REG-02 - Flight Search Validation', () => {

    test('User should be able to search flights with valid data', async ({ homePage, dynamicTab }) => {

        await test.step('Navigate to homepage', async () => {
            await homePage.navigate();
        });

        await test.step('Open Flights tab', async () => {
            await dynamicTab.openFlightsTab();
        });

        await test.step('Enter valid flight search data and submit', async () => {
            await dynamicTab.searchFlight('NYC', 'LON', '12-Jun-2026', 'Round Trip', 'Economy');
        });

        await test.step('Verify flight search results are displayed', async () => {
            await dynamicTab.verifyFlightsResultsDisplayed();
        });

    });
});

/**
 * TC-REG-03
 * Title: Verify Hotel Search Functionality
 * Type: Regression
 * Priority: High
 */

test.describe('TC-REG-03 - Hotel Search Validation', () => {

    test('User should be able to search hotels with valid data', async ({ homePage, dynamicTab }) => {

        await test.step('Navigate to homepage', async () => {
            await homePage.navigate();
        });

        await test.step('Open Stays tab', async () => {
            await dynamicTab.openStaysTab();
        });

        await test.step('Enter valid hotel search data and submit', async () => {
            await dynamicTab.searchStays('LONDON', '12-Jun-2026', '13-Jun-2026', 'Viet');
        });

        await test.step('Verify hotel search results are displayed', async () => {
            await dynamicTab.verifyStaysResultsDisplayed();
        });

    });
});