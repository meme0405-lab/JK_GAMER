/* ============================================
   dados.js - Dados Simulados Globais
   ============================================ */

// Usuário Atual
const usuarioAtual = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@example.com',
    nickname: 'JoaoGamer',
    foto: 'https://via.placeholder.com/150?text=Joao',
    bio: 'Amante de jogos competitivos 🎮',
    rank: 'Ouro',
    plataforma: 'PC',
    nivel: 15,
    matches: 42,
    jogos: 8,
    online: true,
    data_criacao: '2023-01-15'
};

// Jogos Simulados
const jogosSimulados = [
    {
        id: 1,
        nome: 'Counter-Strike 2',
        genero: 'FPS',
        plataforma: 'PC',
        icon: '🔫',
        imagem: 'https://via.placeholder.com/200x120?text=CS2',
        descricao: 'Jogo de tiro em primeira pessoa competitivo'
    },
    {
        id: 2,
        nome: 'League of Legends',
        genero: 'MOBA',
        plataforma: 'PC',
        icon: '⚔️',
        imagem: 'https://via.placeholder.com/200x120?text=LOL',
        descricao: 'Jogo de arena de batalha multiplayer online'
    },
    {
        id: 3,
        nome: 'Valorant',
        genero: 'FPS',
        plataforma: 'PC',
        icon: '💣',
        imagem: 'https://via.placeholder.com/200x120?text=Valorant',
        descricao: 'Jogo tático de tiro em primeira pessoa'
    },
    {
        id: 4,
        nome: 'Dota 2',
        genero: 'MOBA',
        plataforma: 'PC',
        icon: '🛡️',
        imagem: 'https://via.placeholder.com/200x120?text=Dota2',
        descricao: 'Jogo de arena de batalha estratégico'
    },
    {
        id: 5,
        nome: 'Minecraft',
        genero: 'Sandbox',
        plataforma: 'Multi-Plataforma',
        icon: '🧱',
        imagem: 'https://via.placeholder.com/200x120?text=Minecraft',
        descricao: 'Jogo de construção e exploração'
    },
    {
        id: 6,
        nome: 'Fortnite',
        genero: 'Battle Royale',
        plataforma: 'Multi-Plataforma',
        icon: '🎯',
        imagem: 'https://via.placeholder.com/200x120?text=Fortnite',
        descricao: 'Jogo de sobrevivência e construção'
    },
    {
        id: 7,
        nome: 'Call of Duty: Warzone',
        genero: 'Battle Royale',
        plataforma: 'Multi-Plataforma',
        icon: '💥',
        imagem: 'https://via.placeholder.com/200x120?text=Warzone',
        descricao: 'Jogo de tiro battle royale'
    },
    {
        id: 8,
        nome: 'Apex Legends',
        genero: 'Battle Royale',
        plataforma: 'Multi-Plataforma',
        icon: '👾',
        imagem: 'https://via.placeholder.com/200x120?text=Apex',
        descricao: 'Jogo de heróis em batalha royale'
    },
    {
        id: 9,
        nome: 'Elden Ring',
        genero: 'RPG',
        plataforma: 'Multi-Plataforma',
        icon: '⚡',
        imagem: 'https://via.placeholder.com/200x120?text=EldenRing',
        descricao: 'Jogo de RPG de ação dark fantasy'
    },
    {
        id: 10,
        nome: 'Palworld',
        genero: 'RPG',
        plataforma: 'Multi-Plataforma',
        icon: '🐾',
        imagem: 'https://via.placeholder.com/200x120?text=Palworld',
        descricao: 'Jogo de captura e criação de criaturas'
    },
    {
        id: 11,
        nome: 'The Crew Motorfest',
        genero: 'Racing',
        plataforma: 'Multi-Plataforma',
        icon: '🏎️',
        imagem: 'https://via.placeholder.com/200x120?text=Motorfest',
        descricao: 'Jogo de corrida online cooperativo'
    },
    {
        id: 12,
        nome: 'Rainbow Six Siege',
        genero: 'FPS',
        plataforma: 'Multi-Plataforma',
        icon: '🎖️',
        imagem: 'https://via.placeholder.com/200x120?text=Siege',
        descricao: 'Jogo de tiro tático com destruição dinâmica'
    },
    {
        id: 13,
        nome: 'Overwatch 2',
        genero: 'FPS',
        plataforma: 'Multi-Plataforma',
        icon: '⚙️',
        imagem: 'https://via.placeholder.com/200x120?text=Overwatch',
        descricao: 'Jogo de tiro por equipes com heróis'
    },
    {
        id: 14,
        nome: 'Hearthstone',
        genero: 'Card Game',
        plataforma: 'Multi-Plataforma',
        icon: '🃏',
        imagem: 'https://via.placeholder.com/200x120?text=Hearthstone',
        descricao: 'Jogo de cartas colecionáveis'
    },
    {
        id: 15,
        nome: 'World of Warcraft',
        genero: 'MMORPG',
        plataforma: 'PC',
        icon: '🐉',
        imagem: 'https://via.placeholder.com/200x120?text=WoW',
        descricao: 'Jogo de RPG multijogador massivo'
    }
];

