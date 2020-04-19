const uuid = require('uuid');

 const {
     getAllCustomers,
     getCustomerByCustomerId
 } = require('../../services/customer-service');

 const {
     selectCustomers,
     selectCustomerByCustomerId
 } = require('../../repositories/customer-repository');

 jest.mock('../../repositories/customer-repository');

 describe('getAllCustomers', () => {
     let expectedFirstCustomer,
         expectedFirstCustomerId;

     beforeEach(() => {
         expectedFirstCustomerId = uuid.v4();

         expectedFirstCustomer = {
             customerId: expectedFirstCustomerId,
         };

         selectCustomers.mockReturnValue({
             rows: [{
                 'customer_id': expectedFirstCustomerId
             }]
         });

         selectCustomerByCustomerId.mockReturnValue({
             rows: [{
                 'customer_id': expectedFirstCustomerId
             }]
         });
     });

     it('should get all the customers', () => {
         const actualCustomers = getAllCustomers();

         expect(selectCustomers).toHaveBeenCalledTimes(1);

         expect(actualCustomers).toEqual([
             expectedFirstCustomer
         ]);
     });

     it('should get a customer by a specific customerId', () => {
         const actualCustomers = getCustomerByCustomerId(expectedFirstCustomerId);

         expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
         expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedFirstCustomerId);

         expect(actualCustomers).toEqual([
			 expectedFirstCustomer
			]);
     });
 });