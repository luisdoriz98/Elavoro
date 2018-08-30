//require('./config/config');
var departamentosdb;
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('mongoose');
var {Departamento} = require('../models/departamentos');
var app = express();
app.use(bodyParser.json());

app.post('/api/departamentos', (req, res) => {
  var departamento = new Departamento({
    nombre: req.body.nombre
  });

  departamento.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//Todos los departamentos
app.get('/api/departamentos', (req, res) => {
  Departamento.find().then((departamentos) => {
    res.send({departamentos});
  }, (e) => {
    res.status(400).send(e);
  })
});

//Departamento por id
app.get('/api/departamentos/:id', (req, res) => {
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(404).send();
    };

    Departamento.findById(id).then((departamento) => {
      if (!departamento) {
        return res.status(404).send();
      };
      res.send({departamento});
    }).catch((e) => res.status(400).send());
});

//Borrar Departamento por id
app.delete('/api/departamentos/:id', (req, res) => {
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(404).send();
    };

    Departamento.findByIdAndRemove(id).then((departamento) => {
      if (!departamento) {
        return res.status(404).send();
      };
      res.send({departamento});
    }).catch((e) => res.status(400).send());
});

//Actualizar departamento
app.patch('/api/departamentos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['nombre']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  };

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Departamento.findByIdAndUpdate(id, {$set: body}, {new: true}).then((departamento) => {
    if (!departamento){
      return res.status(404).send();
    }
    res.send({departamento});
  }).catch((e) => res.status(400).send());

});
//------

module.exports = {departamentosdb};
