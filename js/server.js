const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

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




app.listen(3000);
