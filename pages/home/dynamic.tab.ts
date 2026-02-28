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

    private async selectDate(date: string): Promise<void> {
        const [day, month, year] = date.split('-');
        const datepicker = this.page.locator('.datepicker:not(.hidden)');
        await datepicker.locator('.datepicker-days th.switch').click();
        await datepicker.locator('.datepicker-months th.switch').click();
        await datepicker.locator('.datepicker-years .year').filter({ hasText: year }).click();
        await datepicker.locator('.datepicker-months .month').filter({ hasText: month }).click();
        await datepicker.locator('.datepicker-days .day').filter({ hasText: day }).click();
    }

    async searchFlight(from: string, to: string, date: string, type: string, flightClass: string): Promise<void> {
        const departureFromInput = this.page.getByPlaceholder('Departure City or Airport');
        const arrivalToInput = this.page.getByPlaceholder('Arrival City or Airport');
        const departureDateInput = this.page.getByPlaceholder('Departure Date');
        const flightTypeInput = this.page.locator('.form-control').filter({ hasText: 'Flight Type' });
        const classInput = this.page.locator('.form-control').filter({ hasText: 'Flight Class' });
        const searchButton = this.page.getByRole('button', { name: 'Search Flights' });

        await departureFromInput.fill(from);
        await this.page.getByText('All airports').first().click();
        await arrivalToInput.fill(to);
        await this.page.getByText('All airports').first().click();

        await this.selectDate(date);

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
        await this.selectDate(checkin);

        await this.page.waitForFunction(() =>
            document.querySelectorAll('.datepicker:not(.hidden)').length === 1
        );
        
        await this.selectDate(checkout);

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