const mongoose = require('mongoose');
const progressionSchema = new mongoose.Schema({
 eleveId: {
    type: String,
    required: true
},
matricule: {
  type: String,
  required: true
},
progressionmath: {
    type: Number,
    default: 0
  },
  progressionphysique: {
    type: Number,
    default: 0
  },
  progressiontechnique: {
    type: Number,
    default: 0
  },
  progressioninformatique: {
    type: Number,
    default: 0
  },
  progressionfrancais: {
    type: Number,
    default: 0
  },
  progressionanglais: {
    type: Number,
    default: 0
  },
  progressionarabe: {
    type: Number,
    default: 0
  }
});


const Progression = mongoose.model('Progression', progressionSchema);

module.exports = Progression;