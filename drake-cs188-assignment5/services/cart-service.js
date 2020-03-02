const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId
} = require('../repositories/cart-repository');

const mapModel = (cart) => ({
    cartId: cart['cart_id'],
    customerId: cart['customer_id'],
    createdDate: cart['created_date'],
    purchasedDate: cart['purchased_date']
});

const getAllCarts = () => {
    const {rows} = selectCarts();

    return rows.map(mapModel);
};

const getCartByCartId = (cartId) => {
    const cart = selectCartByCartId(cartId);

    return mapModel(cart);
};

const getCartsByCustomerId = (customerId) => {
    const {rows} = selectCartsByCustomerId(customerId);

    return rows.map(mapModel);
};

module.exports = {
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId
};
