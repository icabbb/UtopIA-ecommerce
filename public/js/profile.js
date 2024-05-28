document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/'; // Redirigir a la página de inicio de sesión si no hay token
    return;
  }

  const userInfo = document.getElementById('user-info');
  const orderList = document.getElementById('order-list');
  const passwordForm = document.getElementById('passwordForm');
  const currentPasswordInput = document.getElementById('currentPassword');
  const newPasswordInput = document.getElementById('newPassword');
  const toastBody = document.getElementById('toastBody');
  const profileToast = new bootstrap.Toast(document.getElementById('profileToast'));

  // Funcion para mostrar la info del usuario
  async function fetchUserProfile() {
    try {
      const response = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const user = await response.json();
      if (response.ok) {
        displayUserInfo(user);
        displayOrders(user.orders || []); // Asegúrate de que orders es un array
      } else {
        showToast('Error al cargar la información del usuario.');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      showToast('Error al cargar la información del usuario.');
    }
  }

  // Function to display user info
  function displayUserInfo(user) {
    userInfo.innerHTML = `
      <p><strong>Nombre:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
  }

  // Funcion para mostrar las ordenes de compra que hizo un usuario
  function displayOrders(orders) {
    orderList.innerHTML = '';
    orders.forEach(order => {
      const orderItem = document.createElement('li');
      orderItem.className = 'list-group-item';
      orderItem.innerHTML = `
        <p><strong>ID de Orden:</strong> ${order.id}</p>
        <p><strong>Total:</strong> $${order.total.toLocaleString('es-CL')}</p>
        <p><strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <ul>
          ${order.items.map(item => `
            <li>
              <p><strong>Producto:</strong> ${item.product.name}</p>
              <p><strong>Cantidad:</strong> ${item.quantity}</p>
              <p><strong>Precio:</strong> $${item.price.toLocaleString('es-CL')}</p>
            </li>
          `).join('')}
        </ul>
      `;
      orderList.appendChild(orderItem);
    });
  }

  // Funcion para mostrar el toast
  function showToast(message) {
    toastBody.textContent = message;
    profileToast.show();
  }

  // Event listener para el cambio de password
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        showToast('Contraseña actualizada con éxito.');
        passwordForm.reset();
      } else {
        showToast(data.error || 'Error al actualizar la contraseña.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      showToast('Error al actualizar la contraseña.');
    }
  });

  // Al recargar se muestra la info
  fetchUserProfile();
});
