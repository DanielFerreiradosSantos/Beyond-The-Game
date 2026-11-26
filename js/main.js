
/* =====================================================
   1. IDENTIFICAÇÃO DA PÁGINA ATUAL
   ===================================================== */

// Identifica o nome do arquivo HTML aberto.
const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

// Verifica se a página está dentro da pasta pages.
const insidePagesFolder = window.location.pathname
    .toLowerCase()
    .includes("/pages/");

// Define o caminho correto dos arquivos de áudio.
const audioPath = insidePagesFolder
    ? "../assets/audio/"
    : "assets/audio/";


/* =====================================================
   2. CONFIGURAÇÃO DAS MÚSICAS
   ===================================================== */

// Define a música de cada página.
const pageMusic = {
    "index.html": "background-music.mp3",
    "menu.html": "background-music.mp3",

    "sobre.html": "sobre.mp3",
    "formacao.html": "formacao.mp3",
    "programacao.html": "programacao.mp3",
    "gamedev.html": "gamedev.mp3",
    "projetos.html": "projetos.mp3",
    "objetivos.html": "objetivos.mp3"
};

// Identifica o arquivo de música da página.
const musicFile = pageMusic[currentPage];

// Cria o objeto de áudio.
const backgroundMusic = musicFile
    ? new Audio(audioPath + musicFile)
    : null;

// Configura a música.
if (backgroundMusic) {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.15;
}


/* =====================================================
   3. CONTROLE GLOBAL DE PAUSA
   ===================================================== */

// Recupera o estado da música durante a navegação.
let musicPaused =
    sessionStorage.getItem("btg_music_paused") === "true";

// Salva o estado atual da música.
function saveMusicPausedState() {

    sessionStorage.setItem(
        "btg_music_paused",
        String(musicPaused)
    );

}


/* =====================================================
   4. SALVAMENTO DA POSIÇÃO DA MÚSICA
   ===================================================== */

// Index e menu compartilham a mesma posição.
// Cada página de conteúdo possui sua própria posição.
const musicStorageKey = musicFile === "background-music.mp3"
    ? "btg_music_background"
    : "btg_music_" + currentPage;

// Controla se a posição já foi restaurada.
let musicPositionRestored = false;

// Salva a posição atual da música.
function saveMusicPosition() {

    if (!backgroundMusic) return;

    // Evita sobrescrever uma posição salva com zero
    // antes de os metadados serem carregados.
    if (!musicPositionRestored) return;

    try {

        sessionStorage.setItem(
            musicStorageKey,
            String(backgroundMusic.currentTime)
        );

    } catch (error) {

        console.error(
            "Erro ao salvar a posição da música:",
            error
        );

    }

}

// Restaura a posição da música.
function restoreMusicPosition() {

    if (!backgroundMusic) return;

    // Evita executar a restauração mais de uma vez.
    if (musicPositionRestored) return;

    const savedPosition = sessionStorage.getItem(
        musicStorageKey
    );

    if (savedPosition !== null) {

        const position = Number(savedPosition);

        const duration = backgroundMusic.duration;

        if (
            Number.isFinite(position) &&
            Number.isFinite(duration) &&
            position >= 0 &&
            position < duration
        ) {

            backgroundMusic.currentTime = position;

        }

    }

    // Informa que a restauração foi concluída.
    musicPositionRestored = true;

    startBackgroundMusic();

}


/* =====================================================
   5. INICIALIZAÇÃO DA MÚSICA
   ===================================================== */

// Inicia a música respeitando o estado de pausa.
function startBackgroundMusic() {

    if (!backgroundMusic) return;

    // Aguarda a restauração da posição.
    if (!musicPositionRestored) return;

    // Não reproduz se a música estiver pausada.
    if (musicPaused) return;

    backgroundMusic.play().catch(error => {

        console.warn(
            "A reprodução aguarda uma interação do usuário.",
            error
        );

    });

}

// Aguarda os metadados para restaurar a posição.
if (backgroundMusic) {

    backgroundMusic.addEventListener(
        "loadedmetadata",
        restoreMusicPosition,
        { once: true }
    );

    // Verifica se os metadados já estão disponíveis.
    if (backgroundMusic.readyState >= 1) {

        restoreMusicPosition();

    }

}


/* =====================================================
   6. EFEITOS SONOROS
   ===================================================== */

// Som ao passar o cursor sobre os elementos.
const hoverSound = new Audio(
    audioPath + "menu-hover.wav"
);

hoverSound.volume = 0.60;

// Som ao selecionar uma opção.
const selectSound = new Audio(
    audioPath + "menu-select.wav"
);

selectSound.volume = 0.80;

// Reproduz o efeito de hover.
function playHoverSound() {

    hoverSound.pause();

    hoverSound.currentTime = 0;

    hoverSound.play().catch(error => {

        console.warn(
            "Erro no efeito de hover:",
            error
        );

    });

}


