export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async getContinueButton() {
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fillPassword(password) {
        for(let digitPass of password){
            await this.page.getByRole('button', { name: digitPass }).click();
        }
        await this.getContinueButton()
    }

    async fillCPF(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.getContinueButton()
    }

    async fill2FACode(code) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(code);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async getAccountBalance() {
        return await this.page.locator('#account-balance');
    }

    
}

