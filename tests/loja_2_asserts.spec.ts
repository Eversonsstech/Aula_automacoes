import { test, expect, Page } from '@playwright/test';

const INVENTORY_URL =
    "https://www.saucedemo.com/inventory.html";

async function fazerLogin(
    page: Page,
    username: string,
    password: string
) {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
}


// 1. LOGIN

test.describe("Login", () => {

    test("Login válido", async ({ page }) => {

        await fazerLogin(page, "standard_user", "secret_sauce");

        await expect(page).toHaveURL(INVENTORY_URL);

        await expect(page.getByText("Products", { exact: true }))
            .toBeVisible();

        await expect(page.locator(".inventory_item"))
            .toHaveCount(6);
    });


    test("Login inválido", async ({ page }) => {

        await fazerLogin(page, "usuario_errado", "senha_errada");

        await expect(page.getByText("Epic sadface"))
            .toBeVisible();

        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });

});


// 2. MENU HAMBURGER

test.describe("Menu Hamburger", () => {

    test.beforeEach(async ({ page }) => {

        await fazerLogin(page, "standard_user", "secret_sauce");

    });


    test("Abrir menu", async ({ page }) => {

        await page.getByRole("button", { name: "Open Menu" }).click();

        await expect(page.getByText("All Items")).toBeVisible();

        await expect(page.getByRole("link", { name: "About" }))
            .toBeVisible();

        await expect(page.getByRole("link", { name: "Logout" }))
            .toBeVisible();

    });

});


// 3. CATÁLOGO

test.describe("Catálogo", () => {

    test.beforeEach(async ({ page }) => {

        await fazerLogin(page, "standard_user", "secret_sauce");

    });


    test("Acessar catálogo", async ({ page }) => {

        await expect(page).toHaveURL(INVENTORY_URL);

        await expect(page.getByText("Products", { exact: true }))
            .toBeVisible();

        await expect(page.locator(".inventory_item"))
            .toHaveCount(6);

        await expect(
            page.getByRole("button", { name: /Add to cart/ }).first()
        ).toBeEnabled();

    });

});


// 4. FILTRO

test.describe("Filtro", () => {

    test.beforeEach(async ({ page }) => {

        await fazerLogin(page, "standard_user", "secret_sauce");

    });


    test("Ordenar produtos de Z para A", async ({ page }) => {

        await page.locator(".product_sort_container").selectOption("za");

        
        await expect(page.locator(".product_sort_container"))
            .toHaveValue("za");

        
        const nomes = await page.locator(".inventory_item_name").allTextContents();

        expect(nomes).toEqual([...nomes].sort().reverse());

    });

});


// 5. CARRINHO

test.describe("Carrinho", () => {

    test.beforeEach(async ({ page }) => {

        await fazerLogin(page, "standard_user", "secret_sauce");

    });


    test("Adicionar produto ao carrinho", async ({ page }) => {

        await page.getByRole("button", { name: /Add to cart/ }).first().click();

        
        await expect(
            page.getByRole("button", { name: "Remove" }).first()
        ).toBeVisible();

       
        await expect(page.locator(".shopping_cart_badge"))
            .toHaveText("1");

        
        await expect(page.locator(".shopping_cart_link"))
            .toBeVisible();

    });

});
