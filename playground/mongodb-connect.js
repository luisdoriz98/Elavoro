//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ElavoroApp', (err, client) => {
  if (err) {
    return console.log('Unable to connectto Mongodb Server');
  }
  console.log('Connected to Mongodb server');
  const db = client.db('ElavoroApp')

  // db.collection('Departamentos').insertOne({
  //   nombre: 'Taller'
  // }, (err, result) => {
  //   if (err) {
  //   return console.log('Unable to insert to Departamentos', err);
  // }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Usuarios').insertOne({
    nombre: 'Marcelo',
    puesto: 'Administracion',
    telefono: '8111069631',
    correo: 'marcelo@elavoro.co'
  }, (err, result) => {
    if (err) {
    return console.log('Unable to insert to Usuarios', err);
  }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  client.close();
});
