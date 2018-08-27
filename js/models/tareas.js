var mongoose = require('mongoose');

var Tarea = mongoose.model('Tarea', {
  nombre: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  descripcion: {
    type: String,
    minlength: 6,
    trim: true
  },
  departamento_id: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  usaurio_id: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  status: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  tiempoInicio: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  tiempoFin: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }

});

module.exports = {Tarea};
