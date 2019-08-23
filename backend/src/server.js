const express = require('express');

const cors = require('cors');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(3333);

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://xmp:today@xmp-blac3.mongodb.net/xmp?retryWrites=true&w=majority', {
  "useNewUrlParser": true
});