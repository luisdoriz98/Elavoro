var mongoose = require('mongoose');

var Departamento = mongoose.model('Departamento', {
  nombre: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  }

});

module.exports = {Departamento};
