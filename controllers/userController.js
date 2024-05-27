const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        orders: {
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, password } = req.body;
  try {
    const updateData = { name };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: { name: true, email: true }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
