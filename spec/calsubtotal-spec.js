const main = require('../main/best-charge')
const {calItemsCount,buildcartItems,calsubtotal}=require('../main/best-charge')
const { loadAllItems } = require('../main/items.js')
describe('Test for calsubtotal', function () {

    it('should return the [{id,name,price,count}]', function() {
      let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
      const itemsCount = calItemsCount(inputs);
      const cartItems=buildcartItems(itemsCount,loadAllItems())
      const cartItemsWith_subtotal = calsubtotal(cartItems)
      let expected =[ { id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1, subtotal: 18 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2, subtotal: 12 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1, subtotal: 8 } ]
      expect(cartItemsWith_subtotal).toEqual(expected)
    });
  });