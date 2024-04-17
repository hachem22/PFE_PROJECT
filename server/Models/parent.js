const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const parentSchema = new Schema({
  nom:{
    type: String,
    required: true,
    minlength:2,
    maxlength:20,
  },
  prenom: {
    type: String,
    required: true,
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
    minlength:2,
    maxlength:20,
},
  prenomeleve:{
    type: String,
    required: true,
    minlength:2,
    maxlength:20,
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

}, { collection: 'parent' }); // Spécifie le nom de la collection
parentSchema.pre('save', async function (next) {
  const parent = this;
  if (!parent.isModified('password')) return next();
  try {
      const hashedPassword = await bcrypt.hash(parent.password, 10);
      parent.password = hashedPassword;
      next();
  } catch (error) {
      return next(error);
  }
});
const ParentModel = mongoose.model('parent', parentSchema);

module.exports = ParentModel;
