const prisma = require('../config/db');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, description, price },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price },
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
