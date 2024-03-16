const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  nom:{
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:20,
  },
  prenom: {
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:20,
  },
  numero: {
    type: Number,
    required: true,
    minlength:8,
    maxlength:8,
  },
  matriculeeleve: {
    type: Number,
    required: true,
    minlength:2,
    maxlength:10
  },
  nomeleve:{
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:20,
},
  prenomeleve:{
    type: String,
    required: true,
    trim:true,
    minlength:2,
    maxlength:20,
},

  email:  {
    type: String,
    required: true,
    trim:true,
    minlength:5,
    maxlength:50,
    unique: true,
   
},
  password: {
    type: String,
    require:true,
    trim:true,
    minlength:8,
  

},
}, { collection: 'parent' }); // Spécifie le nom de la collection

const ParentModel = mongoose.model('parent', parentSchema);

module.exports = ParentModel;
