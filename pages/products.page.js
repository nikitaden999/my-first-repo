class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.sort = page.locator('.product_sort_container');
    this.items = page.locator('.inventory_item');
  }

  async getTitle() {
    return await this.title.textContent();
  }

  async addMostExpensiveProduct() {
    await this.sort.selectOption('hilo');
    const firstItem = this.items.first();
    const name = await firstItem.locator('.inventory_item_name').textContent();
    await firstItem.locator('.btn_inventory').click();
    return name;
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}
module.exports = ProductsPage;
