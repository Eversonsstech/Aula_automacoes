
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

/*

Evidencia da execução bem sucedida


Running 6 tests using 6 workers

  ✓  1 [firefox] › tests\locatorlab.spec.ts:22:5 › Entrar - acessar o sistema (5.3s)
  ✓  2 [chromium] › tests\locatorlab.spec.ts:22:5 › Entrar - acessar o sistema (6.0s)
  ✓  3 [firefox] › tests\locatorlab.spec.ts:29:5 › Submit - Entrar pela API (1.9s)
  ✓  4 [webkit] › tests\locatorlab.spec.ts:29:5 › Submit - Entrar pela API (2.1s)
  ✓  5 [webkit] › tests\locatorlab.spec.ts:22:5 › Entrar - acessar o sistema (5.4s)
  ✓  6 [chromium] › tests\locatorlab.spec.ts:29:5 › Submit - Entrar pela API (1.9s)

  6 passed (8.1s)
  
  */

PS C:\Aula_automacoes> 