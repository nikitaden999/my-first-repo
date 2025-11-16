class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zip = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
  }

  async fillInfo(fn, ln, zip) {
    await this.firstName.fill(fn);
    await this.lastName.fill(ln);
    await this.zip.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}
module.exports = CheckoutPage;
