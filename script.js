// Array para armazenar os usuários (simulando um banco de dados)
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Função para cadastrar um novo usuário
function cadastrarUsuario() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const isAdmin = document.getElementById("isAdmin").value === "true";

  // Verificar se o nome de usuário já existe
  const usuarioExistente = usuarios.find(user => user.username === username);
  if (usuarioExistente) {
    alert("Usuário já existe. Escolha outro nome de usuário.");
    return;
  }

  // Adicionar o novo usuário ao array
  const novoUsuario = { username, password, isAdmin };
  usuarios.push(novoUsuario);

  // Salvar no localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Notificar o administrador e limpar o formulário
  alert("Usuário cadastrado com sucesso!");

  // Redirecionar para o login
  window.location.href = "login.html";
}

// Função de login
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // Verificar se o usuário existe
  const usuario = usuarios.find(user => user.username === username && user.password === password);
  
  if (usuario) {
    // Salvar usuário logado no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // Redirecionar para a página inicial
    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

// Função de logout
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

// Função para verificar se o usuário está logado e exibir opções
function verificarLogin() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado) {
    // Exibir nome do usuário logado e permitir logout
    document.getElementById("btn-logout").style.display = "inline-block"; // Exibir o botão de logout
    document.getElementById("icon-user").style.display = "inline-block"; // Exibir o ícone de usuário
    document.getElementById("btn-login").style.display = "none"; // Ocultar o botão de login
  } else {
    // Ocultar o botão de logout e o ícone de usuário
    document.getElementById("btn-login").style.display = "inline-block";
    document.getElementById("btn-logout").style.display = "none";
    document.getElementById("icon-user").style.display = "none";
  }
}

// Função para verificar o login ao carregar a página
window.onload = function() {
  verificarLogin();
};
// Função para verificar se o usuário logado é um administrador
function verificarAdmin() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado && usuarioLogado.isAdmin) {
    // Se o usuário logado for admin, redireciona para o cadastro
    window.location.href = "cadastro.html";
  }
}

// Função para verificar o login ao carregar a página
window.onload = function() {
  verificarLogin();

  // Verificar se o usuário está acessando a página de perfil do admin
  if (window.location.pathname.includes("perfil.html")) {
    verificarAdmin();
  }
};

// Função de verificar login e exibir os elementos corretos (login/logout)
function verificarLogin() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado) {
    // Exibir nome do usuário logado e permitir logout
    document.getElementById("btn-logout").style.display = "inline-block"; // Exibir o botão de logout
    document.getElementById("icon-user").style.display = "inline-block"; // Exibir o ícone de usuário
    document.getElementById("btn-login").style.display = "none"; // Ocultar o botão de login
  } else {
    // Ocultar o botão de logout e o ícone de usuário
    document.getElementById("btn-login").style.display = "inline-block";
    document.getElementById("btn-logout").style.display = "none";
    document.getElementById("icon-user").style.display = "none";
  }
}

document.getElementById('form-cadastro').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Coleta os dados do formulário
  const nome = document.getElementById('nome').value;
  const capacidade = document.getElementById('capacidade').value;
  const filme = document.getElementById('filme').value;
  const genero = document.getElementById('genero').value;
  const duracao = document.getElementById('duracao').value;
  const data = document.getElementById('data').value;
  const horario = document.getElementById('horario').value;
  const ingresso = document.getElementById('ingresso').value;
  const preco = document.getElementById('preco').value;
  const imagem = document.getElementById('imagem').files[0] ? document.getElementById('imagem').files[0].name : ''; // Captura o nome da imagem

  // Cria um objeto com os dados do formulário
  const sessao = {
    nome,
    capacidade,
    filme,
    genero,
    duracao,
    data,
    horario,
    ingresso,
    preco,
    imagem
  };

  // Recupera as sessões existentes do LocalStorage ou cria um array vazio
  let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];

  // Adiciona a nova sessão ao array
  sessoes.push(sessao);

  // Salva as sessões no LocalStorage
  localStorage.setItem('sessoes', JSON.stringify(sessoes));

  // Exibe uma mensagem de confirmação
  alert('Sessão cadastrada com sucesso!');

  // Limpa o formulário após o envio
  document.getElementById('form-cadastro').reset();
});
