const OrdersBoard = require('../lib/orders-board');

describe('Live Orders Board Module', function() {
  
  let ordersBoard;

  beforeEach(function() {
    ordersBoard = new OrdersBoard();
  });

  it('orderBoard should have zero orders initially', function() {
    expect(ordersBoard.orders.length).toBe(0);
  });

  it('should be able to register a valid order', function() {
    const order = {
      userId: 'user1',
      quantity: 3.5,
      price: 303,
      type: 'SELL'
    };
    ordersBoard.registerOrder(order);
    expect(ordersBoard.orders.length).toBe(1);
  });

  it('should be able to cancel an order', function() {
    const buyOrder = {
      userId: 'userX',
      quantity: 4,
      price: 300,
      type: 'BUY'
    };
    const newOrder = ordersBoard.registerOrder(buyOrder);
    expect(ordersBoard.orders.length).toBe(1);
    ordersBoard.cancelOrder(newOrder.id);
    expect(ordersBoard.orders.length).toBe(0);
  });

  it('should be able to get summary of live orders', function() {
    // let's create 4 sell orders and 5 buy orders
    const sellOrders = [
      { userId: 'user1', quantity: 3.5, price: 306, type: 'SELL' },
      { userId: 'user2', quantity: 1.2, price: 310, type: 'SELL' },
      { userId: 'user3', quantity: 1.5, price: 307, type: 'SELL' },
      { userId: 'user4', quantity: 2.0, price: 306, type: 'SELL' },
    ];
    const buyOrders = [
      { userId: 'user5', quantity: 2.2, price: 299, type: 'BUY' },
      { userId: 'user6', quantity: 3.2, price: 302, type: 'BUY' },
      { userId: 'user8', quantity: 4.0, price: 305, type: 'BUY' },
      { userId: 'user7', quantity: 1.5, price: 302, type: 'BUY' },
      { userId: 'user9', quantity: 4.2, price: 304, type: 'BUY' },
    ];
    const newOrders = sellOrders.concat(buyOrders);
    for (const order of newOrders) {
      ordersBoard.registerOrder(order);
    }
    expect(ordersBoard.orders.length).toBe(9);
    const summary = ordersBoard.getSummary();

    // should see a summary for buy and sell orders
    expect(summary.liveSellOrders.length).toBe(3);
    expect(summary.liveBuyOrders.length).toBe(4);

    // check that sell orders are grouped by price
    expect(summary.liveSellOrders[0].price).toBe(306);
    expect(summary.liveSellOrders[0].quantity).toBe(5.5);

    // // check that buy orders are grouped by price
    expect(summary.liveBuyOrders[2].price).toBe(302);
    expect(summary.liveBuyOrders[2].quantity).toBe(4.7);

    // // check that sell orders are listed in price ASC order
    expect(summary.liveSellOrders[0].price).toBeLessThan(summary.liveSellOrders[1].price);
    expect(summary.liveSellOrders[1].price).toBeLessThan(summary.liveSellOrders[2].price);

    // // check that buy orders are listed in price DESC order
    expect(summary.liveBuyOrders[0].price).toBeGreaterThan(summary.liveBuyOrders[1].price);
    expect(summary.liveBuyOrders[1].price).toBeGreaterThan(summary.liveBuyOrders[2].price);
    expect(summary.liveBuyOrders[2].price).toBeGreaterThan(summary.liveBuyOrders[3].price);

  });

});
