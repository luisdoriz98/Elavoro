//require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./mongoose');
var {Departamento} = require('../models/departamentos');
var app = express();
app.use(bodyParser.json());

app.get('/api/departamentos', (req, res) => {
  Departamento.find().then((departamentos) => {
    res.send({departamentos});
  }, (e) => {
    res.status(400).send(e);
  })
});
