const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
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
  unique: true
},
datenai: {
  type: Date,
  required: true,
},
gouvernonat: {
  type: String,
  required: true,
 
},
classe: {
  type: String,
  required: true,
},

  email:  {
    type: String,
    required: true,
    minlength:5,
    maxlength:50,
    unique: true,
   
},
  password: {
    type: String,
    require:true,
  
    minlength:8,
  

},
}, { collection: 'eleve' }); // Spécifie le nom de la collection

const EleveModel = mongoose.model('eleve', eleveSchema);

module.exports = EleveModel;
