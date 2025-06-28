require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./src/config/db'); 

const app = express();

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

// Rutas M
const authRoutes = require('./src/routes/authRoutes');
const petRoutes = require('./src/routes/petRoutes');
const ownerRoutes = require('./src/routes/ownerRoutes');
app.use('/', authRoutes);
app.use('/pets', petRoutes);
app.use('/owners', ownerRoutes);

// Rutas G
const turnosRoutes = require('./src/routes/turnos.routes');
app.use('/turnos', turnosRoutes);
const mascotasAdopcionRoutes = require('./src/routes/mascotasAdopcion.routes');
app.use('/mascotasAdopcion', mascotasAdopcionRoutes);

// Rutas V
const productRoutes = require('./src/routes/productRoutes');
const stockRoutes = require('./src/routes/stockRoutes');
const productApiRoutes = require('./src/routes/productApiRoutes');
app.use('/products', productRoutes);
app.use('/api/products', productApiRoutes); 
app.use('/stock', stockRoutes);

// ruta principal
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Inicio', 
    mensaje: 'Bienvenidos a la app con Express y MongoDB' // 🔄 texto actualizado opcional
  });
});

// manejo de errores 404
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    mensaje: 'La ruta solicitada no existe'
  });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});