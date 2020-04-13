const frisby = require('frisby');
const uuid = require('uuid');
const Chance = require('chance');

const chance = new Chance();

describe('Customers Cart', () => {
    let firstItem,
        secondItem,
        firstCartItem,
        secondCartItem,
        cart,
        customer;

    beforeAll(async () => {
        customer = {
            customerId: uuid.v4(),
            email: chance.email(),
            firstName: chance.first(),
            lastName: chance.last()
        };

        cart = {
            cartId: uuid.v4(),
            customerId: customer.customerId
        };

        firstItem = {
            description: 'Drake Bulldogs Sweatpants',
            itemId: uuid.v4(),
            price: 25
        };

        secondItem = {
            description: 'Drake Bulldogs Sweatshirt',
            itemId: uuid.v4(),
            price: 25
        };

        firstCartItem = {
            cartId: cart.cartId,
            cartItemId: uuid.v4(),
            itemId: firstItem.itemId,
            quantity: chance.d6()
        };

        secondCartItem = {
            cartId: cart.cartId,
            cartItemId: uuid.v4(),
            itemId: secondItem.itemId,
            quantity: chance.d6()
        };

        await frisby.post('http://localhost:3000/customers', customer);
        await frisby.post('http://localhost:3000/carts', cart);
        await frisby.post('http://localhost:3000/items', firstItem);
        await frisby.post('http://localhost:3000/items', secondItem);
        await frisby.post('http://localhost:3000/cart-items', firstCartItem);
        await frisby.post('http://localhost:3000/cart-items', secondCartItem);
    });

    afterAll(async () => {
        await frisby.del(`http://localhost:3000/cart-items/${firstCartItem.cartItemId}`);
        await frisby.del(`http://localhost:3000/cart-items/${secondCartItem.cartItemId}`);
        await frisby.del(`http://localhost:3000/items/${firstItem.itemId}`);
        await frisby.del(`http://localhost:3000/items/${secondItem.itemId}`);
        await frisby.del(`http://localhost:3000/carts/${cart.cartId}`);
        await frisby.del(`http://localhost:3000/customers/${customer.customerId}`);
    });

    test('get all the customers cart information to display', async () => { // eslint-disable-line require-await
        const expectedCartInformation = {
            customer: {
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName
            },
            itemsInTheCart: [
                {
                    description: firstItem.description,
                    price: firstItem.price,
                    quantity: firstCartItem.quantity
                },
                {
                    description: secondItem.description,
                    price: secondItem.price,
                    quantity: secondCartItem.quantity
                }
            ]
        };

        const customerResponse = await frisby.get('http://localhost:3000/customers/${customer.customerId}');
        const actualCustomer = customerResponse.json;
        const customersCartResponse = await frisby.get('http://locaclhost:3000/customers/${customer.customerId}/carts}');
        const actualFirstCartItem = customersCartResponse.json[0];
        const cartItemsResponse = await frisby.get('http://localhost:3000/carts/${actualCart.cartId}/cart-items}');

        const actualFirstCartItem = customersCartResponse.json[0];
        const actualFirstCartItem = cartItemsResponse.json[1];
        const actualSecondCartItem = cartItemResponse.json[2];

        const firstItemResponse = await frisby.get(`http://localhost:3000/items/${actualFirstCartItem.itemId}`);
        const secondItemResponse = await frisby.get(`http://localhost:3000/items/${actualSecondCartItem.itemId}`);
        const actualFirstCartItem = firstItemsResponse.json;
        const actualSecondCartItem = secondItemResponse.json;

        const actualCartInformation = {
            customer: {
                email: actualCustomer.email,
                firstName: actualCustomer.firstName,
                lastName: actualCustomer.lastName
            },
            itemsInTheCart: [
                {
                    description: actualFirstItem.description,
                    price: actualFirstItem.price,
                    quantity: actualFirstCartItem.quantity
                },
                {
                    description: actualSecondItem.description,
                    price: actualSecondItem.price,
                    quantity: actualSecondCartItem.quantity
                }
            ]
        };

        console.log('actualCartInformation', actualCartInformation);

        expect(actualCartInformation).toEqual(expectedCartInformation);
    });
});