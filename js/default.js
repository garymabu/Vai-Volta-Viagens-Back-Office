const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', function() {

if (confirm('Tem certeza de que deseja sair?')) {

    sessionStorage.removeItem('token');

    window.location.href = 'http://127.0.0.1:5500/pages/login/index.html';
    }
});
