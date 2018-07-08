1.take out application,order
2.Item Count Promotion=>Charge
3.Promotions =>most saved
4.Item,Count =>bestCharge()=> Summary

#最开始的思路
#1 calItemsCount()
i: selectedItems[String]

o: itemsCounts[{    
    barcode:String,
    count:Number
}]

#2 buildcartItems()
i:itemsCounts,items

o:cartItems[{
    id:String,
    name:String,
    price:Number,
    count:Number
}]

#3 calsubtotal()
i:cartItems

o:cartItemsWith_subtotal[{
    id:String,
    name:String,
    price:Number,
    count:Number,
    subtotal:Number
}]

#4 calTotal()
i:cartItemsWith_subtotal

o:cartItemsWith_subtotal_total{
    cartItems:[{
        id:String,
        name:String,price:Number,
        count:Number,
        subtotal:Number,
    }], 
    total:Number
    }

#5 calPromotion1()
i:cartItemsWith_subtotal_total,promotion1

o: cartItemsWith_subtotal_total_promotion1:[{
        id:String,
        name:String,price:Number,
        count:Number,
        subtotal:Number,
    }], 
    promotion1:String+Number(total-6)
    total:Number
    }

#6 calPromotion2()===>取得半价菜品，计算 
                      #61gethalfPriceItems()
                      #62calHalfPrice     
i:cartItemsWith_subtotal_total,promotion2

o: cartItemsWith_subtotal_total_promotion2:[{
        id:String,
        name:String,price:Number,
        count:Number,
        subtotal:Number,
    }], 
    promotion2:String+Number
    total:Number
    }
#7 selectedPromotion()
i:cartItemsWith_subtotal_total,cartItemsWith_subtotal_total_promotion1,cartItemsWith_subtotal_total_promotion2

o:  cartItemsWith_subtotal_total || cartItemsWith_subtotal_total_promotion1 ||cartItemsWith_subtotal_total_promotion2

#8 generateReceipt()
i:cartItemsWith_subtotal,loadPromotion(),total,promotion1Total,promotion2Total

o:
#N  view=>model
i:

o:
model:{
    receiptItem[{name:String,count:Number,subtotal:Number}],
    promotin:String+Number,
    total:Number
}

#N+1  model =>view










#N-1 calPromotion()
i:cartItems,promotions[{type:String},{type:String,items:[String]}]

o：type1 || type2 || none
[{
    id:String,
    name:String,
    price:Number,
    count:Number,
    subtotal:Number,
    total:total,
    promotion:String
}]


不在优惠菜品，不满三十，直接计算

在优惠商品，不满三十，优惠计算P2

不在优惠商品，满三十,   P1(-6)

在优惠商品，满三十    p1 对比 p2
