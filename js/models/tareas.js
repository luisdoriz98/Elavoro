var mongoose = require('mongoose');

var TareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  descripcion: {
    type: String,
    minlength: 1,
    trim: true
  },
  departamento: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  usuario: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  status: {
    type: String,
    default: "Sin Confirmar"
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

var Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = {Tarea};
