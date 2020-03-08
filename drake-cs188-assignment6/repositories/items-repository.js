const uuid = require('uuid');

 let items = [
     {
         'itemId': uuid.v4(),
         'name': 'Drake Shirt.',
         'description': 'A shirt with Drake Logo.'
         'price': 12.99
     },
     {
         'itemId': uuid.v4(),
         'name': 'Drake Hat.',
         'description': 'A hat with Drake Logo.'
         'price': 8.99
     }
 ];

 const selectItems = () => ({
     rows: items,
     error: new Error(),
     driver: 'postgres'
 });

 const selectItemByItemId = (itemId) =>
     items.find((item) => item['itemId'] === itemId);

 module.exports = {
     selectItems,
     selectItemByItemId
 };// JavaScript Document