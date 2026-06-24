/* ============================================
   Players.js - Lógica da página de Jogadores
   ============================================ */

let jogadoresFiltrados = [...jogadoresSimulados];
let paginaAtual = 1;
const itensPorPagina = 12;

// Carregar jogadores
function carregarJogadores(pagina = 1) {
    const container = document.getElementById('playersGrid');
    if (!container) return;

    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const jogadoresPagina = jogadoresFiltrados.slice(inicio, fim);

    if (jogadoresPagina.length === 0) {
        container.innerHTML = '';
        document.getElementById('noResults').style.display = 'block';
        return;
    }

    document.getElementById('noResults').style.display = 'none';

    container.innerHTML = jogadoresPagina.map(jogador => `
        <div class="player-card" onclick="abrirDetalhesJogador(${jogador.id})">
            <div class="player-avatar">${jogador.foto}</div>
            <div class="player-info">
                <h3 class="player-name">${jogador.nome}</h3>
                <p class="player-status">${jogador.online ? 'Online' : 'Offline'}</p>
                <div class="player-details">
                    <p><i class="fas fa-star"></i> ${jogador.rank}</p>
                    <p><i class="fas fa-desktop"></i> ${jogador.plataforma}</p>
                </div>
                <div class="player-actions">
                    <button class="btn-icon" onclick="event.stopPropagation(); criarMatch(${jogador.id})" title="Fazer Match">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="btn-icon" onclick="event.stopPropagation(); verPerfil(${jogador.id})" title="Ver Perfil">
                        <i class="fas fa-user"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    atualizarPaginacao(pagina);
    paginaAtual = pagina;
}

// Atualizar paginação
function atualizarPaginacao(paginaAtual) {
    const container = document.getElementById('pagination');
    if (!container) return;

    const totalPaginas = Math.ceil(jogadoresFiltrados.length / itensPorPagina);
    let html = '';

    // Botão anterior
    if (paginaAtual > 1) {
        html += `<button onclick="carregarJogadores(${paginaAtual - 1})"><i class="fas fa-chevron-left"></i></button>`;
    }

    // Números das páginas
    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button ${i === paginaAtual ? 'class="active"' : ''} onclick="carregarJogadores(${i})">${i}</button>`;
    }

    // Botão próximo
    if (paginaAtual < totalPaginas) {
        html += `<button onclick="carregarJogadores(${paginaAtual + 1})"><i class="fas fa-chevron-right"></i></button>`;
    }

    container.innerHTML = html;
}

// Aplicar filtros
function aplicarFiltros() {
    const filterJogo = document.getElementById('filterJogo').value;
    const filterRank = document.getElementById('filterRank').value;
    const filterPlataforma = document.getElementById('filterPlataforma').value;
    const searchTerm = document.getElementById('searchPlayers').value.toLowerCase();

    jogadoresFiltrados = jogadoresSimulados.filter(jogador => {
        const matchJogo = !filterJogo || jogador.jogos.some(j => j.toLowerCase().includes(filterJogo.toLowerCase()));
        const matchRank = !filterRank || jogador.rank === filterRank;
        const matchPlataforma = !filterPlataforma || jogador.plataforma === filterPlataforma;
        const matchSearch = !searchTerm || 
            jogador.nome.toLowerCase().includes(searchTerm) ||
            jogador.nickname.toLowerCase().includes(searchTerm);

        return matchJogo && matchRank && matchPlataforma && matchSearch;
    });

    carregarJogadores(1);
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('filterJogo').value = '';
    document.getElementById('filterRank').value = '';
    document.getElementById('filterPlataforma').value = '';
    document.getElementById('searchPlayers').value = '';
    jogadoresFiltrados = [...jogadoresSimulados];
    carregarJogadores(1);
}

// Preencher select de jogos
function preencherSelectJogos() {
    const select = document.getElementById('filterJogo');
    const jogosUnicos = [...new Set(jogadoresSimulados.flatMap(j => j.jogos))];
    
    jogosUnicos.forEach(jogo => {
        const option = document.createElement('option');
        option.value = jogo;
        option.textContent = jogo;
        select.appendChild(option);
    });
}

// Ordenar jogadores
function ordenarJogadores(tipo) {
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (tipo === 'recente') {
        jogadoresFiltrados.sort((a, b) => b.id - a.id);
    } else if (tipo === 'compatibilidade') {
        // Simular compatibilidade
        jogadoresFiltrados.sort((a, b) => b.matches - a.matches);
    } else if (tipo === 'online') {
        jogadoresFiltrados.sort((a, b) => b.online - a.online);
    }

    carregarJogadores(1);
}

// Abrir detalhes do jogador
function abrirDetalhesJogador(jogadorId) {
    const jogador = jogadoresSimulados.find(j => j.id === jogadorId);
    if (!jogador) return;

    const playerDetail = document.getElementById('playerDetail');
    if (playerDetail) {
        playerDetail.innerHTML = `
            <div class="player-detail">
                <div class="player-detail-avatar">${jogador.foto}</div>
                <h2 class="player-detail-name">${jogador.nome}</h2>
                <p class="player-detail-nickname">@${jogador.nickname}</p>

                <div class="player-detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-label">Rank</div>
                        <div class="detail-stat-value">${jogador.rank}</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-label">Plataforma</div>
                        <div class="detail-stat-value">${jogador.plataforma}</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-label">Matches</div>
                        <div class="detail-stat-value">${jogador.matches}</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-label">Status</div>
                        <div class="detail-stat-value" style="color: ${jogador.online ? 'var(--success)' : 'var(--text-muted)'}">
                            ${jogador.online ? 'Online' : 'Offline'}
                        </div>
                    </div>
                </div>

                <div class="player-detail-games">
                    <h4>Jogos Favoritos</h4>
                    <div class="games-list-detail">
                        ${jogador.jogos.map(jogo => `<span class="game-tag">${jogo}</span>`).join('')}
                    </div>
                </div>

                <div class="player-detail-actions">
                    <button class="btn-match" onclick="criarMatch(${jogador.id})">
                        <i class="fas fa-heart"></i> Fazer Match
                    </button>
                    <button class="btn-pass">
                        <i class="fas fa-times"></i> Passar
                    </button>
                </div>
            </div>
        `;
    }

    abrirModal('playerModal');
}

// Criar novo match
function criarMatch(jogadorId) {
    const jogador = jogadoresSimulados.find(j => j.id === jogadorId);
    if (jogador) {
        mostrarMensagem(`Match criado com ${jogador.nome}!`, 'success');
        fecharModal('playerModal');
    }
}

// Ver perfil do jogador
function verPerfil(jogadorId) {
    window.location.href = `perfil.html?id=${jogadorId}`;
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('playersGrid')) {
        preencherSelectJogos();
        carregarJogadores(1);

        // Event listeners dos filtros
        document.getElementById('filterJogo').addEventListener('change', aplicarFiltros);
        document.getElementById('filterRank').addEventListener('change', aplicarFiltros);
        document.getElementById('filterPlataforma').addEventListener('change', aplicarFiltros);
        document.getElementById('searchPlayers').addEventListener('input', aplicarFiltros);
        document.getElementById('clearFilters').addEventListener('click', limparFiltros);

        // Event listeners dos sort buttons
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', () => ordenarJogadores(btn.getAttribute('data-sort')));
        });

        // Marcar o primeiro sort como ativo
        document.querySelector('.sort-btn').classList.add('active');
    }
});
