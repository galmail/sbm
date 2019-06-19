/**
 * order.js
 * CS - Order Module
 */

class Order {

  static get TYPES() { return [ 'BUY', 'SELL' ]; }
  static get MIN_QUANTITY() { return 1; }

  constructor(order){
    this.id = Math.random().toString();
    this.type = order.type;
    this.quantity = order.quantity;
    this.price = order.price;
    this.userId = order.userId;
  }

  set type(orderType) {
    if (!orderType || !Order.TYPES.includes(orderType)) {
      throw new Error('Invalid Order Type!');
    }
    this._type = orderType;
  }

  get type() {
    return this._type;
  }

  set quantity(q) {
    if (typeof q !== 'number' || Number.isNaN(q)){
      throw new Error('Quantity must be a number!');
    }
    else if (q <= Order.MIN_QUANTITY) {
      throw new Error(`Min Quantity is ${Order.MIN_QUANTITY}`);
    }
    this._quantity = +q.toFixed(2);
  }

  get quantity() {
    return this._quantity;
  }

  set price(p) {
    if (typeof p !== 'number' || Number.isNaN(p)){
      throw new Error('Price must be a number!');
    }
    else if (p <= 0) {
      throw new Error('Price must be positive greater than 0');
    }
    this._price = +p.toFixed(2);
  }

  get price() {
    return this._price;
  }

  set userId(id) {
    if (!id || typeof id !== 'string'){
      throw new Error('Invalid userId');
    }
    this._userId = id;
  }

  get userId() {
    return this._userId;
  }

}

module.exports = Order;