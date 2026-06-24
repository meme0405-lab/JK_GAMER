/* ============================================
   Games.js - Lógica da página de Jogos Favoritos
   ============================================ */

let jogosFavoritos = jogosSimulados.slice(0, 4);
let jogosFiltrados = [...jogosSimulados];
let paginaAtualGames = 1;
const itensPorPaginaGames = 12;

// Carregar jogos
function carregarJogos(tab = 'meus', pagina = 1) {
    let jogosParaExibir = tab === 'meus' ? jogosFavoritos : jogosFiltrados;

    const inicio = (pagina - 1) * itensPorPaginaGames;
    const fim = inicio + itensPorPaginaGames;
    const jogosPagina = jogosParaExibir.slice(inicio, fim);

    const container = tab === 'meus' 
        ? document.getElementById('myGames') 
        : document.getElementById('availableGames');

    if (!container) return;

    if (jogosPagina.length === 0) {
        container.innerHTML = '';
        if (tab === 'meus') {
            document.getElementById('emptyMyGames').style.display = 'flex';
        }
        return;
    }

    if (tab === 'meus') {
        document.getElementById('emptyMyGames').style.display = 'none';
        document.getElementById('countMeus').textContent = jogosFavoritos.length;
    }

    container.innerHTML = jogosPagina.map(jogo => `
        <div class="game-item" onclick="abrirDetalhesJogo(${jogo.id})">
            <div style="flex: 1; display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 36px; min-width: 50px; text-align: center;">${jogo.icon}</div>
                <div>
                    <h4>${jogo.nome}</h4>
                    <p>${jogo.genero} • ${jogo.plataforma}</p>
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                ${tab === 'meus' ? `
                    <button class="btn-icon" onclick="event.stopPropagation(); removerJogoFavorito(${jogo.id})" title="Remover">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : `
                    <button class="btn-icon" onclick="event.stopPropagation(); adicionarJogoFavorito(${jogo.id})" title="Adicionar">
                        <i class="fas fa-star"></i>
                    </button>
                `}
                <button class="btn-icon" onclick="event.stopPropagation(); buscarJogadoresJogo(${jogo.id})" title="Encontrar Jogadores">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    `).join('');

    atualizarPaginacaoGames(tab, pagina);
    paginaAtualGames = pagina;
}

// Atualizar paginação de jogos
function atualizarPaginacaoGames(tab, paginaAtual) {
    const container = document.getElementById('pagination');
    if (!container) return;

    let totalPaginas = 0;
    if (tab === 'meus') {
        totalPaginas = Math.ceil(jogosFavoritos.length / itensPorPaginaGames);
    } else {
        totalPaginas = Math.ceil(jogosFiltrados.length / itensPorPaginaGames);
    }

    let html = '';

    // Botão anterior
    if (paginaAtual > 1) {
        html += `<button onclick="carregarJogos('${tab}', ${paginaAtual - 1})"><i class="fas fa-chevron-left"></i></button>`;
    }

    // Números das páginas
    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button ${i === paginaAtual ? 'class="active"' : ''} onclick="carregarJogos('${tab}', ${i})">${i}</button>`;
    }

    // Botão próximo
    if (paginaAtual < totalPaginas) {
        html += `<button onclick="carregarJogos('${tab}', ${paginaAtual + 1})"><i class="fas fa-chevron-right"></i></button>`;
    }

    container.innerHTML = html;
}

// Aplicar filtros de jogos
function aplicarFiltrosJogos() {
    const filterGenero = document.getElementById('filterGenero').value;
    const filterPlataforma = document.getElementById('filterPlataforma').value;
    const searchTerm = document.getElementById('searchGames').value.toLowerCase();

    jogosFiltrados = jogosSimulados.filter(jogo => {
        const matchGenero = !filterGenero || jogo.genero === filterGenero;
        const matchPlataforma = !filterPlataforma || jogo.plataforma.includes(filterPlataforma);
        const matchSearch = !searchTerm || jogo.nome.toLowerCase().includes(searchTerm);

        return matchGenero && matchPlataforma && matchSearch;
    });

    carregarJogos('disponíveis', 1);
}

// Limpar filtros de jogos
function limparFiltrosJogos() {
    document.getElementById('filterGenero').value = '';
    document.getElementById('filterPlataforma').value = '';
    document.getElementById('searchGames').value = '';
    jogosFiltrados = [...jogosSimulados];
    carregarJogos('disponíveis', 1);
}

