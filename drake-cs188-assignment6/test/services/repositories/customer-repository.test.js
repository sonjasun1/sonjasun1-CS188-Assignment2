const uuid = require('uuid');

 const {
     selectCustomers,
     selectCustomerByCustomerId
 } = require('../../repositories/customer-repository');

 describe('customer repository', () => {
     let firstCustomerId,
         secondCustomerId,
         expectedCustomerId,
         expectedFirstCustomer,
         expectedSecondCustomer;

     beforeEach(() => {
         firstCustomerId = '74bdf0ff-337d-4e5e-be71-a14aef67dbbe';
         secondCustomerId = '46efa02c-fd26-4324-9823-55d99c58d5b2';

         expectedFirstCustomer = {
             'customer_id': firstCustomerId,
         };
         expectedSecondCustomer = {
             'customer_id': secondCustomerId,
         };
     });

     describe('selectCustomers', () => {
         it('should return all the customers', () => {
             const actualCustomers = selectCustomers();
             const [actualFirstCustomer, actualSecondCustomer] = actualCustomers.rows;

             expect(actualFirstCustomer).toEqual(expectedFirstCustomer);
             expect(actualSecondCustomer).toEqual(expectedSecondCustomer);
         });
     });

     describe('selectCustomerByCustomerId', () => {
         it('should return a specific customer by customerId', () => {
             const actualFirstCustomer = selectCustomerByCustomerId(firstCustomerId);

             expect(actualFirstCustomer).toEqual({
                 'customer_id': expectedCustomerId
             });

             const actualSecondCustomer = selectCustomerByCustomerId(secondCustomerId);

             expect(actualSecondCustomer).toEqual([
                 'customer_id': expectedCustomerId
             ]);
         });
     });
 });