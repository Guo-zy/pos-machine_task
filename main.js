//打印收据主入口
function printReceipt(barcodes) {
//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`)
   var cartItems = countEachItem(barcodes);
   var cartItemCompleteInfo = completeItemInfo(cartItems);
   var cartItemListAllInfo = calEachItemPrice(cartItemCompleteInfo);
   var totalPrice = calTotalPrice(cartItemListAllInfo);
   var itemsReceipt =  formatItemsInfo(cartItemListAllInfo , totalPrice);
   console.log(itemsReceipt);
}
//统计每个Item有多少个
function countEachItem(barcodes){
    var cartItems = [];
    for (const barcode of barcodes) {
        var item  = {};
        item.itemId = barcode;
        item.count = 1;
        for (let index = 0; index < cartItems.length; index ++) {
            if(cartItems[index].itemId == item.itemId){
                item.count = cartItems[index].count + 1;
                cartItems.splice(index , 1);
            }
        }
        cartItems.push(item);
    }
  return cartItems;
}

//完善CartItem对象的信息
function completeItemInfo(cartItems){
        const allItemInfo = getItemsDataList(); // 获取所有数据
        for (const cartItem of cartItems) {
            for (const itemInfo of allItemInfo) {
                if(cartItem.itemId == itemInfo.barcode){
                    cartItem.name = itemInfo.name;
                    cartItem.price = itemInfo.price;
                }
            }
        }
        return cartItems;
}

//统计每个Item的总价
function calEachItemPrice(cartItemCompleteInfo){
    for (const cartInfo of cartItemCompleteInfo) {
        let Subtotal = cartInfo.count * cartInfo.price;
        cartInfo.Subtotal = Subtotal;
    }

    return cartItemCompleteInfo;
}

//计算商品总价
function calTotalPrice(cartItemListAllInfo){
    let totalPrice = 0;
    for (const cartItemInfo of cartItemListAllInfo) {
        totalPrice += cartItemInfo.Subtotal;
    }
     return totalPrice;
}

//格式化数组对象中的信息
function formatItemsInfo(cartItemListAllInfo , totalPrice){
    let itemsReceipt = "\n***<store earning no money>Receipt ***\n";
    for (const cartItemInfo of cartItemListAllInfo) {
        itemsReceipt  += "Name: " + cartItemInfo.name + ", Quantity: " + cartItemInfo.count 
        + ", Unit price: " + cartItemInfo.price + " (yuan), Subtotal: " + cartItemInfo.Subtotal  + " (yuan)\n";
    }
    itemsReceipt += "----------------------\n";
    itemsReceipt += "Total: " + totalPrice + " (yuan)\n";
    itemsReceipt += "**********************";
    return itemsReceipt;
}

//所有Item信息
function getItemsDataList(){
    var itesDataList = [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ]
     return itesDataList;
}


module.exports = {
    printReceipt
};