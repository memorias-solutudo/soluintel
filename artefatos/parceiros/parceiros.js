/* =============================================================
   Seletor de parceiros — fonte única da lista.
   Para adicionar um parceiro: um objeto em PARCEIROS. Nada mais.
   Usado pelo hub e por todas as centrais.
   ============================================================= */
(function () {
  "use strict";

  var PARCEIROS = [
    {
      pasta: "pizza-frita-semiao",
      nome: "Pizza Frita Semião",
      meta: "Botucatu/SP",
      estado: "completa"
    },
    {
      pasta: "porto-certo-consorcio",
      nome: "Porto Certo Consórcio",
      meta: "Araraquara/SP",
      estado: "completa"
    },
    {
      pasta: "ea3-engenharia",
      nome: "EA3 Engenharia",
      meta: "Avaré/SP",
      estado: "completa"
    },
    {
      pasta: "blocok-o-original",
      nome: "Blocok O Original",
      meta: "Pardinho e Avaré/SP",
      estado: "completa"
    }
  ];

  var ESTADO = {
    completa:    { rotulo: "Central completa", cor: "var(--tint-mint)",   tinta: "#06724F" },
    diagnostico: { rotulo: "Diagnóstico",      cor: "var(--tint-yellow)", tinta: "#7A5A00" }
  };

  var CSS = [
    ".pnav{position:relative;display:inline-flex;justify-self:end}",
    ".pnav-btn{display:inline-flex;align-items:center;gap:9px;border:var(--line);background:var(--white);",
      "border-radius:var(--pill);padding:7px 13px 7px 14px;font:inherit;font-weight:800;font-size:13px;",
      "letter-spacing:-.02em;color:var(--ink);cursor:pointer;max-width:260px}",
    ".pnav-btn:hover{border-color:rgba(21,21,21,.18)}",
    ".pnav-btn__t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
    ".pnav-btn__c{color:var(--g500);font-size:10px;transition:transform .16s ease}",
    ".pnav-btn[aria-expanded=\"true\"] .pnav-btn__c{transform:rotate(180deg)}",
    ".pnav-menu{position:absolute;top:calc(100% + 8px);right:0;z-index:120;min-width:296px;max-height:min(70vh,440px);",
      "overflow-y:auto;background:var(--white);border:var(--line);border-radius:var(--r-md);",
      "box-shadow:var(--shadow-md);padding:6px}",
    ".pnav-menu[hidden]{display:none}",
    ".pnav-all{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:11px;text-decoration:none;",
      "font-weight:800;font-size:13px;color:var(--brand-purple);letter-spacing:-.02em}",
    ".pnav-all:hover{background:var(--tint-lav)}",
    ".pnav-sep{height:1px;background:rgba(21,21,21,.07);margin:6px 4px}",
    ".pnav-i{display:grid;grid-template-columns:8px 1fr;align-items:start;gap:10px;padding:9px 12px;",
      "border-radius:11px;text-decoration:none;color:var(--ink)}",
    ".pnav-i:hover{background:var(--g100)}",
    ".pnav-i[aria-current=\"page\"]{background:var(--tint-lav)}",
    ".pnav-dot{width:8px;height:8px;border-radius:50%;margin-top:5px}",
    ".pnav-i__n{display:block;font-weight:700;font-size:13.4px;letter-spacing:-.02em;line-height:1.25}",
    ".pnav-i__m{display:flex;flex-wrap:wrap;align-items:center;gap:7px;font-weight:600;font-size:11.5px;",
      "color:var(--g500);margin-top:3px}",
    ".pnav-i__s{font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;",
      "padding:3px 8px;border-radius:var(--pill);white-space:nowrap}",
    "@media(max-width:940px){.pnav{justify-self:start}.pnav-menu{right:auto;left:0}}"
  ].join("");

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function monta(host) {
    var atual = host.getAttribute("data-atual") || "";
    var base = atual ? "../" : "";

    var itens = PARCEIROS.map(function (p) {
      var e = ESTADO[p.estado] || ESTADO.completa;
      return '<a class="pnav-i" href="' + esc(base + p.pasta) + '/"' +
        (p.pasta === atual ? ' aria-current="page"' : "") + ">" +
        '<span class="pnav-dot" style="background:' + esc(e.tinta) + '"></span>' +
        '<span><span class="pnav-i__n">' + esc(p.nome) + "</span>" +
        '<span class="pnav-i__m">' + esc(p.meta) +
        '<span class="pnav-i__s" style="background:' + esc(e.cor) + ";color:" + esc(e.tinta) + '">' +
        esc(e.rotulo) + "</span></span></span></a>";
    }).join("");

    var eu = null;
    for (var i = 0; i < PARCEIROS.length; i++) {
      if (PARCEIROS[i].pasta === atual) { eu = PARCEIROS[i]; break; }
    }
    var rotulo = eu ? eu.nome : "Todos os parceiros";

    host.className = "pnav";
    host.innerHTML =
      '<button type="button" class="pnav-btn" aria-expanded="false" aria-haspopup="true">' +
        '<span class="pnav-btn__t">' + esc(rotulo) + "</span>" +
        '<span class="pnav-btn__c" aria-hidden="true">▼</span>' +
      "</button>" +
      '<div class="pnav-menu" hidden>' +
        '<a class="pnav-all" href="' + esc(base || "./") + '"><span aria-hidden="true">←</span> Todos os parceiros</a>' +
        '<div class="pnav-sep"></div>' + itens +
      "</div>";

    var btn = host.querySelector(".pnav-btn");
    var menu = host.querySelector(".pnav-menu");

    function abre(v) {
      menu.hidden = !v;
      btn.setAttribute("aria-expanded", v ? "true" : "false");
    }
    btn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      abre(menu.hidden);
    });
    document.addEventListener("click", function (ev) {
      if (!host.contains(ev.target)) { abre(false); }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !menu.hidden) { abre(false); btn.focus(); }
    });
  }

  function init() {
    var host = document.getElementById("pnav");
    if (!host) { return; }
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);
    monta(host);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
