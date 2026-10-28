import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test("Login validado com sucesso",async ({page})=>{
    const Login = new LoginPage(page);
    
    await Login.abrir();
    await Login.login("standard_user", "secret_sauce");
    expect(page).toHaveURL("https://www.saucedemo.com/")
})
test("Login invalido",async ({page})=>{
    const Login = new LoginPage(page);
   
    await Login.abrir();
    await Login.login("standard_user", "senha errada");
    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})
