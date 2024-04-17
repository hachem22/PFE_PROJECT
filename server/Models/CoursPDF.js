const mongoose = require('mongoose');

const coursPDFSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    niveau: {
        type: String,
        required: true,
    },
    matiere: {
        type: String,
        required: true,
    },
    pdfFile: {
        type: Buffer,
        required: true,
    }
}, { collection: 'coursPDF' });

const CoursPDFModel = mongoose.model('CoursPDF', coursPDFSchema);

module.exports = CoursPDFModel;
