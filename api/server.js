const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('../data/db-config');

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true
  }

const sessionConfig = {
    name: 'sessionCookie', // would name the cookie sid by default
    secret: process.env.session_secret || 'secret',
    cookie: {
      maxAge: (1000 * 60 * 60), // in milliseconds
      secure: false, // true means only send cookie over https. Make true for 
      //production. false is ok for development.
      httpOnly: true, // true means JS has no access to the cookie
    },
    reSave: false,
    saveUninitialized: true, // GDPR complience
    store: new KnexSessionStore({
      knex: db,
      tablename: 'knexsessions',
      sidfieldname: 'sessionid',
      createtable: true,
      clearInterval: 1000*60*30, //clean out expired session data, in milliseconds
    }) // don't forget the new keyword!
  }

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig));
server.use(session(sessionConfig))

const authRouter = require('./authentication/auth-router')



server.get('/', (req, res) => {
    res.send('up')
})

server.use('/api/', authRouter)

module.exports = server;