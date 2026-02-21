import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home/home.page';
import { DynamicTab } from '../pages/home/dynamic.tab';

type Fixtures = {
    homePage: HomePage;
    dynamicTab: DynamicTab;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    dynamicTab: async ({ page }, use) => {
        const dynamicTab = new DynamicTab(page);
        await use(dynamicTab);
    }
});

export { expect } from '@playwright/test';