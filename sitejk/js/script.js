// script.js
// Arquivo auxiliar para comportamento do login e navegação básica.

const loginForm = document.getElementById('loginForm');
const statusMessage = document.getElementById('statusMessage');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        // O formulário já envia para login.php via POST;
        // esta função apenas pode ser usada para exibir feedback se necessário.
        statusMessage.textContent = 'Entrando...';
    });
}
