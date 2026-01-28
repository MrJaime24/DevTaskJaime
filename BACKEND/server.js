require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Task = require('./models/Task');
const Backlog = require('./models/Backlog');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 Conectado exitosamente a MongoDB Atlas'))
    .catch((error) => console.error('🔴 Error de conexión a MongoDB:', error));

app.get('/api/tasks', async (req, res) => {
    try {
        const tareas = await Task.find().sort({ fecha: -1 });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const nuevaTarea = new Task(req.body);

        const tareaGuardada = await nuevaTarea.save();
        
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const tarea = await Task.findById(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const tareaHistorica = new Backlog({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            tecnologia: tarea.tecnologia,
            estado: tarea.estado,
            fechaOriginal: tarea.fecha 
        });
        await tareaHistorica.save(); 
        await Task.findByIdAndDelete(id);

        res.json({ mensaje: 'Tarea eliminada y archivada en el histórico' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la eliminación' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor DevTask corriendo en http://localhost:${PORT}`);
});