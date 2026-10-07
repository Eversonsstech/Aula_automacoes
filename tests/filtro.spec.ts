import { test, expect, Page } from '@playwright/test';

async function fazerLogin( page: Page, username: string, password: string) {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", {name: "Login" }).click();
}


    test.beforeEach(async({ page }) => {
        await fazerLogin (page, "standard_user", "secret_sauce");

    })

    test("Filtro validado", async ({page}) =>{
        await expect(page).toHaveURL(
            "https://www.saucedemo.com/inventory.html"
        );
    });

    test("Filtro não validado", async ({ page }) => {

    await page.locator(".product_sort_container").selectOption("za");

    await expect(
        page.locator(".product_sort_container")
    ).toHaveValue("za");

});
