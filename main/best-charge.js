const { loadAllItems } = require('./items.js')
let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
function bestCharge(selectedItems) {
  const ItemsCount = calItemsCount(selectedItems)
  const cartItems = buildcartItems(ItemsCount, loadAllItems())
  console.log(cartItems)
}

function calItemsCount(selectedItems) {
  return selectedItems.map((selectedItem) => {
    let [id, count] = selectedItem.split(' x ')
    return {
      id,
      count
    }
  })
}
function buildcartItems(ItemsCount, loadAllItems) {   //在进行map操作的时候，先遍历小的数组，在遍历大的，不然会多出一些map
  return ItemsCount.map((itemcount) => {
    let { id, count } = itemcount;
    const sameid= loadAllItems.find((itemInAll) => {
      return itemcount.id === itemInAll.id;
    })
    let { name, price } =sameid;
    return { id, name, price, count }
  })
}
bestCharge(selectedItems)
module.exports = {
  calItemsCount,
  buildcartItems
}