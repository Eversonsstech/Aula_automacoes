import {  test, expect, Page  } from "@playwright/test"

async function fazerLogin(page: Page, username: string, password: string ) {
    await page.goto("https://www.saucedemo.com/")
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", {name:"Login"}).click();


    test.beforeEach( async ({page}) =>{
        await fazerLogin( page, "standard_user", "secret_suace");
    })

    test("Menu Hamburger abre: validado.", async ({page}) =>{
        await expect (page).toHaveURL("https://www.saucedemo.com/inventory.Html"

        );
    })
    test("Menu Hamburger não abre: não validado", async ({ page}) => {

        await page.getByRole("button", { name: "Open Menu" }).click();

        await expect(
            page.getByText("All Items")
        ).toBeVisible();
    })
};
