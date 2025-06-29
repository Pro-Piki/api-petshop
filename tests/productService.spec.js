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

  // Se crea una base de datos en memoria antes de todos los tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Se limpian los productos luego de cada test
  afterEach(async () => {
    await Product.deleteMany();
  });

  // Se desconecta la base de datos al finalizar todos los tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  /*
  Objetivo: verificar que se pueda crear un producto exitosamente
  Procedimiento: se llama a createProduct con datos válidos
  Resultado esperado: el objeto retornado debe tener un _id generado por Mongo
  */
  it('debería crear un producto correctamente', async () => {
    const producto = await createProduct('Collar', 'Accesorios', 'Perro', 4500, 25);
    expect(producto).toHaveProperty('_id');
  });

  /*
  Objetivo: validar que se recuperen todos los productos guardados
  Procedimiento: se crean dos productos y luego se llama a getAllProducts
  Resultado esperado: el array retornado debe tener 2 elementos
  */
  it('debería devolver todos los productos', async () => {
    await createProduct('Juguete', 'Accesorios', 'Gato', 1500, 10);
    await createProduct('Comida', 'Alimento', 'Perro', 7200, 40);
    const productos = await getAllProducts();
    expect(productos).toHaveLength(2);
  });

  /*
  Objetivo: confirmar que se puede eliminar un producto por su ID
  Procedimiento: se crea un producto se elimina y se verifica que la función retorne true
  Resultado esperado: deleteProduct debe retornar true indicando éxito
  */
  it('debería eliminar un producto', async () => {
    const p = await createProduct('Arena', 'Higiene', 'Gato', 2800, 50);
    const eliminado = await deleteProduct(p._id);
    expect(eliminado).toBe(true);
  });

  /*
  Objetivo: asegurar que se pueda obtener un producto por su ID
  Procedimiento: se crea un producto y luego se lo busca por ID
  Resultado esperado: el nombre del producto debe coincidir con el ingresado
  */
  it('debería devolver producto por ID', async () => {
    const p = await createProduct('Shampoo', 'Higiene', 'Perro', 3100, 20);
    const result = await getProductById(p._id);
    expect(result.nombre).toBe('Shampoo');
  });

  /* 
  Objetivo: verificar que la actualización de un producto funcione correctamente
  Procedimiento: se crea un producto y luego se lo actualiza con nuevos datos
  Resultado esperado: el producto actualizado debe reflejar los nuevos valores
  */
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

  /*
  * Objetivo: verificar el comportamiento al intentar eliminar un producto inexistente
  * Procedimiento: se genera un ID de MongoDB válido que no existe en la base
  * Resultado esperado: la función debe retornar false
  */
  it('debería retornar false al intentar eliminar un producto inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId(); // ID válido pero inexistente
    const resultado = await deleteProduct(fakeId);
    expect(resultado).toBe(false);
  });

});
