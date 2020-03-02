const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../repositories/customer-repository');

const mapModel = (customer) => ({
    customerId: customer['customer_id'],
    firstName: customer['first_name'],
    lastName: customer['last_name'],
    email: customer['email']
});

const getAllCustomers = () => {
    const {rows} = selectCustomers();

    return rows.map(mapModel);
};

const getCustomerByCustomerId = (customerId) => {
    const customer = selectCustomerByCustomerId(customerId);

    return mapModel(customer);
};

module.exports = {
    getAllCustomers,
    getCustomerByCustomerId
};
