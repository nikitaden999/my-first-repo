class CartPage {
  constructor(page) {
    this.page = page;
    this.item = page.locator('.cart_item');
    this.checkoutBtn = page.locator('#checkout');
  }

  async getItemName() {
    return await this.item.first().locator('.inventory_item_name').textContent();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
module.exports = CartPage;
