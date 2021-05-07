const Product = require('../../db').Product
const route = require('express').Router();

const db = require('../../db').db

route.get('/', (req, res) => {
    // Get all products
    Product.findAll()
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve products"
            })
        })
})

route.post('/', async(req, res) => {
    // Validate the values
    try {
        db.sync({ alter: true })
        if (isNaN(req.body.price)) {
            return res.status(403).send({
                error: "Price is not valid number"
            })
        }
        // Add a new product
        await Product.create({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            price: parseFloat(req.body.price)
        }).then((product) => {
            res.status(201).send(product)
        }).catch((error) => {
            res.status(501).send({
                error: "Error adding product"
            })
        })

    } catch (e) {
        console.log(e)

    }

})

exports = module.exports = route