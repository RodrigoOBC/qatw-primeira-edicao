import { test, expect } from '@playwright/test';
import { get2FACode } from '../../suport/db';
import {LoginPage} from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../../suport/redis';

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

  await cleanJobs();
 
  await loginPage.goToLoginPage();

  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  
  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor('visible');
  // const code = await get2FACode(user.cpf);

  const {code} = await getJob();

  await loginPage.fill2FACode(code);

  await expect(await dashPage.getAccountBalance()).toHaveText('R$ 5.000,00');
});