/* ============================================================
   Skins de card — 10 ativos + 10 inativos, para teste via painel.
   Cada skin(parts) => { wrap, content }:
     wrap    = overrides de estilo do container clicável
     content = elemento(s) internos
   O ItemCard cuida do clique, hover e do popover de comentários;
   as skins só desenham a aparência e a posição do conteúdo.
   "Pulsar" é a animação oficial do estado ativo no momento.
   ============================================================ */
const E = React.createElement;
const SKI = window.SOL_ICONS;
const SKD = window.SOL_DATA;

const BASE = {
  position: "relative",
  background: "var(--white)", borderRadius: 14, padding: "12px 13px",
  boxShadow: "var(--shadow-card)",
  display: "flex", flexDirection: "column", gap: 9, cursor: "pointer",
  transition: "box-shadow var(--dur-base) var(--ease-out)",
};

/* ---------- mini-builders ---------- */
function pill(pil, opts) {
  opts = opts || {};
  return E("span", { key: "pill", style: { display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 999, background: opts.solid ? pil.cor : pil.tint, color: opts.solid ? "#fff" : pil.cor, fontSize: 10.5, fontWeight: 700, letterSpacing: "-0.01em", flex: "0 0 auto", ...(opts.style || {}) } },
    !opts.solid && E("span", { style: { width: 5, height: 5, borderRadius: "50%", background: pil.cor } }), pil.rotulo);
}
function stage(StageIcon, opts) {
  opts = opts || {};
  return E("span", { key: "stage", title: opts.title, style: { width: opts.box || 22, height: opts.box || 22, borderRadius: opts.r || 7, background: opts.bg || "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, StageIcon({ size: opts.size || 13, color: opts.color || "var(--gray-500)" }));
}
function checkDot(opts) {
  opts = opts || {};
  const s = opts.size || 22;
  const rad = opts.square ? Math.round(s * 0.3) : "50%";
  return E("span", { key: "dot", "data-pulse": opts.pulse ? "1" : undefined, style: { width: s, height: s, borderRadius: rad, flex: "0 0 auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: opts.bg || "var(--success)", animation: opts.glow ? "solPulseGlow 1.9s var(--ease-out) infinite" : undefined } },
    SKI.check({ size: Math.round(s * 0.58), color: opts.tick || "#fff", sw: 2.6 }),
    opts.pulse && E("span", { "data-pulse": "1", style: { position: "absolute", inset: 0, borderRadius: rad, animation: "solPulseRing 1.8s var(--ease-out) infinite", pointerEvents: "none" } })
  );
}
function ringDot(opts) {
  opts = opts || {};
  const s = opts.size || 22;
  return E("span", { key: "dot", style: { width: s, height: s, borderRadius: opts.square ? Math.round(s * 0.3) : "50%", flex: "0 0 auto", boxShadow: `inset 0 0 0 1.8px ${opts.color || "var(--gray-200)"}`, background: opts.bg || "transparent", display: "block" } });
}
function promise(text, opts) {
  opts = opts || {};
  return E("div", { key: "promise", style: { fontSize: opts.size || 13.5, fontWeight: opts.weight || 600, color: opts.color || "var(--ink)", lineHeight: 1.3, letterSpacing: "-0.02em", textWrap: "pretty", ...(opts.style || {}) } }, text);
}
function statusWord(word, color) {
  return null; // rótulo "Entregue / A entregar / Já tinha / Não tinha" removido a pedido
}
function footer(parts, opts) {
  opts = opts || {};
  return E("div", { key: "footer", style: { display: "flex", alignItems: "center", gap: 8, ...(opts.style || {}) } },
    statusWord(parts.statusWord, opts.statusColor),
    E("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 } }, parts.comment)
  );
}

/* ============================================================
   ATIVOS (done = true)
   ============================================================ */
const ACTIVE = [
  // 0 — Pulsar (oficial)
  { nome: "Pulsar", oficial: true, render: (p) => ({
    wrap: {},
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } },
        checkDot({ pulse: true }), stage(p.StageIcon, { title: "Etapa" }),
        E("span", { key: "imp", style: { fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, p.impactoLabel),
        p.item.critico && E("span", { key: "crit", title: "Crítico", style: { display: "flex", color: "var(--brand-orange-deep)" } }, SKI.alert({ size: 12, color: "var(--brand-orange-deep)" })),
        E("span", { key: "sp", style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto),
      footer(p, { statusColor: "var(--success)" }),
    ],
  }) },
  // 1 — Selo (badge de canto)
  { nome: "Selo de canto", render: (p) => ({
    wrap: { overflow: "hidden", paddingTop: 16 },
    content: [
      E("span", { key: "ribbon", style: { position: "absolute", top: 0, right: 0, display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px 5px 13px", borderBottomLeftRadius: 13, background: "var(--grad-cta, var(--success))", color: "#fff", fontSize: 10.5, fontWeight: 800, letterSpacing: "-0.01em" } }, SKI.check({ size: 12, color: "#fff", sw: 3 }), "Entregue"),
      promise(p.item.texto, { size: 14.5, weight: 700, style: { marginTop: 4 } }),
      E("div", { key: "meta", style: { display: "flex", alignItems: "center", gap: 8 } }, stage(p.StageIcon, {}), pill(p.pil), E("div", { style: { marginLeft: "auto" } }, p.comment)),
    ],
  }) },
  // 2 — Faixa gradiente no topo
  { nome: "Faixa gradiente", render: (p) => ({
    wrap: { paddingTop: 0, overflow: "hidden" },
    content: [
      E("div", { key: "bar", style: { height: 4, margin: "0 -13px 11px", background: "var(--grad-brand)" } }),
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, checkDot({ size: 20 }), pill(p.pil), E("span", { style: { marginLeft: "auto", fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, p.impactoLabel)),
      promise(p.item.texto),
      footer(p, { statusColor: "var(--success)" }),
    ],
  }) },
  // 3 — Mint sólido
  { nome: "Mint sólido", render: (p) => ({
    wrap: { background: "var(--tint-mint)", boxShadow: "none" },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, checkDot({}), stage(p.StageIcon, { bg: "rgba(255,255,255,0.6)" }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil, { solid: true }))),
      promise(p.item.texto),
      footer(p, { statusColor: "var(--success)" }),
    ],
  }) },
  // 4 — Barra de progresso
  { nome: "Progresso 100%", render: (p) => ({
    wrap: {},
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, stage(p.StageIcon, {}), pill(p.pil), E("div", { style: { marginLeft: "auto" } }, p.comment)),
      promise(p.item.texto),
      E("div", { key: "bar", style: { display: "flex", alignItems: "center", gap: 9 } },
        E("div", { style: { flex: 1, height: 7, borderRadius: 999, background: "var(--gray-100)", overflow: "hidden" } }, E("div", { style: { width: "100%", height: "100%", borderRadius: 999, background: "var(--success)" } })),
        E("span", { style: { display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 800, color: "var(--success)" } }, SKI.check({ size: 13, color: "var(--success)", sw: 3 }), "100%")),
    ],
  }) },
  // 5 — Compacto
  { nome: "Compacto", render: (p) => ({
    wrap: { padding: "10px 12px", gap: 6, flexDirection: "row", alignItems: "center" },
    content: [
      checkDot({ size: 20 }),
      E("div", { key: "txt", style: { flex: 1, minWidth: 0 } }, promise(p.item.texto, { size: 13 })),
      E("span", { key: "pdot", title: p.pil.rotulo, style: { width: 8, height: 8, borderRadius: "50%", background: p.pil.cor, flex: "0 0 auto" } }),
      p.comment,
    ],
  }) },
  // 6 — Ícone grande
  { nome: "Ícone grande", render: (p) => ({
    wrap: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
    content: [
      checkDot({ size: 40, glow: true }),
      E("div", { key: "col", style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 } },
        E("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, pill(p.pil), E("span", { style: { marginLeft: "auto", fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, p.impactoLabel)),
        promise(p.item.texto),
        footer(p, { statusColor: "var(--success)" })),
    ],
  }) },
  // 7 — Glass
  { nome: "Glass", render: (p) => ({
    wrap: { background: "var(--glass-white, rgba(255,255,255,0.7))", backdropFilter: "var(--blur-glass, blur(16px))", WebkitBackdropFilter: "var(--blur-glass, blur(16px))", boxShadow: "var(--shadow-card), var(--ring-hairline, inset 0 0 0 1px rgba(255,255,255,0.5))" },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, checkDot({ glow: true }), stage(p.StageIcon, { bg: "rgba(255,255,255,0.55)" }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto),
      footer(p, { statusColor: "var(--success)" }),
    ],
  }) },
  // 8 — Ink invertido
  { nome: "Ink invertido", render: (p) => ({
    wrap: { background: "var(--ink)", boxShadow: "var(--shadow-md, 0 10px 30px rgba(21,21,21,0.18))" },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, checkDot({ bg: "var(--success-bright)", tick: "#0b2b12" }), stage(p.StageIcon, { bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil, { solid: true }))),
      promise(p.item.texto, { color: "#fff" }),
      E("div", { key: "ft", style: { display: "flex", alignItems: "center", gap: 8 } }, statusWord(p.statusWord, "var(--success-bright)"), E("div", { style: { marginLeft: "auto" } }, p.comment)),
    ],
  }) },
  // 9 — Etiqueta lateral
  { nome: "Etiqueta lateral", render: (p) => ({
    wrap: { flexDirection: "row", gap: 0, padding: 0, overflow: "hidden" },
    content: [
      E("div", { key: "side", style: { width: 44, flex: "0 0 auto", background: p.pil.tint, display: "flex", alignItems: "center", justifyContent: "center" } }, checkDot({ size: 24, bg: p.pil.cor })),
      E("div", { key: "body", style: { flex: 1, minWidth: 0, padding: "12px 13px", display: "flex", flexDirection: "column", gap: 8 } },
        E("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, pill(p.pil), E("span", { style: { marginLeft: "auto", fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, p.impactoLabel)),
        promise(p.item.texto),
        footer(p, { statusColor: "var(--success)" })),
    ],
  }) },
];

/* ============================================================
   INATIVOS (done = false)
   ============================================================ */
function faltaSlot(p) { return p.falta ? E("div", { key: "falta", style: { marginTop: 1 } }, p.falta) : null; }

const INACTIVE = [
  // 0 — Esmaecido (oficial atual)
  { nome: "Esmaecido", oficial: true, render: (p) => ({
    wrap: {},
    content: [
      E("div", { key: "inner", style: { display: "flex", flexDirection: "column", gap: 9, opacity: 0.5 } },
        E("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, ringDot({}), stage(p.StageIcon, {}),
          E("span", { style: { fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, p.impactoLabel),
          p.item.critico && E("span", { title: "Crítico", style: { display: "flex", color: "var(--brand-orange-deep)" } }, SKI.alert({ size: 12, color: "var(--brand-orange-deep)" })),
          E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
        promise(p.item.texto),
        E("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, statusWord(p.statusWord), E("div", { style: { marginLeft: "auto" } }, p.comment))),
      faltaSlot(p),
    ],
  }) },
  // 1 — Tracejado
  { nome: "Tracejado", render: (p) => ({
    wrap: { background: "transparent", boxShadow: "inset 0 0 0 1.5px var(--gray-200)", borderRadius: 14 },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, ringDot({}), stage(p.StageIcon, { bg: "transparent" }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto, { color: "var(--gray-600)" }),
      E("div", { key: "ft", style: { display: "flex", alignItems: "center", gap: 8 } }, statusWord(p.statusWord), E("div", { style: { marginLeft: "auto" } }, p.comment)),
      faltaSlot(p),
    ],
  }) },
  // 2 — Cinza
  { nome: "Cinza", render: (p) => ({
    wrap: { background: "var(--gray-100)", boxShadow: "none" },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, ringDot({ color: "var(--gray-300)" }), stage(p.StageIcon, { bg: "var(--white)" }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto, { color: "var(--gray-600)" }),
      E("div", { key: "ft", style: { display: "flex", alignItems: "center", gap: 8 } }, statusWord(p.statusWord, "var(--gray-500)"), E("div", { style: { marginLeft: "auto" } }, p.comment)),
      faltaSlot(p),
    ],
  }) },
  // 3 — Contorno do pilar
  { nome: "Contorno do pilar", render: (p) => ({
    wrap: { background: "var(--white)", boxShadow: `inset 0 0 0 1.5px ${p.pil.tint}` },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, ringDot({ color: p.pil.cor }), stage(p.StageIcon, { bg: p.pil.tint, color: p.pil.cor }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto),
      E("div", { key: "ft", style: { display: "flex", alignItems: "center", gap: 8 } }, statusWord(p.statusWord, p.pil.cor), E("div", { style: { marginLeft: "auto" } }, p.comment)),
      faltaSlot(p),
    ],
  }) },
  // 4 — Faixa pendente
  { nome: "Faixa pendente", render: (p) => ({
    wrap: { paddingTop: 0, overflow: "hidden" },
    content: [
      E("div", { key: "strip", style: { display: "flex", alignItems: "center", gap: 6, margin: "0 -13px 10px", padding: "6px 13px", background: "var(--tint-peach)", color: "var(--brand-orange-deep)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" } }, SKI.alert({ size: 12, color: "var(--brand-orange-deep)" }), "Pendente"),
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, ringDot({}), stage(p.StageIcon, {}), E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto),
      footer(p),
      faltaSlot(p),
    ],
  }) },
  // 5 — Compacto pendente
  { nome: "Compacto", render: (p) => ({
    wrap: { padding: "10px 12px", gap: 6, flexDirection: "row", alignItems: "center" },
    content: [
      ringDot({ size: 20 }),
      E("div", { key: "txt", style: { flex: 1, minWidth: 0 } }, promise(p.item.texto, { size: 13, color: "var(--gray-600)" })),
      E("span", { key: "pdot", title: p.pil.rotulo, style: { width: 8, height: 8, borderRadius: "50%", background: p.pil.cor, opacity: 0.5, flex: "0 0 auto" } }),
      p.comment,
    ],
  }) },
  // 6 — Etapa em foco
  { nome: "Etapa em foco", render: (p) => ({
    wrap: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
    content: [
      stage(p.StageIcon, { box: 40, r: 12, size: 20, bg: "var(--gray-100)", color: "var(--gray-300)" }),
      E("div", { key: "col", style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 } },
        E("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, pill(p.pil), E("span", { style: { marginLeft: "auto" } }, ringDot({ size: 18 }))),
        promise(p.item.texto, { color: "var(--gray-600)" }),
        footer(p),
        faltaSlot(p)),
    ],
  }) },
  // 7 — Checkbox quadrado
  { nome: "Checkbox", render: (p) => ({
    wrap: {},
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "flex-start", gap: 10 } },
        ringDot({ square: true, size: 20 }),
        E("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 } },
          promise(p.item.texto, { color: "var(--gray-600)" }),
          E("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, pill(p.pil), statusWord(p.statusWord), E("div", { style: { marginLeft: "auto" } }, p.comment)))),
      faltaSlot(p),
    ],
  }) },
  // 8 — Recuado (inset)
  { nome: "Recuado", render: (p) => ({
    wrap: { background: "var(--gray-100)", boxShadow: "inset 0 1px 4px rgba(21,21,21,0.08)" },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 8 } }, ringDot({ bg: "var(--white)" }), stage(p.StageIcon, { bg: "var(--white)" }), E("span", { style: { marginLeft: "auto" } }, pill(p.pil))),
      promise(p.item.texto, { color: "var(--gray-600)" }),
      footer(p, { statusColor: "var(--gray-500)" }),
      faltaSlot(p),
    ],
  }) },
  // 9 — Minimal
  { nome: "Minimal", render: (p) => ({
    wrap: { background: "transparent", boxShadow: "none", padding: "9px 6px", borderRadius: 8 },
    content: [
      E("div", { key: "h", style: { display: "flex", alignItems: "center", gap: 9 } },
        ringDot({ size: 18 }),
        E("div", { style: { flex: 1, minWidth: 0 } }, promise(p.item.texto, { size: 13, weight: 500, color: "var(--gray-600)" })),
        E("span", { key: "pdot", title: p.pil.rotulo, style: { width: 7, height: 7, borderRadius: "50%", background: p.pil.cor, opacity: 0.6, flex: "0 0 auto" } }),
        p.comment),
      faltaSlot(p),
    ],
  }) },
];

/* ---------- preview estático para o painel ---------- */
const SAMPLE = { id: "preview", texto: "Galeria de fotos autorais", pilar: "verdade", etapa: "avaliacao", impacto: "alto", critico: false };
function previewParts(done, mode) {
  const pil = SKD.PILARES[SAMPLE.pilar];
  const comment = E("span", { key: "comment", style: { width: 24, height: 24, borderRadius: 8, background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, SKI.message({ size: 13, color: "var(--gray-400)" }));
  return { item: SAMPLE, mode, done, pil, StageIcon: SKI[SAMPLE.etapa], impactoLabel: "Alto", statusWord: done ? "Entregue" : "A fazer", comment, falta: null };
}
function previewSkin(kind, idx) {
  const done = kind === "ativo";
  const list = done ? ACTIVE : INACTIVE;
  const def = list[idx] || list[0];
  const parts = previewParts(done, "com");
  const { wrap, content } = def.render(parts);
  return E("div", { style: { ...BASE, ...wrap, cursor: "default" } }, content);
}

window.SOL_SKINS = {
  CTX: React.createContext({ ativo: 0, inativo: 0 }),
  BASE, ACTIVE, INACTIVE, previewSkin,
};
