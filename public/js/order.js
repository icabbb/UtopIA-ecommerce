document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/'; // Redirigir a la página de inicio de sesión si no hay token
      return;
    }
  
    const orderItems = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderShipping = document.getElementById('order-shipping');
    const orderTotal = document.getElementById('order-total');
    const confirmOrderButton = document.getElementById('confirm-order');
    const toastBody = document.getElementById('toastBody');
    const orderToast = new bootstrap.Toast(document.getElementById('orderToast'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    console.log('Cart:', cart);
    console.log('Order Items Element:', orderItems);
    console.log('Order Subtotal Element:', orderSubtotal);
    console.log('Order Shipping Element:', orderShipping);
    console.log('Order Total Element:', orderTotal);
  
    function renderOrderItems() {
      console.log('Rendering order items...');
      orderItems.innerHTML = '';
      let subtotal = 0;
      cart.forEach(product => {
        subtotal += product.price * product.quantity;
        const orderItem = document.createElement('li');
        orderItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        orderItem.innerHTML = `
          <div class="d-flex">
            <img src="https://via.placeholder.com/50" class="me-3" alt="${product.name}">
            <div>
              <h5 class="mb-1">${product.name}</h5>
              <p class="mb-1">Quantity: ${product.quantity}</p>
            </div>
          </div>
          <span><strong>$${(product.price * product.quantity).toLocaleString('es-CL')}</strong></span>
        `;
        orderItems.appendChild(orderItem);
      });
      const shipping = 0; // Assuming free shipping for now
      const total = subtotal + shipping;
  
      orderSubtotal.textContent = `$${subtotal.toLocaleString('es-CL')}`;
      orderShipping.textContent = `$${shipping.toLocaleString('es-CL')}`;
      orderTotal.textContent = `$${total.toLocaleString('es-CL')}`;
    }
  
    async function confirmOrder() {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ items: cart })
        });
        const data = await response.json();
        if (response.ok) {
          showToast('Pedido confirmado con éxito.');
          localStorage.removeItem('cart');
          setTimeout(() => {
            window.location.href = '/store.html';
          }, 3000);
        } else {
          showToast('Error al confirmar el pedido.');
        }
      } catch (error) {
        console.error('Error confirming order:', error);
        showToast('Error al confirmar el pedido.');
      }
    }
  
    function showToast(message) {
      toastBody.textContent = message;
      orderToast.show();
    }
  
    confirmOrderButton.addEventListener('click', confirmOrder);
  
    renderOrderItems();
  });
  