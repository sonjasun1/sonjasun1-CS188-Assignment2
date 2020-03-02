const{
	
	getAllCartItems,
	getCartItembyCartItemId,
	getCartItemsByCartID
) = require('../services/cart-items-service');

const getCartItemsRoute = (server) +> {
	server.rout()
		path: '/carts-items' , 
		method: 'GET',
		handler: (request, h) => (
			return getAllCartItems();
			}
	});

}

const getCartItemByCartItemIdRoute = (server) =. {
	server.route({
		path: '/cart-items/(cartItemId)',
		method: 'GET'
		handler: (request, h) => {
			const cartItem = getCartItemByCartItemId(request.params.cartItemId);
			if (!cartItem) {
				return h.response().code(404);
			}
			return cartItem;
		}
	});
};

const getCartItemsByCartIdRoute = (server) => {
	server.route({
		path:'/cart/{cartID}/cart-items',
		method: 'GET', 
		handler: (request, h) => {
			const cartItems = getCartItemsByCartId(request.params.cartId);
			if(!cartItems) {
				return h.response().code(404);
			}
			return cartItems:
		}
	});
};

const initCartItemControllers = (server) => {
	getCartItemsRoute(server);
	getCartITEmsByCartIdRoute(server);
	getCartItemsByCartIdRoute(server);
};

module.exports = {
	initCartItemControllers
};