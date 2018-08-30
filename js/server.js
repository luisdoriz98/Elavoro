//require('./config/config');
var request = require('request');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
//mongodb
var {mongoose} = require('./db/mongoose');
var {Departamento} = require('./models/departamentos');
var {Usuario} = require('./models/usuarios');
var {Tarea} = require('./models/tareas');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//departamentos
//Agregar Departamento
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

//Usuarios
//Agregar Usuario

app.post('/api/usuarios', (req, res) => {
  var usuario = new Usuario({
    nombre: req.body.nombre,
    puesto: req.body.puesto,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password
  });

  usuario.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//Todos los usuarios
app.get('/api/usuarios', (req, res) => {
  Usuario.find().then((usuarios) => {
    res.send({usuarios});
  }, (e) => {
    res.status(400).send(e);
  })
});

//Usuario por id
app.get('/api/usuarios/:id', (req, res) => {
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(404).send();
    };

    Usuario.findById(id).then((usuario) => {
      if (!usuario) {
        return res.status(404).send();
      };
      res.send({usuario});
    }).catch((e) => res.status(400).send());
});

//Borrar Usuario por id
app.delete('/api/usuarios/:id', (req, res) => {
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(404).send();
    };

    Usuario.findByIdAndRemove(id).then((usuario) => {
      if (!usuario) {
        return res.status(404).send();
      };
      res.send({usuario});
    }).catch((e) => res.status(400).send());
});

//Actualizar usuario
app.patch('/api/usuarios/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['nombre', 'puesto', 'telefono', 'email']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  };

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Usuario.findByIdAndUpdate(id, {$set: body}, {new: true}).then((usuario) => {
    if (!usuario){
      return res.status(404).send();
    }
    res.send({usuario});
  }).catch((e) => res.status(400).send());

});
//------

//Tareas
//Agregar Tarea
app.post('/api/tareas', (req, res) => {
  var tarea = new Tarea(req.body);
  console.log(req.body);
  tarea.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


//Todos los tareas
app.get('/api/tareas', (req, res) => {
  Tarea.find().then((tareas) => {
    res.send({tareas});
  }, (e) => {
    res.status(400).send(e);
  })
});

//Tarea por id
app.get('/api/tareas/:id', (req, res) => {
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(404).send();
    };

    Tarea.findById(id).then((tarea) => {
      if (!tarea) {
        return res.status(404).send();
      };
      res.send({tarea});
    }).catch((e) => res.status(400).send());
});

//Borrar Tarea por id
app.delete('/api/tareas/:id', (req, res) => {
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(404).send();
    };

    Tarea.findByIdAndRemove(id).then((tarea) => {
      if (!tarea) {
        return res.status(404).send();
      };
      res.send({tarea});
    }).catch((e) => res.status(400).send());
});

//Actualizar tarea
app.patch('/api/tareas/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['nombre', 'descripcion', 'departamento_id', 'usaurio_id', 'status', 'tiempoInicio', 'tiempoFin']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  };

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Tarea.findByIdAndUpdate(id, {$set: body}, {new: true}).then((tarea) => {
    if (!tarea){
      return res.status(404).send();
    }
    res.send({tarea});
  }).catch((e) => res.status(400).send());

});
//------

//Handlebars
hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');
app.use(express.static('views/img'));
app.use(express.static('views/css'));

app.get('/', (req, res) => {
  res.render('signin.hbs', {
    css: 'signin',
    pageTitle: 'Sign in',
    activeh: 'active'
  });

});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    css: 'home',
    pageTitle: 'Home',
    activeh: 'active'
  });

});



app.get('/produccion', (req, res) => {
res.render('produccion.hbs', {
  css: 'home',
  pageTitle: 'Produccion',
  activep: 'active'
});
});

app.get('/reportes', (req, res) => {
  res.render('reportes.hbs', {
    css: 'home',
    pageTitle: 'Reportes',
    activer: 'active'
  });
});

app.get('/ajustes', (req, res) => {
  res.render('ajustes.hbs', {
    css: 'home',
    pageTitle: 'Ajustes',
    activeu: 'active'
  });
});

app.listen(port);
