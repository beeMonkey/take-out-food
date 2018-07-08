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
    promotion:String+Number
    total:Number
    }

#6 calPromotion2()
i:cartItemsWith_subtotal_total,promotion2

o: cartItemsWith_subtotal_total_promotion2:[{
        id:String,
        name:String,price:Number,
        count:Number,
        subtotal:Number,
    }], 
    promotion:String+Number(total-6)
    total:Number
    }
#7 selectedPromotion()
i:cartItemsWith_subtotal_total,cartItemsWith_subtotal_total_promotion1,cartItemsWith_subtotal_total_promotion2

o:  cartItemsWith_subtotal_total || cartItemsWith_subtotal_total_promotion1 ||cartItemsWith_subtotal_total_promotion2

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