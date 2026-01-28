const mongoose = require('mongoose');

const BacklogSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: String,
    tecnologia: String,
    estado: String,
    fechaOriginal: {
        type: Date
    },
    fechaEliminacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Backlog', BacklogSchema);