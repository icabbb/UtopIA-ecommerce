document.addEventListener('DOMContentLoaded', () => {
  const showPasswordIcons = document.querySelectorAll('.show-password');

  showPasswordIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const passwordField = e.target.previousElementSibling;
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        e.target.classList.remove('fa-eye');
        e.target.classList.add('fa-eye-slash');
      } else {
        passwordField.type = 'password';
        e.target.classList.remove('fa-eye-slash');
        e.target.classList.add('fa-eye');
      }
    });
  });

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toastBody = document.getElementById('toastBody');
  const authToast = new bootstrap.Toast(document.getElementById('authToast'));

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Guardar token en localStorage
          window.location.href = '/store.html'; // Redirigir a la tienda
        } else {
          showToast(data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('Error al iniciar sesión');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;

      if (password !== confirmPassword) {
        showToast('Las contraseñas no coinciden');
        return;
      }

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Guardar token en localStorage
          window.location.href = '/store.html'; // Redirigir a la tienda
        } else {
          showToast(data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('Error al registrarse');
      }
    });
  }

  function showToast(message) {
    toastBody.textContent = message;
    authToast.show();
  }
});
