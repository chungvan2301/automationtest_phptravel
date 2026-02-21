import { test, expect } from '../../fixtures/test-fixtures';

/**
 * TC-REG-01
 * Title: Verify Homepage Loads Successfully
 * Type: Smoke / Regression
 * Priority: High
 */

test.describe('TC-REG-01 - Homepage Load Verification', () => {

    test('Homepage should load successfully with all main components visible', async ({ homePage, page }) => {

        await test.step('Navigate to homepage', async () => {
            await homePage.navigate();
        });

        await test.step('Verify homepage UI components are visible', async () => {
            await homePage.verifyPageLoaded();
        });

        await test.step('Verify no critical console errors', async () => {
            const errors: string[] = [];

            page.on('console', msg => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });

            expect(errors.length).toBe(0);
        });
    });

});