// Abrir detalhes do jogo
function abrirDetalhesJogo(jogoId) {
    const jogo = jogosSimulados.find(j => j.id === jogoId);
    if (!jogo) return;

    const gameDetail = document.getElementById('gameDetail');
    if (gameDetail) {
        const estaNoseFavoritos = jogosFavoritos.some(j => j.id === jogo.id);

        gameDetail.innerHTML = `
            <div class="game-detail">
                <div style="font-size: 80px; text-align: center; margin-bottom: 20px;">${jogo.icon}</div>
                <h2 style="text-align: center; margin-bottom: 10px; font-size: 28px;">${jogo.nome}</h2>
                <div style="text-align: center; margin-bottom: 20px;">
                    <span class="meta-tag">${jogo.genero}</span>
                    <span class="meta-tag" style="margin-left: 10px;">${jogo.plataforma}</span>
                </div>
                <p style="color: var(--text-muted); text-align: center; margin-bottom: 30px; font-size: 14px;">
                    Encontre jogadores que também jogam ${jogo.nome}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <button class="btn-neon" onclick="event.stopPropagation(); ${estaNoseFavoritos ? `removerJogoFavorito(${jogo.id})` : `adicionarJogoFavorito(${jogo.id})`}">
                        <i class="fas fa-star"></i> ${estaNoseFavoritos ? 'Remover' : 'Adicionar'}
                    </button>
                    <button class="btn-neon" style="background: rgba(0, 217, 255, 0.1); border: 1px solid var(--accent-blue); color: var(--accent-blue);" onclick="buscarJogadoresJogo(${jogo.id})">
                        <i class="fas fa-search"></i> Jogadores
                    </button>
                </div>
            </div>
        `;
    }

    abrirModal('gameModal');
}

// Adicionar jogo favorito
function adicionarJogoFavorito(jogoId) {
    const jogo = jogosSimulados.find(j => j.id === jogoId);
    if (jogo && !jogosFavoritos.some(j => j.id === jogoId)) {
        jogosFavoritos.push(jogo);
        mostrarMensagem(`${jogo.nome} foi adicionado aos favoritos!`, 'success');
        fecharModal('gameModal');
        carregarJogos('meus', 1);
    }
}

// Remover jogo favorito
function removerJogoFavorito(jogoId) {
    const jogo = jogosSimulados.find(j => j.id === jogoId);
    if (jogo) {
        jogosFavoritos = jogosFavoritos.filter(j => j.id !== jogoId);
        mostrarMensagem(`${jogo.nome} foi removido dos favoritos`, 'success');
        fecharModal('gameModal');
        carregarJogos('meus', 1);
    }
}

// Buscar jogadores que jogam este jogo
function buscarJogadoresJogo(jogoId) {
    const jogo = jogosSimulados.find(j => j.id === jogoId);
    if (jogo) {
        mostrarMensagem(`Buscando jogadores de ${jogo.nome}...`, 'success');
        fecharModal('gameModal');
        window.location.href = `jogadores.html?jogo=${jogo.nome}`;
    }
}

// Setup de tabs para jogos
function setupGamesTabs() {
    document.querySelectorAll('.games-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // Remove active de todos os botões
            document.querySelectorAll('.games-tabs .tab-btn').forEach(b => {
                b.classList.remove('active');
            });

            // Remove active de todos os conteúdos
            document.querySelectorAll('.games-content .tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Adiciona active
            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');

            // Carregar jogos do novo tab
            carregarJogos(tabName, 1);
        });
    });

    // Trigger trigger
    const triggerBtns = document.querySelectorAll('.tab-trigger');
    triggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = btn.getAttribute('data-tab');
            document.querySelector(`[data-tab="${tab}"]`).click();
        });
    });
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('myGames')) {
        setupGamesTabs();
        carregarJogos('meus', 1);

        // Event listeners dos filtros
        if (document.getElementById('filterGenero')) {
            document.getElementById('filterGenero').addEventListener('change', aplicarFiltrosJogos);
        }
        if (document.getElementById('filterPlataforma')) {
            document.getElementById('filterPlataforma').addEventListener('change', aplicarFiltrosJogos);
        }
        if (document.getElementById('searchGames')) {
            document.getElementById('searchGames').addEventListener('input', aplicarFiltrosJogos);
        }
        if (document.getElementById('clearFilters')) {
            document.getElementById('clearFilters').addEventListener('click', limparFiltrosJogos);
        }

        // Marcar o primeiro tab como ativo
        document.querySelector('.games-tabs .tab-btn').classList.add('active');
    }
});
