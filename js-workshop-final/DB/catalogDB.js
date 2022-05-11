/**
 * mocks a virtual catalog
 * @author ES Academy
 */
class CatalogDB {
  constructor() {
    this.data = [];
  }
  /**
   * generate some dummy data in DB
   */
  seed() {
    this.data = [
      { id: '6', name: 'biondi santi deluxe', img: 'p1.webp', category: 'liquors' },
      { id: '1', name: 'biondi santi', img: 'p1.webp', category: 'liquors' },
      { id: '4', name: 'pen', img: 'p4.webp', category: 'accessories' },
      { id: '5', name: 'expensive stuff', img: 'p5.webp', category: 'accessories' },
      { id: '3', name: 'jacket', img: 'p3.webp', category: 'clothing' },
      { id: '2', name: 'montblanc geosphere', img: 'p2.webp', category: 'accessories' }
    ];
  }

  getByCategory(products) {
    const filteredProducts = this.data.filter(element => {
      return products = element.category;
    });
    return filteredProducts;
  }

  /**
   * naive implementation of insert
   * @param {Product} product product to be inserted in DB
   * @returns {Product} product just added in DB
   */
  insert(product) {
    this.data.push(product);
    return product;
  }
  /**
   * return list of all products
   * @returns {[Product]} list of products
   */
  getAll() {
    return this.data;
  }
  /**
   * return the product of given id
   * @param {string} id id of product
   * @returns {Product | null} product if found, otherwise null
   */

  maxLength() {
    let index = 0;
    for (let i = 0; i < this.data.length - 1; i++) {
      if (this.data[index].name.length < this.data[i + 1].name.length) {
        index = i + 1;
      }
    }
    return this.data[index];
  }

  // getByCategory(category) {
  //   return this.data.filter(product => product.category.indexOf(category) != -1);
  // }

  get(id) {
    return this.data.find(product => product.id === id) || null;
  }
  /**
   * update the product of given id
   * @param {string} id 
   * @param {Product} product 
   * @returns {Product | false} product if successfull, otherwise false
   */
  update(id, product) {
    const index = this.data.findIndex(product => product.id === id);
    if (index > -1) {
      this.data[index] = product;
      return product;
    }
    return false;
  }
  /**
   * remove the product of given id
   * @param {string} id id of product
   * @returns {boolean} true if found and deleted, otherwise false
   */
  remove(id) {
    const index = this.data.findIndex(product => product.id === id);
    if (index >= 0) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }
  /**
   * clean all the catalog
   */
  empty() {
    this.data = [];
  }
}

module.exports = CatalogDB;
