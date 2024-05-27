document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/'; // Redirigir a la página de inicio de sesión si no hay token
      return;
    }
  
    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cart-items');
    const toastBody = document.getElementById('toastBody');
    const productToast = new bootstrap.Toast(document.getElementById('productToast'));
    const checkoutButton = document.getElementById('checkout-button');
    const logoutButton = document.getElementById('logout-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Function to fetch products from the API
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products', {
          headers: {
            'Authorization': `Bearer ${token}` // Enviar token en el encabezado de autorización
          }
        });
        const products = await response.json();
        renderProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    // Function to render products
    function renderProducts(products) {
      productList.innerHTML = '';
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-3 mb-4';
        productCard.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>$${product.price.toLocaleString('es-CL')}</strong></p>
              <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
            </div>
          </div>
        `;
        productList.appendChild(productCard);
      });
  
      // Add event listeners to "Add to Cart" buttons
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = parseInt(button.getAttribute('data-id'));
          addToCart(productId, products);
        });
      });
    }
  
    // Function to add a product to the cart
    function addToCart(productId, products) {
      const product = products.find(p => p.id === productId);
      if (product) {
        const existingProduct = cart.find(p => p.id === productId);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          product.quantity = 1;
          cart.push(product);
        }
        updateCartCount();
        renderCartItems();
        saveCart();
        showToast(product.name);
      }
    }
  
    // Function to update the cart count
    function updateCartCount() {
      cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);
    }
  
    // Function to render cart items
    function renderCartItems() {
      cartItems.innerHTML = '';
      cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.innerHTML = `
          <span>${product.name} (x${product.quantity})</span>
          <span><strong>$${(product.price * product.quantity).toLocaleString('es-CL')}</strong></span>
          <div>
            <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${product.id}">+</button>
            <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${product.id}">-</button>
            <button class="btn btn-sm btn-outline-danger remove-from-cart" data-id="${product.id}">Eliminar</button>
          </div>
        `;
        cartItems.appendChild(cartItem);
      });
  
      // Add event listeners to "Increase Quantity" buttons
      const increaseQuantityButtons = document.querySelectorAll('.increase-quantity');
      increaseQuantityButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = parseInt(button.getAttribute('data-id'));
          increaseQuantity(productId);
        });
      });
  
      // Add event listeners to "Decrease Quantity" buttons
      const decreaseQuantityButtons = document.querySelectorAll('.decrease-quantity');
      decreaseQuantityButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = parseInt(button.getAttribute('data-id'));
          decreaseQuantity(productId);
        });
      });
  
      // Add event listeners to "Remove from Cart" buttons
      const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
      removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = parseInt(button.getAttribute('data-id'));
          removeFromCart(productId);
        });
      });
    }
  
    // Function to increase the quantity of a product in the cart
    function increaseQuantity(productId) {
      const product = cart.find(p => p.id === productId);
      if (product) {
        product.quantity += 1;
        updateCartCount();
        renderCartItems();
        saveCart();
      }
    }
  
    // Function to decrease the quantity of a product in the cart
    function decreaseQuantity(productId) {
      const product = cart.find(p => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else if (product && product.quantity === 1) {
        cart = cart.filter(p => p.id !== productId);
      }
      updateCartCount();
      renderCartItems();
      saveCart();
    }
  
    // Function to remove a product from the cart
    function removeFromCart(productId) {
      cart = cart.filter(p => p.id !== productId);
      updateCartCount();
      renderCartItems();
      saveCart();
    }
  
    // Function to save the cart to localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Function to show toast notification
    function showToast(productName) {
      toastBody.textContent = `${productName} agregado al carrito.`;
      productToast.show();
    }
  
    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
      window.location.href = '/order.html';
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      });
  
    // Initial render
    fetchProducts();
    updateCartCount();
    renderCartItems();
  });
  