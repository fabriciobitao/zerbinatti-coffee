(function () {
  'use strict';

  const SUBMIT_URL = 'https://southamerica-east1-ninofaz-fb2b4.cloudfunctions.net/submitGrutaLead';

  const G_SPRITE = [
    "0011111111111100",
    "0122222222222210",
    "1233333333333321",
    "1234444444444321",
    "1234455555544321",
    "1234455000044321",
    "1234455000044321",
    "1234455000044321",
    "1234455000044321",
    "1234455000044321",
    "1234455005544321",
    "1234455555554321",
    "1234444444444321",
    "1233333333333321",
    "0122222222222210",
    "0011111111111100",
  ];
  const PALETTES = {
    dark:  ["transparent","#0f1a0a","#384818","#7c8a3c","#c4cc7c","#e8ecc4"],
    light: ["transparent","#0f1a0a","#0f1a0a","#384818","#7c8a3c","#c4cc7c"],
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const MODAL_HTML =
    '<div class="gruta-modal-overlay" id="grutaModal" role="dialog" aria-modal="true" aria-labelledby="grutaModalTitle">' +
      '<div class="gruta-modal">' +
        '<div class="gruta-modal-header">' +
          '// MADE BY GRUTA' +
          '<button class="gruta-modal-close" id="grutaClose" aria-label="Fechar">×</button>' +
        '</div>' +
        '<div id="grutaContent">' +
          '<h2 id="grutaModalTitle">Quer sites como esse?</h2>' +
          '<p class="intro">Manda sua mensagem que a gente retorna. Conta o que você precisa.</p>' +
          '<form class="gruta-form" id="grutaForm" novalidate>' +
            '<div class="field" data-field="nome">' +
              '<span class="field-label">Nome</span>' +
              '<input type="text" name="nome" maxlength="100" autocomplete="name">' +
              '<span class="field-error"></span>' +
            '</div>' +
            '<div class="field" data-field="email">' +
              '<span class="field-label">Email</span>' +
              '<input type="email" name="email" maxlength="200" autocomplete="email" inputmode="email">' +
              '<span class="field-error"></span>' +
            '</div>' +
            '<div class="field" data-field="celular">' +
              '<span class="field-label">Celular</span>' +
              '<input type="tel" name="celular" maxlength="20" autocomplete="tel" inputmode="numeric" placeholder="(35) 9 9999-9999">' +
              '<span class="field-error"></span>' +
            '</div>' +
            '<div class="field" data-field="mensagem">' +
              '<span class="field-label">O que você precisa?</span>' +
              '<textarea name="mensagem" maxlength="2000" rows="4"></textarea>' +
              '<span class="field-error"></span>' +
            '</div>' +
            '<input type="text" name="website" class="gruta-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">' +
            '<div class="gruta-error" id="grutaError"></div>' +
            '<button type="submit" class="gruta-submit" id="grutaSubmit">▶ ENVIAR</button>' +
          '</form>' +
        '</div>' +
        '<div id="grutaSuccess" class="gruta-success" style="display:none">' +
          '<div class="check">✓</div>' +
          '<h3>Muito obrigado!</h3>' +
          '<p>Recebemos sua mensagem. Em breve a gente entra em contato.</p>' +
        '</div>' +
      '</div>' +
    '</div>';

  function drawMark(canvas, theme) {
    const ctx = canvas.getContext("2d");
    const pal = PALETTES[theme] || PALETTES.dark;
    ctx.clearRect(0, 0, 16, 16);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const c = pal[+G_SPRITE[y][x]];
        if (c && c !== "transparent") {
          ctx.fillStyle = c;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }

  function setupBadge(badge) {
    const canvas = badge.querySelector(".gruta-mark");
    const text   = badge.querySelector(".gruta-text");
    if (!canvas || !text) return;
    const theme  = badge.getAttribute("data-theme") || "dark";
    drawMark(canvas, theme);
    const PHRASES = ["MADE BY GRUTA", "PRESS START"];
    const MAX = Math.max(...PHRASES.map(p => p.length));
    let phraseIdx = 0, i = 0, mode = "build", hovering = false, timer = null;
    function current() { return PHRASES[phraseIdx]; }
    function render() {
      if (hovering) {
        text.innerHTML = 'PRESS START<span class="gruta-cursor"></span>';
        return;
      }
      const ph = current();
      text.textContent = ph.slice(0, i).padEnd(MAX, " ");
    }
    function tick() {
      if (hovering) { timer = setTimeout(tick, 600); return; }
      if (mode === "build") {
        i++;
        if (i >= current().length) { mode = "hold"; timer = setTimeout(tick, 2200); render(); return; }
      } else if (mode === "hold") {
        mode = "erase";
      } else if (mode === "erase") {
        i--;
        if (i <= 0) {
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          mode = "build"; timer = setTimeout(tick, 600); render(); return;
        }
      }
      render();
      timer = setTimeout(tick, mode === "erase" ? 60 : 110);
    }
    badge.addEventListener("mouseenter", () => { hovering = true; render(); });
    badge.addEventListener("mouseleave", () => { hovering = false; render(); });
    render();
    timer = setTimeout(tick, 400);
  }

  function maskPhone(raw) {
    const d = (raw || '').replace(/\D/g, '').slice(0, 11);
    if (d.length === 0) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return '(' + d.slice(0,2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0,2) + ') ' + d.slice(2,6) + '-' + d.slice(6);
    return '(' + d.slice(0,2) + ') ' + d.slice(2,3) + ' ' + d.slice(3,7) + '-' + d.slice(7,11);
  }

  function validateField(name, value) {
    const v = (value || '').trim();
    if (name === 'nome') {
      if (v.length < 2) return 'Coloca pelo menos 2 letras.';
      if (v.length > 100) return 'Tá comprido demais.';
    }
    if (name === 'email') {
      if (!v) return 'Email obrigatório.';
      if (!EMAIL_RE.test(v)) return 'Email parece inválido.';
      if (v.length > 200) return 'Tá comprido demais.';
    }
    if (name === 'celular') {
      const digits = v.replace(/\D/g, '');
      if (digits.length === 0) return 'Celular obrigatório.';
      if (digits.length < 10) return 'Faltam dígitos. Ex: (35) 9 9999-9999';
      if (digits.length > 11) return 'Dígitos demais.';
    }
    if (name === 'mensagem') {
      if (v.length < 5) return 'Conta um pouco mais (mínimo 5 letras).';
      if (v.length > 2000) return 'Tá comprido demais.';
    }
    return null;
  }

  function setupModal() {
    if (document.getElementById('grutaModal')) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = MODAL_HTML;
    document.body.appendChild(wrapper.firstChild);

    const overlay = document.getElementById('grutaModal');
    const closeBtn = document.getElementById('grutaClose');
    const form = document.getElementById('grutaForm');
    const submitBtn = document.getElementById('grutaSubmit');
    const errorBox = document.getElementById('grutaError');
    const content = document.getElementById('grutaContent');
    const success = document.getElementById('grutaSuccess');

    function getField(name) { return form.querySelector('.field[data-field="' + name + '"]'); }
    function setFieldError(field, msg) {
      field.classList.add('invalid');
      field.querySelector('.field-error').textContent = msg;
    }
    function clearFieldError(field) {
      field.classList.remove('invalid');
      field.querySelector('.field-error').textContent = '';
    }

    const phoneInput = form.querySelector('input[name="celular"]');
    phoneInput.addEventListener('input', (e) => {
      e.target.value = maskPhone(e.target.value);
      clearFieldError(getField('celular'));
    });

    ['nome', 'email', 'celular', 'mensagem'].forEach((name) => {
      const field = getField(name);
      const input = field.querySelector('input, textarea');
      input.addEventListener('blur', () => {
        const err = validateField(name, input.value);
        if (err) setFieldError(field, err); else clearFieldError(field);
      });
      input.addEventListener('input', () => {
        if (field.classList.contains('invalid')) {
          const err = validateField(name, input.value);
          if (!err) clearFieldError(field);
        }
      });
    });

    function open() {
      overlay.classList.add('open');
      content.style.display = '';
      success.style.display = 'none';
      errorBox.classList.remove('show');
      ['nome','email','celular','mensagem'].forEach(n => clearFieldError(getField(n)));
      setTimeout(() => form.querySelector('input[name="nome"]')?.focus(), 100);
      document.body.style.overflow = 'hidden';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'gruta_modal_open' });
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      form.reset();
      ['nome','email','celular','mensagem'].forEach(n => clearFieldError(getField(n)));
    }

    document.querySelectorAll('.gruta-badge').forEach(b => {
      b.addEventListener('click', open);
      b.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.classList.remove('show');
      const fd = new FormData(form);
      if ((fd.get('website') || '').trim()) { close(); return; }

      const values = {
        nome: (fd.get('nome') || '').trim(),
        email: (fd.get('email') || '').trim().toLowerCase(),
        celular: (fd.get('celular') || '').trim(),
        mensagem: (fd.get('mensagem') || '').trim(),
      };

      let firstInvalid = null;
      for (const name of ['nome', 'email', 'celular', 'mensagem']) {
        const err = validateField(name, values[name]);
        const field = getField(name);
        if (err) {
          setFieldError(field, err);
          if (!firstInvalid) firstInvalid = field;
        } else {
          clearFieldError(field);
        }
      }
      if (firstInvalid) {
        firstInvalid.querySelector('input, textarea')?.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ ENVIANDO...';

      try {
        const r = await fetch(SUBMIT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, origem: location.host, website: '' }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.ok) {
          throw new Error(data.erro || 'HTTP ' + r.status);
        }
        content.style.display = 'none';
        success.style.display = '';
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'gruta_lead_submitted' });
      } catch (err) {
        errorBox.textContent = err.message && err.message !== 'Failed to fetch'
          ? err.message
          : 'Erro ao enviar. Tenta de novo em alguns segundos.';
        errorBox.classList.add('show');
        console.error(err);
        submitBtn.disabled = false;
        submitBtn.textContent = '▶ ENVIAR';
      }
    });
  }

  function boot() {
    document.querySelectorAll('.gruta-badge').forEach(setupBadge);
    setupModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
