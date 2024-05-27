const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../services/emailService');
const config = require('../config/config');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  console.log('Register endpoint');  // Log de depuración
  const { name, email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Este email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = generateToken(user.id);

    // Enviar correo de bienvenida
    const subject = 'Bienvenido a la tienda UtopIA';
    const html = `<p>Hola ${name},</p><p>Bienvenido a la tienda UtopIA. Aquí podrás comprar y vender productos.</p>
    
    `;
    await sendEmail(email, subject, html);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Error registering user:', err);  // Log de depuración
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
