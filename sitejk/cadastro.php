<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: cadastro.html');
    exit();
}

include 'config.php';

$nome = trim(sanitizar($_POST['nome'] ?? ''));
$email = trim(sanitizar($_POST['email'] ?? ''));
$nickname = trim(sanitizar($_POST['nickname'] ?? ''));
$senha = $_POST['senha'] ?? '';
$confirmSenha = $_POST['confirmSenha'] ?? '';
$plataforma = trim(sanitizar($_POST['plataforma'] ?? ''));
$rank = trim(sanitizar($_POST['rank'] ?? ''));
$bio = trim(sanitizar($_POST['bio'] ?? ''));

$erros = [];

if ($nome === '') {
    $erros[] = 'Nome é obrigatório.';
}
if ($email === '' || !validar_email($email)) {
    $erros[] = 'Informe um email válido.';
}
if ($nickname === '' || strlen($nickname) < 3) {
    $erros[] = 'O nickname deve ter no mínimo 3 caracteres.';
}
if ($senha === '' || strlen($senha) < 6) {
    $erros[] = 'A senha deve ter no mínimo 6 caracteres.';
}
if ($senha !== $confirmSenha) {
    $erros[] = 'As senhas não coincidem.';
}
if ($plataforma === '' || $rank === '') {
    $erros[] = 'Selecione plataforma e rank.';
}

if (!empty($erros)) {
    $mensagem = implode(' ', $erros);
    header('Location: cadastro.html?status=error&message=' . rawurlencode($mensagem));
    exit();
}

try {
    $stmtExiste = $conexao->prepare('SELECT id FROM usuarios WHERE email = ? OR nickname = ? LIMIT 1');
    $stmtExiste->execute([$email, $nickname]);
    if ($stmtExiste->fetch()) {
        header('Location: cadastro.html?status=error&message=' . rawurlencode('Email ou nickname já estão em uso.'));
        exit();
    }

    $senhaHash = password_hash($senha, PASSWORD_BCRYPT);
    $stmt = $conexao->prepare('INSERT INTO usuarios (nome, email, senha, nickname, rank, plataforma, bio) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$nome, $email, $senhaHash, $nickname, $rank, $plataforma, $bio]);

    $usuarioId = (int) $conexao->lastInsertId();

    $_SESSION['usuario_id'] = $usuarioId;
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_nickname'] = $nickname;
    $_SESSION['usuario_email'] = $email;
    $_SESSION['usuario_rank'] = $rank;
    $_SESSION['usuario_plataforma'] = $plataforma;

    fazer_log('CADASTRO', 'Novo usuário criado: ' . $email, $usuarioId);

    header('Location: cadastro.html?status=success&message=' . rawurlencode('Conta criada com sucesso! Faça login para continuar.'));
    exit();
} catch (PDOException $e) {
    fazer_log('ERRO_CADASTRO', $e->getMessage());
    header('Location: cadastro.html?status=error&message=' . rawurlencode('Erro ao criar conta. Tente novamente.'));
    exit();
}
?>
