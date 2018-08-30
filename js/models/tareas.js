var mongoose = require('mongoose');

var TareaSchema = new mongoose.Schema({
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
  departamento: {
    type: String,
    required: false,
    minlength: 6,
    trim: true
  },
  usaurio: {
    type: String,
    required: false,
    minlength: 6,
    trim: true
  },
  status: {
    type: String,
    default: "sin confirmar"
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
