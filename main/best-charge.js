function bestCharge(selectedItems) {

}

function  calItemsCount(selectedItems){
    return selectedItems.map((selectedItem)=>{
        let [barcode,count] =  selectedItem.split('x')
        return {
          barcode,
          count
        }
  })
} 

module.exports={
  calItemsCount
}