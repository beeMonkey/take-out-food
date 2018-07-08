const { loadAllItems } = require('./items.js')
let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
function bestCharge(selectedItems) {
  const ItemsCount = calItemsCount(selectedItems)
  const cartItems = buildcartItems(ItemsCount, loadAllItems())
  const cartItemsWith_subtotal = calsubtotal(cartItems)
  const cartItemsWith_subtotal_total = caltotal(cartItemsWith_subtotal)
  //console.log(cartItemsWith_subtotal_total)
}

function calItemsCount(selectedItems) {
  return selectedItems.map((selectedItem) => {
    let [id, count] = selectedItem.split(' x ')
    return {
      id,
      count: parseInt(count)
    }
  })
}
function buildcartItems(ItemsCount, loadAllItems) {   //在进行map操作的时候，先遍历小的数组，在遍历大的，不然会多出一些map
  return ItemsCount.map((itemcount) => {
    let { id, count } = itemcount;
    const sameid = loadAllItems.find((itemInAll) => {
      return itemcount.id === itemInAll.id;
    })
    let { name, price } = sameid;
    return { id, name, price, count }
  })
}
function calsubtotal(cartItems) {
  return cartItems.map((cartItem) => {
    const subtotal = cartItem.price * cartItem.count
    cartItem.subtotal = subtotal
    return cartItem
  })
}
function caltotal(cartItemsWith_subtotal) {
  let total = 0;
  cartItemsWith_subtotal.forEach((cartItem_subtotal) => {
    total += cartItem_subtotal.subtotal;
  })
  return {
    cartItemsWith_subtotal,
    total
  }
}
bestCharge(selectedItems)
module.exports = {
  calItemsCount,
  buildcartItems,
  calsubtotal,
  caltotal
}