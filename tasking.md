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

o:total:Number

#5 calPromotion1()
i:  cartItemsWith_subtotal_total,promotion1

o: promotin1Total:Number

#6 calPromotion2()===>取得半价菜品，计算 
                      #61 gethalfPriceItems()
                      #62 calHalfPrice()     
i:cartItemsWith_subtotal_total,promotion2

o: promotion2Total
#7 generateModel()
i:promotions[{type:string,items:[String]}], total, promotion1Total, promotion2Total

o:  {type:String,saved:Number,total:Number}

#8 generateReceipt()
i:cartItemsWith_subtotal, model

o:receipt:String











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
