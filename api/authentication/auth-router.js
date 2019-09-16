const express = require('express');
const bcrypt = require('bcryptjs');

const middleware = require('../middleware');
const AuthModel = require('./auth-model');
const authRouter = express.Router();

authRouter.get('/users', middleware.validateCred, (req, res) => {
    AuthModel.find()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({message: "error getting users"})
    })
})

authRouter.get('/usernames', (req, res) => {
    AuthModel.findUsernames()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({message: "error getting users"})
    })
})

authRouter.post('/register', middleware.validateUnique, (req, res) => {
    let {username, password} = req.body;
    const hash = bcrypt.hashSync(password, 8);
    AuthModel.add({username, password: hash})
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

authRouter.post('/login', middleware.validateCred, (req, res) => {
    res.status(200).json({token:`esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ`})
})

module.exports = authRouter;