const prisma = require('./config/db');

const products = [
  {
    name: "Laptop Lenovo Ideapad 3",
    description: "Laptop con procesador Intel Core i5 de 10ma generación, 8GB RAM, 256GB SSD.",
    price: 499990
  },
  {
    name: "Mouse Logitech MX Master 3",
    description: "Mouse inalámbrico con sensor láser de alta precisión, diseño ergonómico.",
    price: 89990
  },
  {
    name: "Teclado Mecánico HyperX Alloy FPS",
    description: "Teclado mecánico con interruptores Cherry MX Red, retroiluminación LED roja.",
    price: 74990
  },
  {
    name: "Monitor Samsung 24\" Curvo",
    description: "Monitor curvo de 24 pulgadas, resolución Full HD, 75Hz.",
    price: 139990
  },
  {
    name: "SSD Kingston A2000 1TB",
    description: "Unidad de estado sólido NVMe PCIe con velocidad de lectura/escritura de hasta 2000MB/s.",
    price: 129990
  },
  {
    name: "Tarjeta Gráfica NVIDIA GeForce RTX 3060",
    description: "Tarjeta gráfica con 12GB GDDR6, soporte para ray tracing y DLSS.",
    price: 499990
  },
  {
    name: "Placa Madre ASUS TUF Gaming B550M",
    description: "Placa madre para procesadores AMD Ryzen, soporte para PCIe 4.0.",
    price: 139990
  },
  {
    name: "Procesador AMD Ryzen 5 3600",
    description: "Procesador de 6 núcleos y 12 hilos, velocidad base de 3.6GHz.",
    price: 189990
  },
  {
    name: "Memoria RAM Corsair Vengeance LPX 16GB",
    description: "Kit de memoria RAM DDR4 de 16GB (2x8GB), velocidad de 3200MHz.",
    price: 79990
  },
  {
    name: "Fuente de Poder EVGA 600W",
    description: "Fuente de poder con certificación 80+ Bronze, 600W.",
    price: 69990
  }
];

const insertProducts = async () => {
  try {
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
    }
    console.log('Products inserted successfully');
  } catch (err) {
    console.error('Error inserting products:', err);
  } finally {
    await prisma.$disconnect();
  }
};

insertProducts();
