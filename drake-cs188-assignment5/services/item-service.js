const {
     selectItems,
     selectItemByItemId
 } = require('../repositories/item-repository');

 const mapModel = (item) => ({
     itemId: item['item_id'],
     name: item['name'],
     description: item['description'],
     price: item['price']
 });

 const getAllItems = () => {
     const {rows} = selectItems();

     return rows.map(mapModel);
 };

 const getItemByItemId = (itemId) => {
     const item = selectItemByItemId(itemId);

     return mapModel(item);
 };

 module.exports = {
     getAllItems,
     getItemByItemId
 };
