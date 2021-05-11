const { Customer, ValidateCustomer } = require('../models/customer');
const express = require('express');

const router = express.Router();










router.get('/', (req, res) => {
    Customer.find()
        .sort({ name: 1 })
        .then(customers => res.send(customers))
        .catch(err => res.send(err));
});


router.get('/:id', (req, res, next) => {
    Customer.findById(req.params.id)
        .then(customers => res.send(customers))
        .catch(() => {
            req.myer = 'Not Found To Show'
            next();
        });
});



router.post('/', (req, res) => {
    const result = ValidateCustomer(req.body);
    if (result.error) res.status(400).send(result.error.details[0].message);
    const customer = new Customer(req.body);
    customer.save()
        .then(customer => res.status(201).send(customer))
        .catch(err => res.status(500).send(err))
});



router.put('/:id', (req, res, next) => {
    const result = ValidateCustomer(req.body);
    if (result.error) res.status(400).send(result.error.details[0].message);
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((genre) => res.status(200).send(genre))
        .catch(() => {
            req.myer = 'Not Found To Update'
            next();
        });

});


router.delete('/:id', (req, res, next) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(customer => res.status(200).send(customer))
        .catch(() => {
            req.myer = 'Not Found To Delete';
            next();
        });

});



module.exports = router;