const User = require('../../db').User
const route = require('express').Router()

const db = require('../../db').db

route.get('/', (req, res) => {
    // We want to send an array of all users
    // From our database here

    User.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrive users"
            })
        })

})
route.post('/', async(req, res) => {
    // We expect the req to have name in it
    // We will create a new user 
    try {
        db.sync({ alter: true })

        await User.create({
            name: req.body.name,
            id: req.body.id
        }).then((user) => {
            res.status(201).send(user)
        }).catch((err) => {
            res.status(501).send({
                error: "Could not add new user"
            })
        })


    } catch (e) {
        console.log(e)

    }

})

exports = module.exports = route