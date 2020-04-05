const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const {when} = require('jest-when');

const {initCartControllers} = require('../../controllers/cart-controller');
const {getAllCarts, getCartByCartId, getCartsByCustomerId} = require('../../services/cart-service');

jest.mock('../../services/cart-service');

describe('cart controller', () => {
    let fakeServer,
        expectedCartId,
        expectedCustomerId,
        expectedCustomers,
        expectedCarts;

    beforeAll(() => {
        fakeServer = Hapi.server({
            host: 'localhost',
            port: 3000
        });

        expectedCartId = uuid.v4();
        expectedCart = {
            customerId: expectedCartId
        };
        expectedCarts = [expectedCartId, uuid.v4()];
        expectedCustomers = [uuid.v4()];

        getAllCarts.mockReturnValue(expectedCarts);

        when(getCartByCartId)
            .calledWith(expectedCartId)
            .mockReturnValue(expectedCart);

        when(getCartsByCustomerId)
            .calledWith(expectedCustomerId)
            .mockReturnValue(expectedCarts);

        initCartControllers(fakeServer);
    });

    it('should return all carts', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: '/carts'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return carts by customerId', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${expectedCustomerId}`
        });

        expect(getCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);
        expect(getCartsByCustomerId).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return cart by cart id', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${expectedCartId}`
        });

        expect(getCartByCartId).toHaveBeenCalledWith(expectedCartId);

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCartId);
    });

    it('should return NOT_FOUND if a cart does not exist', async () => {
        const randomCartId = uuid.v4();

        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${randomCartId}`
        });

        expect(getCartByCartId).toHaveBeenCalledWith(randomCartId);
        expect(response.statusCode).toEqual(404);
    });

    it('should return all the carts for a customer', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/customers/${expectedCustomerId}/carts`
        });

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return NOT_FOUND if a customer does not exist when looking for their carts', async () => {
        const randomCustomerId = uuid.v4();

        const response = await fakeServer.inject({
            method: 'GET',
            url: `/customers/${randomCustomerId}/carts`
        });

        expect(response.statusCode).toEqual(404);
    });
});