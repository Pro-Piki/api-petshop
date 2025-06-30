const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let usuariosConectados = 0;

connectDB();

app.use(cookieParser());

// Configuraciones
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Rutas Matayoshi
const authRoutes = require('./src/routes/authRoutes');
const petRoutes = require('./src/routes/petRoutes');
const ownerRoutes = require('./src/routes/ownerRoutes');
app.use('/', authRoutes);
app.use('/pets', petRoutes);
app.use('/owners', ownerRoutes);
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Rutas Ginart
const turnosRoutes = require('./src/routes/turnos.routes');
app.use('/turnos', turnosRoutes);
const mascotasAdopcionRoutes = require('./src/routes/mascotasAdopcion.routes');
app.use('/mascotasAdopcion', mascotasAdopcionRoutes);
const agendaRoutes = require('./src/routes/agendaRoutes');
app.use('/agenda', agendaRoutes);

// Rutas Vizgarra
const productRoutes = require('./src/routes/productRoutes');
const stockRoutes = require('./src/routes/stockRoutes');
app.use('/productos', productRoutes);
app.use('/stock', stockRoutes);



io.on('connection', (socket) => {
  
  usuariosConectados++;
  console.log('Un usuario se conectó. Total:', usuariosConectados);
  io.emit('usuarios', usuariosConectados);

  socket.on('disconnect', () => {
    usuariosConectados--;
    console.log('Un usuario se desconectó. Total:', usuariosConectados);
    io.emit('usuarios', usuariosConectados);
  });
});

// Servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});