document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    checkLoginStatus();

    loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }));

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (validateLogin(username, password)) {
            setLoggedIn(username);
            loginModal.style.display = 'none';
            loginMessage.textContent = '';
        } else {
            loginMessage.textContent = 'Usuário ou senha incorretos!';
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            registerMessage.textContent = 'As senhas não coincidem!';
            return;
        }
        
        if (registerUser(username, password)) {
            registerMessage.textContent = '';
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
            alert('Registro realizado com sucesso! Faça login.');
        } else {
            registerMessage.textContent = 'Usuário já existe!';
        }
    });

    logoutBtn.addEventListener('click', logout);

    function validateLogin(username, password) {
        const users = JSON.parse(localStorage.getItem('portfolioUsers')) || {};
        return users[username] && users[username] === password;
    }

    function registerUser(username, password) {
        const users = JSON.parse(localStorage.getItem('portfolioUsers')) || {};
        if (users[username]) return false;
        users[username] = password;
        localStorage.setItem('portfolioUsers', JSON.stringify(users));
        return true;
    }

    function setLoggedIn(username) {
        localStorage.setItem('portfolioCurrentUser', username);
        updateUI();
    }

    function logout() {
        localStorage.removeItem('portfolioCurrentUser');
        updateUI();
    }

    function checkLoginStatus() {
        updateUI();
    }

    function updateUI() {
        const currentUser = localStorage.getItem('portfolioCurrentUser');
        if (currentUser) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    }
});
