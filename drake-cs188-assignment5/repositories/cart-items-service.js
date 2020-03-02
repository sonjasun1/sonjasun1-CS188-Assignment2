const {
     selectCartItems,
     selectCartItemsByCartId,
     selectCartItemByCartItemId
 } = require('../repositories/cart-items-repository');

 const mapModel = (cartItems) => ({
     cartItemId: cartItems['cart_item_id'],
     cartId: cartItems['cart_id'],
     itemId: cartItems['item_id'],
     quantity: cartItems['quantity']
 });

 const getAllCartItems = () => {
     const {rows} = selectCartItems();

     return rows.map(mapModel);
 };

 const getCartItemByCartItemId = (cartItemId) => {
     const cart = selectCartItemByCartItemId(cartItemId);

     return mapModel(cart);
 };

 const getCartsByCustomerId = (cartId) => {
     const {rows} = selectCartItemsByCartId(cartId);

     return rows.map(mapModel);
 };

 module.exports = {
     getAllCartItems,
     getCartItemByCartItemId,
     getCartsByCustomerIds
 };
