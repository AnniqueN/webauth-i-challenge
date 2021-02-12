const express = require('express');
const server = require('./api/server')

const port = process.env.port || 5001;
server.listen(port, ()=>console.log(`Server listening on port ${port}`))