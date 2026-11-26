# BEYOND THE GAME
### Projeto acadêmico — Ciência da Computação

---

## 1. SOBRE O PROJETO

Beyond the Game é um site pessoal com temática retrô, inspirado na estética e na experiência dos videogames clássicos.

O projeto reúne informações sobre minha trajetória acadêmica, meus estudos em programação e desenvolvimento de jogos, meus projetos e meus objetivos na área de tecnologia.

A proposta é apresentar esses conteúdos por meio de uma navegação inspirada em mundos e menus de jogos clássicos.

## 2. OBJETIVOS

- Apresentar minha trajetória e formação acadêmica.
- Compartilhar meus estudos e práticas de programação.
- Registrar meu interesse por desenvolvimento de jogos.
- Apresentar projetos e objetivos pessoais e acadêmicos.
- Explorar tecnologias web na construção de uma experiência interativa.

## 3. SEÇÕES DO SITE

O menu principal é organizado em oito opções:

- WORLD 01 — Sobre
- WORLD 02 — Formação
- WORLD 03 — Programação
- WORLD 04 — Game Development
- WORLD 05 — Projetos
- WORLD 06 — Objetivos
- WORLD 07 — Contatos
- WORLD 08 — Arcade

A seção Contatos apresenta os meios de contato em uma janela dentro do próprio menu.

A seção Arcade reúne uma biblioteca de jogos organizada por console e utiliza o EmulatorJS para executar jogos compatíveis diretamente no navegador.

## 4. TECNOLOGIAS UTILIZADAS

- HTML5
- CSS3
- JavaScript
- EmulatorJS
- Git e GitHub
- GitHub Pages

## 5. ORGANIZAÇÃO DO PROJETO

- `index.html` — Página inicial.
- `menu.html` — Menu principal.
- `pages/` — Páginas internas.
- `css/` — Folhas de estilo.
- `js/` — Scripts JavaScript.
- `assets/` — Imagens, fundos, sprites, áudio e vídeos.
- `emulatorjs/` — Arquivos do emulador.
- `roms/` — Biblioteca de jogos e catálogo.

O arquivo `roms/catalog.json` contém a relação dos jogos disponíveis para a página Arcade.

## 6. EXECUÇÃO LOCAL

Para testar o site localmente, utilize um servidor HTTP, como a extensão Live Server do Visual Studio Code.

Algumas funcionalidades, como a leitura do catálogo JSON por meio de `fetch()`, precisam de um servidor HTTP e não funcionam corretamente quando os arquivos são abertos diretamente pelo protocolo `file://`.

## 7. PUBLICAÇÃO

O projeto foi preparado para publicação como site estático por meio do GitHub Pages.

A configuração de publicação é realizada nas configurações do repositório, em:

`Settings > Pages > Deploy from a branch`

## 8. OBSERVAÇÕES

- Alguns recursos dependem do carregamento correto dos arquivos e dos caminhos relativos.
- O funcionamento do Arcade depende da compatibilidade dos jogos com o EmulatorJS e das condições de hospedagem.
- Devem ser publicados somente conteúdos que tenham autorização de distribuição.

---

**BEYOND THE GAME**

*Explore. Create. Play.*
