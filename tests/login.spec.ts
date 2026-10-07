import { test, expect, Page } from '@playwright/test';

async function fazerLogin(page: Page, username: string, password: string) {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
}

test.describe("Login", () => {

    test("Login validado", async ({ page }) => {

        await fazerLogin(
            page,
            "standard_user",
            "secret_sauce"
        );

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/inventory.html"
        );
    });

    test("Login não validado", async ({ page }) => {

        await fazerLogin(
            page,
            "usuario_errado",
            "senha_errada"
        );

        await expect(
            page.getByText("Epic sadface")
        ).toBeVisible();
    });

});