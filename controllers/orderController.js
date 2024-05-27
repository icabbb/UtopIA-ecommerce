const prisma = require('../config/db');

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Crear una nueva orden
exports.createOrder = async (req, res) => {
  const { items } = req.body;
  console.log('Creating order with items:', items);
  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: req.user.id,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        },
        total: items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },
      include: {
        items: true
      }
    });
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: err.message });
  }
};

  

// Actualizar una orden
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { items, total } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { items, total }
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
