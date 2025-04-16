document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const email = document.getElementById('email').value;

        // Simple validation
        if (!nome || !senha || !email) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // For demo purposes, using a simple credential check
        if (email === 'admin@example.com' && senha === 'admin') {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', nome);
            localStorage.setItem('userEmail', email);

            // Redirect to inventory page
            window.location.href = 'inventory.html';
        } else {
            alert('Credenciais inválidas!');
        }
    });

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'inventory.html';
    }
});
