import { Page, Locator, expect } from '@playwright/test';

export class DynamicTab {
    readonly page: Page;
    readonly flightsTab: Locator;
    readonly visaTab: Locator;
    readonly toursTab: Locator;
    readonly carsTab: Locator;
    readonly staysTab: Locator;

    constructor(page: Page) {
        this.page = page;

        this.flightsTab = page.getByRole('tab', { name: 'Flights' });
        this.visaTab = page.getByRole('tab', { name: 'Visa' });
        this.toursTab = page.getByRole('tab', { name: 'Tours' });
        this.carsTab = page.getByRole('tab', { name: 'Cars' });
        this.staysTab = page.getByRole('tab', { name: 'Stays' });
    }

    async openFlightsTab(): Promise<void> {
        await this.flightsTab.click();
    }

    async openStaysTab(): Promise<void> {
        await this.staysTab.click();
    }

    async searchFlight(from: string, to: string, date: string, type: string, flightClass: string): Promise<void> {
        const departureFromInput = this.page.getByPlaceholder('Departure City or Airport');
        const arrivalToInput = this.page.getByPlaceholder('Arrival City or Airport');
        const departureDateInput = this.page.getByPlaceholder('Departure Date');
        const flightTypeInput = this.page.locator('.form-control').filter({ hasText: 'Flight Type' });
        const classInput = this.page.locator('.form-control').filter({ hasText: 'Flight Class' });
        const searchButton = this.page.getByRole('button', { name: 'Search Flights' });

        await departureFromInput.fill(from);
        await this.page.click('text=All airports');
        await arrivalToInput.fill(to);
        await this.page.click('text=All airports');

        await this.page.locator('.datepicker:not(.hidden) .datepicker-days th.switch').click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-months th.switch').click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-years .year').filter({ hasText: date.split('-')[2] }).click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-months .month').filter({ hasText: date.split('-')[1] }).click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-days .day').filter({ hasText: date.split('-')[0] }).click();

        await flightTypeInput.locator('.input.cursor-pointer').click();
        await flightTypeInput.locator('.input-dropdown-item').filter({ hasText: type }).click();

        await classInput.locator('.input.cursor-pointer').click();
        await classInput.locator('.input-dropdown-item').getByText(flightClass, { exact: true }).click();

        await searchButton.click();
    }

    async searchStays(destination: string, checkin: string, checkout: string, nationality: string): Promise<void> {
        const destinationInput = this.page.getByRole('textbox', { name: 'Search By City' });
        const checkinInput = this.page.getByPlaceholder('Check-in Date');
        const checkoutInput = this.page.getByPlaceholder('Check-out Date');
        const nationalityInput = this.page.locator('.form-control').filter({ hasText: 'Nationality' });
        const searchButton = this.page.getByRole('button', { name: 'Search Hotels' });

        await destinationInput.fill(destination);
        await this.page
            .locator('div[\\@click="selectDestination(d)"]')
            .first()
            .click();

        await checkinInput.click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-days th.switch').click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-months th.switch').click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-years .year').filter({ hasText: checkin.split('-')[2] }).click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-months .month').filter({ hasText: checkin.split('-')[1] }).click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-days .day').filter({ hasText: checkin.split('-')[0] }).click();

        await this.page.waitForFunction(() =>
            document.querySelectorAll('.datepicker:not(.hidden)').length === 1
        );
        
        await this.page.locator('.datepicker:not(.hidden) .datepicker-days th.switch').click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-months th.switch').click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-years .year').filter({ hasText: checkout.split('-')[2] }).click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-months .month').filter({ hasText: checkout.split('-')[1] }).click();
        await this.page.locator('.datepicker:not(.hidden) .datepicker-days .day').filter({ hasText: checkout.split('-')[0] }).click();

        await nationalityInput.click();
        await this.page.getByPlaceholder('Search country...').fill(nationality);
        await nationalityInput.locator('.input-dropdown-item').filter({ hasText: nationality }).click();

        await searchButton.click();
    }

    async verifyFlightsResultsDisplayed(): Promise<void> {
        await expect(this.page).toHaveURL(/flights/i);
    }

    async verifyStaysResultsDisplayed(): Promise<void> {
        await expect(this.page).toHaveURL(/stays/i);
    }
}