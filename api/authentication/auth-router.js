const express = require('express');
const bcrypt = require('bcryptjs');


const middleware = require('../middleware');
const AuthModel = require('./auth-model');
const authRouter = express.Router();


authRouter.get('/users', middleware.validateSession, (req, res) => {
    AuthModel.find()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({message: "error getting users"})
    })
})

// authRouter.get('/usernames', (req, res) => {
//     AuthModel.findUsernames()
//     .then(response => {
//         res.status(200).json(response)
//     })
//     .catch(error => {
//         res.status(500).json({message: "error getting users"})
//     })
// })

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

authRouter.post('/login', (req, res) => {
    let { username, password } = req.headers;
    AuthModel.findBy({username}).first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.user=user
            res.status(200).json({message:`Welcome ${user.username}`})
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error validating credentials'})
    })
})

authRouter.get('/logout', (req, res) => {
    const name = req.session.user.username;
    if (req.session) {
        req.session.destroy(error => {
            if(error){
                res.status(500).json({message: 'error logging out'})
            } else {
                res.status(200).json({message: `Goodbye, ${name}`})
            }
        })
    }
})

module.exports = authRouter;