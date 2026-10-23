# 🌿 Portfólio Pessoal — Gabriel Custódio

Um site de portfólio moderno, tecnológico e minimalista para Gabriel Custódio, estudante de programação e desenvolvedor em formação, com identidade visual autoral em tons de **verde quase preto (`#101411`)**, **verde-lima (`#B5F36B`)** e **branco marfim suave (`#F4F2E9`)**.

Construído com **HTML5 semântico, CSS3 moderno e JavaScript puro**, garantindo alta performance, acessibilidade e facilidade total de edição sem necessidade de instalação de dependências complexas.

---

## 🚀 Como Executar o Projeto Localmente

Você pode abrir o projeto de duas formas:

### Opção 1: Diretamente no Navegador
- Basta dar dois cliques no arquivo `index.html` ou arrastá-lo para dentro do Google Chrome, Edge, Firefox ou Safari.

### Opção 2: Com Servidor Local (Recomendado)
Se tiver Python instalado:
```bash
python -m http.server 3000
```
Depois abra seu navegador em `http://localhost:3000`.

---

## 🎨 Guia de Personalização Passo a Passo

Todas as seções foram comentadas com etiquetas `<!-- EDITAR: ... -->` no arquivo `index.html`. Veja os principais pontos para personalizar:

### 1. Seu Nome e Apresentação
- Abra o `index.html`.
- Procure por `[SEU NOME]` e substitua pelo seu nome ou apelido profissional.
- Na **Seção 1 (Início)** e no código interativo do terminal (`perfil.js`), altere o texto com a sua bio resumida.

### 2. Sobre Você (Seção 2)
- Edite os cards de:
  - **Minha Jornada:** Adicione sua faculdade, curso técnico ou trajetória autodidata.
  - **Interesses:** Liste as áreas que mais te encantam na tecnologia.
  - **Objetivos de Carreira:** Especifique se está em busca de estágio ou vaga júnior.
  - **Em Aprendizado:** Mantenha atualizados os tópicos que está estudando no momento.

### 3. Habilidades Técnicas (Seção 3)
- Apresenta inicialmente **HTML5**, **CSS3 Moderno**, **JavaScript** e **Git & GitHub**.
- Para adicionar novas tecnologias (ex: React, Node.js, Python), basta duplicar um dos blocos `<article class="skill-card">` e preencher os dados.

### 4. Galeria de Projetos (Seção 4)
- Os projetos estão identificados como **"Projeto de Exemplo"**.
- Para colocar seu projeto real:
  1. Tire um print da sua tela e salve a imagem na pasta `assets/`.
  2. Altere o atributo `src` na tag `<img>` do cartão.
  3. Troque os botões `<button>` por links diretos `<a href="https://seu-deploy.com" target="_blank">Demonstração</a>` e `<a href="https://github.com/seu-repo" target="_blank">Código</a>`.

### 5. Contato & E-mail Real (Seção 5)
- Altere os links de contato direto (E-mail, GitHub, LinkedIn).
- Para fazer o formulário enviar e-mails reais para sua caixa de entrada gratuitamente:
  1. Crie uma conta no [Formspree](https://formspree.io).
  2. Adicione na tag `<form id="contactForm">`:
     ```html
     <form id="contactForm" action="https://formspree.io/f/SEU_ID_DO_FORMSPREE" method="POST">
     ```

---

## 🌐 Como Publicar seu Portfólio na Internet (Grátis)

### No GitHub Pages:
1. Crie um repositório no GitHub com o nome `meu-portifolio` (ou `seu-usuario.github.io`).
2. Suba todos os arquivos (`index.html`, `styles.css`, `script.js` e a pasta `assets`).
3. Vá em **Settings** > **Pages**.
4. Em **Branch**, selecione `main` (ou `master`) e salve.
5. Em instantes, seu site estará no ar com link público!

---

## ♿ Recursos de Acessibilidade e Design
- Suporte a tema escuro e tema claro com salvamento automático no navegador;
- Navegação completa por teclado com anéis de foco (`:focus-visible`);
- Respeito à preferência do sistema por movimento reduzido (`prefers-reduced-motion`);
- Contraste validado segundo as diretrizes WCAG AA;
- Totalmente responsivo para celulares, tablets e telas widescreen.
