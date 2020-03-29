const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartByCartId
} = require('../repositories/cart-repository');

const mapToModel = (cart) => ({
    cartId: cart['cart_id'],
    customerId: cart['customer_id']
});

const mapToDTO = (cart) => ({
    'customer_id': cart.customerId,
    'cart_id': cart.cartId
});

const getAllCarts = () => {
    const {rows} = selectCarts();

    return rows.map(mapToModel);
};

const getCartByCartId = (cartId) => {
    const cart = selectCartByCartId(cartId);

    return mapToModel(cart);
};

const getCartsByCustomerId = (customerId) => {
    const {rows} = selectCartsByCustomerId(customerId);

    return rows.map(mapToModel);
};

const addCart = (cart) => insertCart(mapToDTO(cart));
const modifyCart = (cart) => updateCart(mapToDTO(cart));
const removeCartByCartId = (cart) => deleteCartByCartId(cart);

module.exports = {
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId,
    addCart,
    modifyCart,
    removeCartByCartId
};