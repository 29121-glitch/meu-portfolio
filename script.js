/**
 * ==========================================================================
 * PORTFÓLIO PESSOAL — LÓGICA E INTERATIVIDADE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GERENCIAMENTO DE TEMA (ESCURO / CLARO)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Recupera o tema salvo ou usa a preferência do sistema
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'
      );
      themeToggleBtn.setAttribute(
        'title',
        isDark ? 'Ativar tema claro' : 'Ativar tema escuro'
      );
    }
  }

  // --------------------------------------------------------------------------
  // 2. MENU MOBILE (HAMBÚRGUER) & ACESSIBILIDADE
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      toggleMobileMenu(!isExpanded);
    });

    // Fechar ao clicar em qualquer link do menu
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          toggleMobileMenu(false);
        }
      });
    });

    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMobileMenu(false);
        mobileMenuBtn.focus();
      }
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        toggleMobileMenu(false);
      }
    });
  }

  function toggleMobileMenu(open) {
    if (!mobileMenuBtn || !navMenu) return;
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
    mobileMenuBtn.classList.toggle('is-active', open);
    navMenu.classList.toggle('is-open', open);

    if (open) {
      document.body.style.overflow = 'hidden'; // Evita scroll do fundo
    } else {
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // 3. SCROLLSPY (DESTAQUE DA SEÇÃO ATIVA NA NAVBAR)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 4. ANIMAÇÕES DE REVEAL AO ROLAR (SCROLL REVEAL)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antigos
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 5. BOTÃO VOLTAR AO TOPO
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    let isTicking = false;

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
          isTicking = false;
        });
        isTicking = true;
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. MODAL INFORMATIVO DE PROJETOS DEMONSTRATIVOS
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalUnderstandBtn = document.getElementById('modalUnderstandBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');

  const demoButtons = document.querySelectorAll('.btn-demo, .btn-code');

  demoButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Projeto';
      const action = btn.getAttribute('data-action') === 'code' ? 'Código-fonte' : 'Demonstração ao vivo';

      if (modalTitle) {
        modalTitle.textContent = `${action}: ${title}`;
      }
      if (modalDescription) {
        modalDescription.innerHTML = `Este é um <strong>projeto de exemplo</strong> para ilustrar seu portfólio. Quando você tiver seu repositório ou página real pronta, basta substituir este botão pelo link direto no arquivo <code>index.html</code>.`;
      }

      if (projectModal && typeof projectModal.showModal === 'function') {
        projectModal.showModal();
      } else {
        alert(`${action} de "${title}": Este é um projeto de demonstração. Substitua pelo link real no seu index.html.`);
      }
    });
  });

  function closeModal() {
    if (projectModal && typeof projectModal.close === 'function') {
      projectModal.close();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalUnderstandBtn) modalUnderstandBtn.addEventListener('click', closeModal);

  // Fechar ao clicar no backdrop do modal
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    // Validação ao perder o foco (blur)
    if (nomeInput) nomeInput.addEventListener('blur', () => validateNome(nomeInput));
    if (emailInput) emailInput.addEventListener('blur', () => validateEmail(emailInput));
    if (mensagemInput) mensagemInput.addEventListener('blur', () => validateMensagem(mensagemInput));

    // Limpar estado de erro ao digitar
    [nomeInput, emailInput, mensagemInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          clearError(input);
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNomeValid = validateNome(nomeInput);
      const isEmailValid = validateEmail(emailInput);
      const isMensagemValid = validateMensagem(mensagemInput);

      if (isNomeValid && isEmailValid && isMensagemValid) {
        // Validação bem-sucedida
        const nomeValor = nomeInput.value.trim();

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <strong>Obrigado, ${escapeHtml(nomeValor)}!</strong> Sua mensagem foi validada com sucesso pelo navegador. 
            <br><small>Como este portfólio não possui servidor backend ativo no momento, para receber mensagens reais configure o <strong>Formspree</strong> ou envie diretamente para o e-mail listado ao lado.</small>
          `;
        }

        contactForm.reset();
        [nomeInput, emailInput, mensagemInput].forEach(clearError);
      } else {
        // Exibe mensagem de erro geral e foca no primeiro campo inválido
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Por favor, corrija os campos destacados em vermelho antes de enviar.';
        }

        if (!isNomeValid && nomeInput) {
          nomeInput.focus();
        } else if (!isEmailValid && emailInput) {
          emailInput.focus();
        } else if (!isMensagemValid && mensagemInput) {
          mensagemInput.focus();
        }
      }
    });
  }

  function validateNome(input) {
    if (!input) return false;
    const value = input.value.trim();
    const errorEl = document.getElementById('nome-error');

    if (!value) {
      showError(input, errorEl, 'Por favor, informe seu nome.');
      return false;
    }
    if (value.length < 3) {
      showError(input, errorEl, 'O nome deve ter pelo menos 3 caracteres.');
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function validateEmail(input) {
    if (!input) return false;
    const value = input.value.trim();
    const errorEl = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      showError(input, errorEl, 'Por favor, informe seu e-mail.');
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(input, errorEl, 'Insira um endereço de e-mail válido (ex: seu@email.com).');
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function validateMensagem(input) {
    if (!input) return false;
    const value = input.value.trim();
    const errorEl = document.getElementById('mensagem-error');

    if (!value) {
      showError(input, errorEl, 'Por favor, escreva sua mensagem.');
      return false;
    }
    if (value.length < 10) {
      showError(input, errorEl, 'A mensagem deve ter pelo menos 10 caracteres.');
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function showError(input, errorEl, message) {
    input.classList.add('is-invalid');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('active');
    }
  }

  function clearError(input, errorEl) {
    if (!input) return;
    input.classList.remove('is-invalid');
    const err = errorEl || document.getElementById(`${input.id}-error`);
    if (err) {
      err.textContent = '';
      err.classList.remove('active');
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // --------------------------------------------------------------------------
  // 8. ATUALIZAR ANO DO FOOTER DINAMICAMENTE
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
