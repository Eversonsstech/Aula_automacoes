import { test, expect, Page } from '@playwright/test';

async function fazerLogin(page: Page, username: string, password: string) {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
}

test.describe("Login", () => {

    test.beforeEach(async ({ page }) => {
        await fazerLogin(page, "standard_user", "secret_sauce");
    });

    test("add_carrinho validado", async ({ page }) => {
        await expect(page).toHaveURL(
            "https://www.saucedemo.com/inventory.html"
        );
    });

    test("add_carrinho não validado", async ({ page }) => {
        await page.getByRole("button", { name: /Add to cart/ }).first().click();

        await expect(
            page.getByText("Remove")
        ).toBeVisible();
    });

});