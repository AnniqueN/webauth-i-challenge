const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require('./authentication/auth-router')

server.get('/', (req, res) => {
    res.send('up')
})

server.use('/api/', authRouter)

module.exports = server;