/* =====================================================
   7. DESBLOQUEIO DOS ÁUDIOS
   ===================================================== */

// Controla a primeira interação do usuário.
let audioUnlocked = false;

// Libera a reprodução dos áudios.
function unlockAudio() {

    if (audioUnlocked) return;

    audioUnlocked = true;

    startBackgroundMusic();

}

// Detecta a primeira interação.
document.addEventListener(
    "pointerdown",
    unlockAudio
);

document.addEventListener(
    "keydown",
    unlockAudio
);


/* =====================================================
   8. NAVEGAÇÃO ENTRE AS PÁGINAS
   ===================================================== */

// Impede múltiplas navegações simultâneas.
let navigationInProgress = false;

// Navega depois de reproduzir o efeito de seleção.
function navigateWithSound(destination) {

    if (navigationInProgress) return;

    if (!destination) return;

    navigationInProgress = true;

    // Salva a posição da música antes de sair.
    saveMusicPosition();

    // Reinicia o efeito de seleção.
    selectSound.pause();

    selectSound.currentTime = 0;

    let hasNavigated = false;

    let navigationTimer;

    // Executa a navegação uma única vez.
    function navigate() {

        if (hasNavigated) return;

        hasNavigated = true;

        clearTimeout(navigationTimer);

        selectSound.removeEventListener(
            "ended",
            navigate
        );

        window.location.href = destination;

    }

    // Aguarda o término do efeito sonoro.
    selectSound.addEventListener(
        "ended",
        navigate,
        { once: true }
    );

    // Inicia o efeito de seleção.
    selectSound.play().catch(error => {

        console.warn(
            "Erro no efeito de seleção:",
            error
        );

        navigate();

    });

    // Segurança caso o evento ended não aconteça.
    navigationTimer = setTimeout(
        navigate,
        3000
    );

}


/* =====================================================
   9. EFEITO HOVER NOS ELEMENTOS INTERATIVOS
   ===================================================== */

// Seleciona todos os links e botões.
const interactiveElements = document.querySelectorAll(
    "a, button"
);

// Adiciona o efeito sonoro.
interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        playHoverSound();

    });

});


/* =====================================================
   10. NAVEGAÇÃO DOS LINKS
   ===================================================== */

// Localiza os links da página.
const internalLinks = document.querySelectorAll(
    "a[href]"
);

// Configura a navegação dos links.
internalLinks.forEach(link => {

    link.addEventListener("click", event => {

        // Ignora cliques que não sejam do botão esquerdo.
        if (event.button !== 0) return;

        // Respeita links que abrem em outra aba.
        if (link.target === "_blank") return;

        // Respeita atalhos do navegador.
        if (
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.metaKey
        ) {
            return;
        }

        const destination = link.href;

        // Não intercepta links externos.
        if (
            new URL(destination).origin !==
            window.location.origin
        ) {
            return;
        }

        event.preventDefault();

        navigateWithSound(destination);

    });

});


/* =====================================================
   11. BOTÃO START
   ===================================================== */

// Localiza o botão START.
const startButton = document.querySelector(
    "#start-button"
);

// Configura o botão START.
if (startButton) {

    startButton.addEventListener("click", () => {

        const destination = startButton.dataset.nextPage;

        navigateWithSound(destination);

    });

}


/* =====================================================
   12. BOTÃO GLOBAL DE PAUSAR E CONTINUAR
   ===================================================== */

// Localiza o botão de controle da música.
const musicToggleButton = document.querySelector(
    "#music-toggle-button"
);

// Atualiza o texto e o estado acessível do botão.
function updateMusicButton() {

    if (!musicToggleButton) return;

    musicToggleButton.textContent = musicPaused
        ? "PLAY MUSIC"
        : "PAUSE MUSIC";

    musicToggleButton.setAttribute(
        "aria-pressed",
        String(musicPaused)
    );

}

// Configura o botão de música.
if (musicToggleButton && backgroundMusic) {

    updateMusicButton();

    musicToggleButton.addEventListener("click", () => {

        if (musicPaused) {

            // Retoma a música do ponto em que parou.
            musicPaused = false;

            saveMusicPausedState();

            // Respeita a restauração antes de reproduzir.
            startBackgroundMusic();

        } else {

            // Pausa a música.
            backgroundMusic.pause();

            musicPaused = true;

            saveMusicPosition();

            saveMusicPausedState();

        }

        updateMusicButton();

    });

}


/* =====================================================
   13. SALVAMENTO AO SAIR DA PÁGINA
   ===================================================== */

// Salva a posição e o estado da música ao sair.
window.addEventListener("pagehide", () => {

    saveMusicPosition();

    saveMusicPausedState();

});
