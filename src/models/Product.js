class Product {
  constructor(nombre, categoria, tipoMascota, precio, stock) {
    this.id = Date.now();
    this.nombre = nombre;
    this.categoria = categoria;
    this.tipoMascota = tipoMascota;
    this.precio = precio;
    this.stock = stock;
    this.estado = 'activo';
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Product;