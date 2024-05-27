const express = require('express');
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

module.exports = router;
