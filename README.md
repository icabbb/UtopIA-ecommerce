# 🛒 UtopIA-ecommerce

Este es un proyecto de una tienda de comercio electrónico (Ecommerce) utilizando Node.js, Express, Prisma y Bootstrap. La aplicación permite a los usuarios registrarse, iniciar sesión, ver productos, agregar productos a un carrito de compras, realizar pedidos y ver su perfil y órdenes de compra.

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/icabbb/UtopIA-ecommerce.git
   cd UtopIA-ecommerce

2. **Instalar dependencias:**
     npm install

3. **Configurar variables de entorno:**
  Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```bash
      PORT=5000
      DATABASE_URL="mysql://username:password@host:port/database"
      JWT_SECRET="your_jwt_secret"
      EMAIL_USER="your_email@gmail.com"
      EMAIL_PASSWORD="your_email_password"
      EMAIL_FROM=""

5. **Configurar la base de datos:**
   ```bash
    npx prisma db push
    npx prisma generate

7. **Iniciar la app:**
   ```bash
    npm run dev

9. **Estructura del Proyecto:**
```plaintext
ecommerce-app/
├── config/
│   ├── db.js               # Configuración de la base de datos
│   └── config.js           # Configuración general
├── controllers/
│   ├── authController.js   # Controlador para autenticación
│   ├── productController.js# Controlador para productos
│   ├── orderController.js  # Controlador para órdenes
│   └── userController.js   # Controlador para usuarios
├── middlewares/
│   ├── authMiddleware.js   # Middleware de autenticación
│   └── errorMiddleware.js  # Middleware para manejo de errores
├── routes/
│   ├── authRoutes.js       # Rutas para autenticación
│   ├── productRoutes.js    # Rutas para productos
│   ├── orderRoutes.js      # Rutas para órdenes
│   └── usersRoutes.js      # Rutas para usuarios
├── services/
│   ├── emailService.js     # Servicio para enviar correos electrónicos
├── utils/  # Por ahora esta vacia.
│   ├── errorHandler.js     # Manejo de errores
│   └── logger.js           # Logger (si es necesario)
├── public/
│   ├── js/
│   │   ├── auth.js         # Lógica de autenticación en el cliente
│   │   ├── order.js        # Lógica del sistema de ordenes de compras
│   │   ├── store.js        # Lógica del carrito de compras y productos
│   │   └── profile.js      # Lógica del perfil de usuario
│   ├── cart.html           # Página del carrito
│   ├── index.html          # Página principal la use como Inicio y Registro se sesion
│   ├── profile.html        # Página de perfil de usuario
│   └── store.html          # Página de la tienda
├── .env                    # Variables de entorno
├── .gitignore              # Archivos y directorios ignorados por git
├── package.json            # Dependencias y scripts de npm
├── package-lock.json       # Bloqueo de versiones de npm
├── README.md               # Documentación del proyecto
├── generateToken.js        # Archivo para generar un "Secret token" para JWT
├── insertProducts.js       # Archivo para insertar productos dentro de la Database
└── server.js               # Archivo principal del servidor
```
9.**🚀 Funcionalidades:**

   Autenticación:

    Registro de usuarios
    Inicio de sesión de usuarios
    Logout de usuarios

  Productos:

    Ver lista de productos
    Agregar productos al carrito de compras
    
  Carrito de Compras:

    Ver productos en el carrito
    Modificar cantidad de productos en el carrito
    Eliminar productos del carrito
    Realizar pedido (checkout)
    
  Perfil de Usuario:

    Ver información del perfil
    Cambiar contraseña
    Ver órdenes de compra

10.**🔧 Desarrollo**
   Rutas de la API
   
     Autenticación:

      POST /api/auth/register - Registro de usuarios
      POST /api/auth/login - Inicio de sesión de usuarios
      POST /api/auth/logout - Logout de usuarios
      
    Productos:

      GET /api/products - Obtener todos los productos
      GET /api/products/:id - Obtener un producto por ID
      POST /api/products - Crear un nuevo producto
      PUT /api/products/:id - Actualizar un producto
      DELETE /api/products/:id - Eliminar un producto

    Órdenes:

      GET /api/orders - Obtener todas las órdenes del usuario autenticado
      POST /api/orders - Crear una nueva orden
      
    Usuarios:

      GET /api/users/profile - Obtener el perfil del usuario autenticado
      PUT /api/users/profile - Actualizar el perfil del usuario autenticado

      
11.**📝 Notas:**

    Variables de Entorno: Asegúrate de configurar correctamente las variables de entorno en el archivo .env.
    Base de Datos: Este proyecto utiliza Prisma como ORM y MySQL/MariaDB como base de datos.


12.**💡 Contribuciones**

    ¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes alguna sugerencia, por favor abre un issue o envía un pull request.

    
