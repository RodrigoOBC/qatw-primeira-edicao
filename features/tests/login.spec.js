import { test, expect } from '@playwright/test';
import { get2FACode } from '../../suport/db';
import {LoginPage} from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';

test('Não deve logar quando o cogido de verificação estiver invalido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = {
    cpf: process.env.CPF,
    password:process.env.PASSWORD
  }

  await loginPage.goToLoginPage();

  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  
  await page.getByRole('textbox', { name: '000000' }).fill('123456');
  await page.getByRole('button', { name: 'Verificar' }).click();
  
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar a conta do usuário', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);
  const user = {
    cpf: process.env.CPF,
    password:process.env.PASSWORD
  }

  await loginPage.goToLoginPage();

  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  
  await page.waitForTimeout(3000)
  const code = await get2FACode();
  await loginPage.fill2FACode(code);

  await expect(await dashPage.getAccountBalance()).toHaveText('R$ 5.000,00');
});