// Jogadores Simulados
const jogadoresSimulados = [
    {
        id: 2,
        nome: 'Marco Antonio',
        nickname: 'MarcoGamer',
        foto: '👤',
        email: 'marco@example.com',
        rank: 'Platina',
        plataforma: 'PC',
        nivel: 20,
        online: true,
        jogos: ['Counter-Strike 2', 'Valorant'],
        bio: 'Pro player em FPS'
    },
    {
        id: 3,
        nome: 'Ana Silva',
        nickname: 'AnaGame',
        foto: '👩',
        email: 'ana@example.com',
        rank: 'Ouro',
        plataforma: 'Console',
        nivel: 18,
        online: true,
        jogos: ['Apex Legends', 'Fortnite'],
        bio: 'Streamer em tempo livre'
    },
    {
        id: 4,
        nome: 'Carlos Mendes',
        nickname: 'CarlosM',
        foto: '👨',
        email: 'carlos@example.com',
        rank: 'Prata',
        plataforma: 'PC',
        nivel: 12,
        online: false,
        jogos: ['League of Legends', 'Dota 2'],
        bio: 'Amante de MOBA'
    },
    {
        id: 5,
        nome: 'Jessica Costa',
        nickname: 'Jess',
        foto: '👩‍🦰',
        email: 'jessica@example.com',
        rank: 'Ouro',
        plataforma: 'PC',
        nivel: 16,
        online: true,
        jogos: ['Valorant', 'Counter-Strike 2'],
        bio: 'Competitiva e dedicada'
    },
    {
        id: 6,
        nome: 'Pedro Alves',
        nickname: 'PedroA',
        foto: '🧑',
        email: 'pedro@example.com',
        rank: 'Bronze',
        plataforma: 'Console',
        nivel: 8,
        online: false,
        jogos: ['Fortnite', 'Minecraft'],
        bio: 'Novo no cenário gamer'
    }
];

// Matches Simulados
const matchesSimulados = [
    {
        id: 1,
        usuario1_id: 1,
        jogador_id: 2,
        jogo_id: 1,
        status: 'pendente',
        data_criacao: new Date(Date.now() - 3600000)
    },
    {
        id: 2,
        usuario1_id: 1,
        jogador_id: 3,
        jogo_id: 2,
        status: 'aceito',
        data_criacao: new Date(Date.now() - 7200000)
    },
    {
        id: 3,
        usuario1_id: 1,
        jogador_id: 4,
        jogo_id: 3,
        status: 'finalizado',
        data_criacao: new Date(Date.now() - 86400000)
    }
];

// Função auxiliar para formatar data
function formatarData(data, formato = 'd/m/Y') {
    if (!(data instanceof Date)) {
        data = new Date(data);
    }
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    if (formato === 'd/m/Y H:i') {
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }
    return `${dia}/${mes}/${ano}`;
}
