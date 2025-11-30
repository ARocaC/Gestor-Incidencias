🛠️ Fixidence — Sistema de Gestión de Incidencias

Fixidence es una aplicación web desarrollada como proyecto final del ciclo, diseñada para gestionar incidencias de forma clara, eficiente y estructurada.
Permite registrar incidencias, consultarlas, modificar su estado, añadir comentarios y gestionarlas de principio a fin tanto para administradores como para usuarios internos.

Este proyecto se construyó utilizando Lightning Web Components (LWC), Apex (Salesforce) y un backend basado en servicios REST simulados/extendidos para crear una experiencia completa de cliente–servidor.

📌 Contenido del repositorio

lwc/ – Componentes Lightning Web Components del frontend

apex/ – Clases Apex del backend (controladores y lógica de negocio)

data/ – Archivos de prueba o datos generados para testeo

docs/ – Memoria del proyecto y documentación complementaria

README.md – Este archivo

🚀 Características principales
✔️ Gestión completa de incidencias

Crear incidencias con título, descripción, prioridad y fecha

Editar estado y prioridad

Cerrar incidencias desde su página de detalle

Reabrir incidencias (opcional según permisos)

✔️ Sistema de comentarios

Añadir comentarios a cualquier incidencia

Visualización cronológica

Actualización automática tras publicar un comentario

Diseño modular con dos LWCs:

crearComentario

comentariosList

✔️ Página de detalle de incidencia

Incluye:

Datos completos de la incidencia

Acciones administrativas (cambiar estado, cambiar prioridad, cerrar)

Listado de comentarios

Formulario para añadir comentarios

✔️ Página de usuario (planeada / en expansión)

Panel para clientes donde pueden consultar sus incidencias

Posibilidad de cerrar definitivamente una incidencia

Posibilidad de reabrirla en caso de error

💻 Tecnologías utilizadas
Frontend

Lightning Web Components (LWC)

HTML5

CSS3

JavaScript ES6+

Salesforce UI Base Components

Backend

Apex (Salesforce)

SOQL/SOSL

Servicios REST internos de Salesforce

Herramientas

Visual Studio Code + Salesforce Extension Pack

Salesforce CLI

Git & GitHub

Chrome / Firefox Developer Tools

⚙️ Instalación y uso
1️⃣ Clonar el repositorio
git clone https://github.com/ARocaC/Gestor-Incidencias.git

2️⃣ Instalar dependencias de Salesforce

(Si trabajas con un entorno local)

npm install

3️⃣ Conectar a tu org de Salesforce
sf org login web

4️⃣ Deploy a la org
sf project deploy start

5️⃣ Abrir la org
sf org open

🧩 Arquitectura

Fixidence está dividida en tres grandes bloques:

🔸 1. LWC (Frontend)
Componente	Función
incidenciasList	Lista todas las incidencias del sistema
incidenciaDetail	Muestra los datos completos de una incidencia
crearComentario	Formulario para publicar comentarios
comentariosList	Listado dinámico de comentarios
updateIncidencia	Botones para actualizar estado y prioridad
🔸 2. Apex Controllers

IncidenciaController.cls

Obtener incidencias

Crear incidencia

Actualizar estado/prioridad

Cerrar incidencias

ComentarioController.cls

Crear comentario

Obtener comentarios asociados

🔸 3. Base de datos Salesforce

Objeto personalizado Incidencia__c

Objeto personalizado Comentario__c

📊 Diagrama simplificado de arquitectura
[ LWC Frontend ]
      |
      v
[Apex Controllers]
      |
      v
[ Salesforce Database ]

🖼️ Vistas previas de Fixidence

<img width="1914" height="799" alt="Captura de pantalla 2025-11-30 224934" src="https://github.com/user-attachments/assets/176c1fd5-a0c1-4827-9c8a-94b482256be1" />
<img width="1901" height="818" alt="Captura de pantalla 2025-11-30 225001" src="https://github.com/user-attachments/assets/19547ff9-12e2-491c-9fbd-06f649e8c215" />



📝 Cómo contribuir

¡Siéntete libre de enviar PRs!
Puedes colaborar en:

Optimización de consultas SOQL

Mejoras en el UI/UX de LWC

Refactorización de componentes

Documentación

👤 Autor

Álex — Desarrollador del proyecto Fixidence
Proyecto presentado como parte del módulo de Desarrollo de Aplicaciones Web.

📄 Licencia

Este proyecto está publicado bajo la licencia MIT, lo que permite su uso libre con atribución.

⭐ Si te sirve… dale una estrella al repositorio :)
