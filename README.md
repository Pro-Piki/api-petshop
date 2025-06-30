# Práctica Formativa Segunda Entrega
## Petshop HUELLITAS FELICES

![Captura del Login](public/images/Login.png)

### Integrantes de PINK CODE | COMISIÓN E

- GINART Nadia
- MATAYOSHI Yamila Yoshiko
- VIZGARRA Bárbara Lorena

### Asignación de Roles y Responsabilidades:

- **GINART:** 
         * FrontEnd: Diseño y aplicación de estilos en el proyecto.
         * BackEnd: Implementación de rutas, controladores y servicios para los módulos de Turnos, Adopciones y Agenda.
                    Migración de los módulos descriptos anteriormente a MongoDB Atlas.
         * Despliegue del proyecto en Render.
         * Documentación.
- **MATAYOSHI:** 
         * BackEnd: Implementación de rutas, controladores y servicios para los módulos de Login, Registro de Usuario, Registro de Cliente, Registro de Mascotas, .
                    Migración de los módulos descriptos anteriormente a MongoDB Atlas.
         * Autenticación y autorización con JWT.
         * Implementación de bcrypt.
         * Documentación.
- **VIZGARRA:** 
         * BackEnd: Implementación de rutas, controladores y servicios para los módulos de Listado de productos y Movimiento de Stock.
                    Migración de los módulos descriptos anteriormente a MongoDB Atlas.
         * Configuración de MongoDB Atlas.
         * Implementación de Websocket.
         * Implementación de testeo con Jest y MongoMemoryServer.
         * Documentación.                  
            
### Estructura del proyecto:

+---logs
|       .gitkeep
|                
+---public
|   |   .gitkeep
|   |   
|   +---images
|   |       hero-login.png
|   |       huellita.png
|   |       logo.png
|   |       
|   \---styles
|           agenda.css
|           login.css
|           main.css
|           mascotas.css
|           panel.css
|           productos.css
|           turnos.css
|           
+---src
|   +---config
|   |       db.js
|   |       jwt.js
|   |       
|   +---controllers
|   |       agendaController.js
|   |       authController.js
|   |       mascotasAdopcion.controller.js
|   |       ownerController.js
|   |       petController.js
|   |       productController.js
|   |       stockController.js
|   |       turnosController.js
|   |       
|   +---data
|   |       mascotasAdopcion.json
|   |       movementsStock.json
|   |       products.json
|   |       turnos.json
|   |       
|   +---middleware
|   |       authMiddleware.js
|   |       
|   +---models
|   |       MascotaAdopcion.js
|   |       Owner.js
|   |       Pet.js
|   |       Product.js
|   |       Stock.js
|   |       Turno.js
|   |       User.js
|   |       
|   +---routes
|   |       agendaRoutes.js
|   |       authRoutes.js
|   |       mascotasAdopcion.routes.js
|   |       ownerRoutes.js
|   |       petRoutes.js
|   |       productRoutes.js
|   |       stockRoutes.js
|   |       turnos.routes.js
|   |       
|   +---services
|   |       agendaService.js
|   |       authService.js
|   |       mascotasAdopcion.service.js
|   |       ownerService.js
|   |       petService.js
|   |       productService.js
|   |       stockService.js
|   |       turnosService.js
|   |       
|   \---views
|       |   agenda.pug
|       |   editOwner.pug
|       |   editPet.pug
|       |   error.pug
|       |   layout.pug
|       |   login.pug
|       |   mascotasAdopcion.pug
|       |   ownerDetails.pug
|       |   panel.pug
|       |   petDetails.pug
|       |   register.pug
|       |   registerOwner.pug
|       |   registerPet.pug
|       |   turnos.pug
|       |   
|       +---layouts
|       |       main.pug
|       |       
|       +---productos
|       |       crear.pug
|       |       detalle.pug
|       |       editar.pug
|       |       listar.pug
|       |       
|       \---stock
|               listar.pug
|               movimientos.pug
|               nuevo.pug
|               
\--tests
|        productService.spec.js
|         
|   .gitignore
|   .prettierrc
|   eslint.config.mjs
|   estructura.txt
|   index.js
|   package-lock.json
|   package.json        


### Alcance del proyecto:

 El sistema le permitirá a los admin registrar usuarios con acceso diferenciado por roles. Los módulos incluidos en el sistema son: 
 registro de clientes y mascotas, agenda de turnos, registro de turnos, gestión de productos y consultas del stock. 
 Los clientes podrán acceder a búsqueda de mascotas en adopción y solicitud de turnos.

 ### Nuevas Implementaciones realizadas en esta segunda entrega:

    - MongoDB Atlas: Los datos de usuarios, los turnos y los productos se gestionan en la nube con MongoDB Atlas. 
    - JWT (JSON Web Tokens): Autenticación y autorización basada en tokens para los usuarios.
    - Bcrypt: Utilizado para proteger las contraseñas al ser guardadas en la base de datos a través de una función de hash. 
    - WebSockets: mediante Socket.IO para mostrar en tiempo real un contador de usuarios conectados, actualizando dinámicamente en el frontend cada vez que un usuario se conecta o desconecta
    - Jest y MongoMemoryServer: para testear el módulo de servicios de productos, validando operaciones como creación, actualización, eliminación y consulta sobre una base de datos MongoDB en memoria

### Recursos utilizados para realizar el desarrollo del proyecto:

    • Documentación oficial de Node js : [Node.js](https://nodejs.org/docs/latest/api/)
    • Documentación oficial de Express : [Express](https://expressjs.com/)
    • Curso guía de Node js: [Node.js Udemy](https://www.udemy.com/course/nodejs-guia-desde-cero/)
    • Documentación de PUG: [Pug](https://pugjs.org/api/getting-started.html)
    • Módulo para cargar variables de entorno desde archivos .env: [dotenv](https://www.npmjs.com/package/dotenv)
    • Documentación JWT: [Doc JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
    • Tutorial de autenticación y autorización con JWT: [JSON Web Token](https://www.youtube.com/watch?v=lV7mxivGX_I) 
    • Tutorial encriptado de contraseña con bcrypt: [bcrypt](https://www.youtube.com/watch?v=AzA_LTDoFqY)
    • Documentación de Websocket: [Node.js WebSocket](https://nodejs.org/en/learn/getting-started/websocket)
    • Documentación de Socket.IO: [Socket.IO](https://socket.io/docs/v4/)
    • Tutorial de Websocket: [Web-Socket in Node](https://www.geeksforgeeks.org/web-socket-in-node-js/)
    • Base de datos en la nube: [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
    • Documentación de Mongoose: [Mongoose](https://mongoosejs.com/)