const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../src/models/Product');
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct
} = require('../src/services/productService');

describe('Tests para servicios de productos', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    await Product.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('debería crear un producto correctamente', async () => {
    const producto = await createProduct('Collar', 'Accesorios', 'Perro', 4500, 25);
    expect(producto).toHaveProperty('_id');
  });

  it('debería devolver todos los productos', async () => {
    await createProduct('Juguete', 'Accesorios', 'Gato', 1500, 10);
    await createProduct('Comida', 'Alimento', 'Perro', 7200, 40);
    const productos = await getAllProducts();
    expect(productos).toHaveLength(2);
  });

  it('debería eliminar un producto', async () => {
    const p = await createProduct('Arena', 'Higiene', 'Gato', 2800, 50);
    const eliminado = await deleteProduct(p._id);
    expect(eliminado).toBe(true);
  });

  it('debería devolver producto por ID', async () => {
    const p = await createProduct('Shampoo', 'Higiene', 'Perro', 3100, 20);
    const result = await getProductById(p._id);
    expect(result.nombre).toBe('Shampoo');
  });

  it('debería actualizar un producto', async () => {
    const p = await createProduct('Pelota', 'Juguetes', 'Perro', 900, 5);
    const actualizado = await updateProduct(p._id, {
      nombre: 'Pelota chica',
      categoria: 'Juguetes',
      tipoMascota: 'Perro',
      precio: 750,
      stock: 10
    });
    expect(actualizado.nombre).toBe('Pelota chica');
  });
});
