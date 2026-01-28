## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura de separación de responsabilidades:

devtask-tracker/
├── backend/            # API RESTful (Node.js + Express + MongoDB)
│   ├── models/         # Esquemas de datos (Mongoose)
│   ├── .env            # Variables de entorno
│   └── server.js       # Entry point del servidor
│
└── frontend/           # Cliente Web (Vanilla JS + HTML5 + CSS3)
    ├── index.html      # Estructura semántica
    ├── styles.css      # Estilos y diseño responsivo
    └── app.js          # Lógica de consumo de API (Fetch)
