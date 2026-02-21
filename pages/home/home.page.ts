import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly header: Locator;
    readonly logo: Locator;
    readonly navigationBar: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('header');
        this.logo = this.header.locator('img');
        this.navigationBar = this.header.locator('nav');
        this.footer = page.locator('footer');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/phptravels\.net/);
        await expect(this.header).toBeVisible();
        await expect(this.logo).toBeVisible();
        await expect(this.navigationBar).toBeVisible();
        await expect(this.footer).toBeVisible();
    }
}