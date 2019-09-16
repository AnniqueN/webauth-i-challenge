const bcrypt = require('bcryptjs');
const AuthModel = require('../api/authentication/auth-model');

module.exports = {
    validateCred,
    validateUnique
}

function validateCred(req, res, next){
    let { username, password } = req.headers;
    AuthModel.findBy({username}).first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            next()
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error validating credentials'})
    })
}

function validateNewUser(req, res, next){

}

function validateUnique(req, res, next){
    const {username} = req.body;
    AuthModel.findBy({username}).first()
    .then(response => {
        if(response){
            res.status(400).json({message: 'That username is already taken'})
        }
        else {
            next();
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error checking username'})
    })
}
