const mongoose = require('mongoose');
const Joi = require('joi');



const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    }
});


const Customer = mongoose.model('Customer', customerSchema);



function ValidateCustomer(customer) {
    const schema = {
        name: Joi.string().required(),
        isGold: Joi.boolean().default(false),
        phone: Joi.string().required()
    };

    return Joi.validate(customer, schema);
}


module.exports.Customer = Customer;
module.exports.ValidateCustomer = ValidateCustomer;