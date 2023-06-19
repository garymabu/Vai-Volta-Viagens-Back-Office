const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', function() {

if (confirm('Tem certeza de que deseja sair?')) {

    sessionStorage.removeItem('token');

    window.location.href = '../login/index.html';
    }
});
