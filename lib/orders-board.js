/**
 * orders-board.js
 * CS - Live Order Board Module
 */

const Order = require('./order');

class OrdersBoard {

  constructor() {
    this.orders = [];
  }

  registerOrder(orderObj) {
    const order = new Order(orderObj);
    if (!order) {
      throw new Error('Invalid Order!');
    }
    this.orders.push(order);
    return order;
  }

  cancelOrder(orderId) {
    const orderIdx = this.orders.findIndex(order => order.id === orderId);
    if (orderIdx === -1) {
      throw new Error('Invalid OrderId');
    }
    this.orders.splice(orderIdx, 1);
    return orderId;
  }

  groupLiveOrdersByPrice(orders) {
    let liveOrders = [];
    orders.forEach(order => {
      const liveOrder = liveOrders.find(liveOrder => liveOrder.price === order.price);
      if (!liveOrder) {
        liveOrders.push({
          price: order.price,
          quantity: order.quantity
        });
      }
      else {
        liveOrder.quantity += order.quantity;
      }
    });
    return liveOrders;
  }

  getSummary() {
    // filter orders by type
    const sellOrders = this.orders.filter(order => order.type === 'SELL');
    const buyOrders = this.orders.filter(order => order.type === 'BUY');

    // group all orders by price and sort them
    const liveSellOrders = this.groupLiveOrdersByPrice(sellOrders)
      .sort((orderA, orderB) => orderA.price > orderB.price);
    const liveBuyOrders = this.groupLiveOrdersByPrice(buyOrders)
        .sort((orderA, orderB) => orderA.price < orderB.price);
    return {
      liveSellOrders,
      liveBuyOrders
    };
  }

}

module.exports = OrdersBoard;