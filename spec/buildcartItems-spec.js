const main = require('../main/best-charge')
const {calItemsCount,buildcartItems}=require('../main/best-charge')
const { loadAllItems } = require('../main/items.js')
describe('Test for buildcartItems', function () {

    it('should return the [{id,name,price,count}]', function() {
      let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
      let itemsCount = calItemsCount(inputs);
      let cartItems=buildcartItems(itemsCount,loadAllItems())
      let expected =[{ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 },
      { id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 },
      { id: 'ITEM0022', name: '凉皮', price: 8, count: 1 } ]
      expect(cartItems).toEqual(expected)
    });
  });