export class DashPage {
    constructor(page) {
        this.page = page;
    }

    async getAccountBalance() {
        return await this.page.locator('#account-balance');
    }
}