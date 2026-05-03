/**
 * Notificações de Saques em Tempo Real
 * Adicionar no final do <body>, após os scripts existentes.
 * NÃO altera nenhum código existente.
 */
(function () {
  /* ── Dados fictícios ── */
  const nomes = [
    "Ana M.", "Carlos F.", "Beatriz S.", "João P.", "Mariana T.",
    "Luís C.", "Sofia R.", "Pedro A.", "Cláudia N.", "Miguel O.",
    "Inês V.", "Rui G.", "Daniela L.", "Tiago B.", "Fernanda K."
  ];

  const valores = [
    "12.500", "8.750", "25.000", "9.200", "15.000",
    "18.300", "10.100", "22.000", "8.500", "30.000",
    "11.000", "16.800", "9.800", "14.200", "20.000"
  ];

  /* ── Estilos injectados ── */
  const style = document.createElement("style");
  style.textContent = `
    #notif-container {
      position: absolute;
      bottom: 80px;
      left: 0;
      right: 0;
      z-index: 999;
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      padding: 0 14px;
      pointer-events: none;
    }

    .notif-toast {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(15, 15, 15, 0.92);
      border: 1px solid rgba(74, 222, 128, 0.3);
      border-left: 3px solid #22c55e;
      border-radius: 14px;
      padding: 10px 14px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      animation: slideInNotif 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards,
                 fadeOutNotif 0.4s ease forwards 4.6s;
      opacity: 0;
    }

    .notif-icon {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .notif-text { flex: 1; }

    .notif-name {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.78rem;
      color: #fff;
    }

    .notif-desc {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.55);
      margin-top: 1px;
    }

    .notif-value {
      font-family: 'Nunito', sans-serif;
      font-weight: 900;
      font-size: 0.82rem;
      color: #4ade80;
      white-space: nowrap;
    }

    .notif-time {
      font-size: 0.62rem;
      color: #555;
      margin-top: 2px;
      text-align: right;
    }

    @keyframes slideInNotif {
      from { opacity: 0; transform: translateY(16px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }

    @keyframes fadeOutNotif {
      from { opacity: 1; }
      to   { opacity: 0; transform: scale(0.96); }
    }
  `;
  document.head.appendChild(style);

  /* ── Container das notificações ── */
  const phone = document.querySelector(".phone");
  const container = document.createElement("div");
  container.id = "notif-container";
  phone.appendChild(container);

  /* ── Função de exibição ── */
  function showNotif() {
    const nome  = nomes [Math.floor(Math.random() * nomes.length)];
    const valor = valores[Math.floor(Math.random() * valores.length)];
    const agora = new Date();
    const hora  = agora.toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" });

    const toast = document.createElement("div");
    toast.className = "notif-toast";
    toast.innerHTML = `
      <div class="notif-icon">💸</div>
      <div class="notif-text">
        <div class="notif-name">${nome} acabou de sacar</div>
        <div class="notif-desc">Levantamento processado com sucesso</div>
      </div>
      <div>
        <div class="notif-value">${valor} Kzs</div>
        <div class="notif-time">${hora}</div>
      </div>
    `;

    container.prepend(toast);

    /* Remove do DOM após a animação terminar (5s) */
    setTimeout(() => {
      toast.remove();
    }, 5000);

    /* Limita a 3 notificações visíveis ao mesmo tempo */
    const toasts = container.querySelectorAll(".notif-toast");
    if (toasts.length > 3) toasts[toasts.length - 1].remove();
  }

  /* ── Dispara a primeira após 2s e depois em intervalos aleatórios ── */
  function agendar() {
    const intervalo = Math.random() * 7000 + 5000; /* entre 5s e 12s */
    setTimeout(() => {
      showNotif();
      agendar();
    }, intervalo);
  }

  setTimeout(() => {
    showNotif();
    agendar();
  }, 2000);
})();