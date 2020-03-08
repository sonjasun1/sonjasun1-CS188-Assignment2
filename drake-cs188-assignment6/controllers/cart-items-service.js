const {
     selectCartItems,
     selectCartItemsByCartId
 } = require('../repositories/cart-items-repository');

 const mapToModel = (cartItems) => ({
     cartItemId: cartItems['cartItemId'],
     items: cartItems['items'],
 });

 const getAllCartItems = () => {
     const {rows} = selectCartItems();

     return rows.map(mapToModel);
 };

 const getCartItemsByCartId = (cartItemsId) => {
     const cartItems = selectCartItemsByCartId(cartItemsId);

     return mapToModel(cartItems);
 };

 module.exports = {
     getAllCartsItems,
     getCartItemsByCartId
 };// JavaScript Document