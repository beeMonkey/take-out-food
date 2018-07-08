const { loadAllItems } = require('./items.js')
const selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//const selectedItems = ["ITEM0013 x 4", "ITEM0022 x 1"]
//const selectedItems = ["ITEM0013 x 4"];
const { loadPromotions } = require('./promotions.js')
const promotions = loadPromotions()
const promotionItemId = loadPromotions()[1].items;
function bestCharge(selectedItems) {
  const ItemsCount = calItemsCount(selectedItems)
  const cartItems = buildcartItems(ItemsCount, loadAllItems())
  const cartItemsWith_subtotal = calsubtotal(cartItems)
  const total = caltotal(cartItemsWith_subtotal)
  const promotion1Total = calpromotion1Total(total)
  //const item2 = gethalfPriceItems(cartItemsWith_subtotal, promotionItemId)
  const promotion2Total = calpromotion2Total(cartItemsWith_subtotal, promotionItemId, total)
  const model = generateModel(promotions, total, promotion1Total, promotion2Total)
  const receipt = generateReceipt(cartItemsWith_subtotal, model)
  console.log(receipt)
  return receipt
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
  // return {
  //   cartItemsWith_subtotal,
  //   total
  // }
  return total
}
function calpromotion1Total(total) {
  return (total >= 30) ? (total - 6) : total
}
function calpromotion2Total(cartItemsWith_subtotal, promotionItemId, total) {
  const halfPriceItems = gethalfPriceItems(cartItemsWith_subtotal, promotionItemId)
  const halfPriceSaved = calhalfPriceSaved(halfPriceItems)
  return total - halfPriceSaved
}
function gethalfPriceItems(cartItemsWith_subtotal, promotionItemId) {
  return promotionItemId.map((itemId) => {
    const promotion2Item = cartItemsWith_subtotal.find((cartItem) => {
      return itemId === cartItem.id
    })
    return promotion2Item;
  })
}

function calhalfPriceSaved(halfPriceItems) {
  let halfPriceSaved = 0
  halfPriceItems.forEach((halfPriceItem) => {
    if (halfPriceItem !== undefined) {
      halfPriceSaved += halfPriceItem.price / 2 * halfPriceItem.count
    }
  })
  return halfPriceSaved
}
// function chooseWhichPromotion(cartItemsWith_subtotal,promotionItemId,total){
//   let halfPriceItems=gethalfPriceItems(cartItemsWith_subtotal,promotionItemId)
//   for (let halfPriceItem of halfPriceItems){
//     if(halfPriceItem!==undefined){
//       var promotion2Total=calpromotion2Total(cartItemsWith_subtotal,promotionItemId)
//       //console.log(promotion2Total)
//       break;
//     }
//   }
//   if(total>=30){
//     var promotion1Total=calpromotion1Total(total)
//   }
//   return (promotion2Total<=promotion1Total)?promotion2Total:promotion1Total
// }
// function lastTotal(total, promotion1Total, promotion2Total) {
//   if ((total - promotion2Total) > 6) {
//     return promotion2Total
//   } else if (total > 30) {
//     return promotion1Total
//   } else {
//     return total
//   }
// }
function generateModel(promotions, total, promotion1Total, promotion2Total) {
  if ((total - promotion2Total) > 6) {
    return {
      type: promotions[1].type,
      saved: total - promotion2Total,
      total: promotion2Total,
      whichitem:'(黄焖鸡，凉皮)'
    }
  } else if (total > 30) {
    return {
      type: promotions[0].type,
      saved: total - promotion1Total,
      total: promotion1Total,
      whichitem:''
    }
  } else {
    return {
      type: '',
      saved: '',
      total
    }
  }
}

function generateReceipt(cartItemsWith_subtotal, model) {
  //console.log(cartItemsWith_subtotal)
  if(model.type===''){
    model.whichitem=''
  }
  let items =`============= 订餐明细 =============`
   let show=`\n-----------------------------------
使用优惠:
${model.type}${model.whichitem}，省${model.saved}元`

if(model.type==='')show='';

  for (let item of cartItemsWith_subtotal) {
     items+='\n'
     items+= `${item.name} x ${item.count} = ${item.subtotal}元`
  }
  items=items+show+`
-----------------------------------
总计：${model.total}元
===================================`
  return items
}
bestCharge(selectedItems)

module.exports = {
  calItemsCount,
  buildcartItems,
  calsubtotal,
  caltotal,
  bestCharge
}