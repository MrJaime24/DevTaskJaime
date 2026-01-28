const API_URL = 'http://localhost:3000/api/tasks';

const form = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasksContainer');

document.addEventListener('DOMContentLoaded', () => {
    obtenerTareas();
});

async function obtenerTareas() {
    try {
        const response = await fetch(API_URL);
        const tareas = await response.json();
        
        renderizarTareas(tareas);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        tasksContainer.innerHTML = '<p style="color:red">Error de conexión con el servidor</p>';
    }
}

function renderizarTareas(tareas) {
    tasksContainer.innerHTML = ''; 

    if (tareas.length === 0) {
        tasksContainer.innerHTML = '<p>No hay tareas pendientes. ¡Buen trabajo!</p>';
        return;
    }

    tareas.forEach(tarea => {
        const card = document.createElement('article');
        card.classList.add('task-card');

        card.innerHTML = `
            <div class="task-header">
                <h3>${tarea.titulo}</h3>
                <span class="badge">${tarea.tecnologia}</span>
            </div>
            <p class="task-desc">${tarea.descripcion || 'Sin descripción'}</p>
            <div class="task-footer">
                <small>📅 ${new Date(tarea.fecha).toLocaleDateString()}</small>
                <button class="btn-delete" onclick="eliminarTarea('${tarea._id}')">
                    Completar / Borrar
                </button>
            </div>
        `;

        tasksContainer.appendChild(card);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

   
    const nuevaTarea = {
        titulo: document.getElementById('titulo').value,
        tecnologia: document.getElementById('tecnologia').value,
        descripcion: document.getElementById('descripcion').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaTarea)
        });

        if (response.ok) {
            form.reset(); 
            obtenerTareas(); 
        } else {
            alert('Error al guardar la tarea');
        }
    } catch (error) {
        console.error(error);
    }
});

window.eliminarTarea = async (id) => {
    if(!confirm('¿Seguro que quieres completar y archivar esta tarea?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            obtenerTareas();
        } else {
            alert('Error al eliminar');
        }
    } catch (error) {
        console.error(error);
    }
};