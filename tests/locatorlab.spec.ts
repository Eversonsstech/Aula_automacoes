
import { test, expect, Page } from '@playwright/test';

const LOGIN_URL = 'https://locatorlab-testes.vercel.app/login';
const TASKS_URL = 'https://locatorlab-testes.vercel.app/dashboard';
const API_URL = 'https://locatorlab-testes.vercel.app/api/v1';

async function fazerLogin(
  page: Page,
  username: string,
  password: string
) {
  await page.goto(LOGIN_URL);

  await page.getByTestId('login-email-input').fill(username);
  await page.getByPlaceholder('Sua senha').fill(password);

  await page.getByRole('button', { name: 'Entrar' }).click();
}

// Teste de login pela interface
test('Entrar - acessar o sistema', async ({ page }) => {
  await fazerLogin(page, 'aluno@locatorlab.dev', 'Aluno@123');

  await expect(page).toHaveURL(TASKS_URL);
});

// Teste de Submit pela API
test('Submit - Entrar pela API', async ({ request }) => {
  const resposta = await request.post(`${API_URL}/auth/login`, {
    data: {
      email: 'aluno@locatorlab.dev',
      password: 'Aluno@123',
    },
  });

  expect(resposta.status()).toBe(200);
});

test('Download - avatar não encontrado', async ({ request }) => {
  const resposta = await request.get(
    `${API_URL}/avatars/seed_user_aluno`
  );

  expect(resposta.status()).toBe(404);
});



  
 

