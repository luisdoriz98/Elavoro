var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


var Usuario = mongoose.model('Usuario', {
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  puesto: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  token: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

module.exports = {Usuario};
