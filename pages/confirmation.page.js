class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.message = page.locator('.complete-header');
  }

  async getMessage() {
    return await this.message.textContent();
  }
}
module.exports = ConfirmationPage;
