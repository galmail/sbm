const Order = require('../lib/order');

describe('Order Module', function() {

  it('should be able to create a valid order', function() {
    const order = {
      userId: 'user1',
      quantity: 3.578,
      price: 303,
      type: 'SELL'
    };
    const newOrder = new Order(order);
    expect(newOrder).toBeTruthy();
    expect(newOrder.price).toBe(303);
    expect(newOrder.quantity).toBe(3.58);
  });

  it('should throw error for invalid quantity', function() {
    const invalidOrder1 = {
      userId: 'user1',
      quantity: 'abc',
      price: 303,
      type: 'SELL'
    };
    const invalidOrder2 = {
      userId: 'user1',
      quantity: 0,
      price: 303,
      type: 'SELL'
    };
    expect(() => new Order(invalidOrder1)).toThrow(new Error('Quantity must be a number!'));
    expect(() => new Order(invalidOrder2)).toThrow(new Error('Min Quantity is 1'));
  });

  it('should throw error for invalid price', function() {
    const invalidOrder = {
      userId: 'user1',
      quantity: 2,
      price: -10,
      type: 'SELL'
    };
    expect(() => new Order(invalidOrder)).toThrow(new Error('Price must be positive greater than 0'));
  });

  it('should throw error for invalid type', function() {
    const invalidOrder = {
      userId: 'user1',
      quantity: 2,
      price: 10,
      type: 'RENT'
    };
    expect(() => new Order(invalidOrder)).toThrow(new Error('Invalid Order Type!'));
  });

  it('should throw error for missing userId', function() {
    const invalidOrder = {
      quantity: 2,
      price: 10,
      type: 'SELL'
    };
    expect(() => new Order(invalidOrder)).toThrow(new Error('Invalid userId'));
  });

});
