/* Item card — binary status (feito / a fazer). The WHOLE card is the
   toggle target: one click flips item.com. Unmarked cards dim to ~half
   opacity; marked cards show in full. Evidência NÃO é por item — cada
   produto tem um print geral Sem/Com no painel lateral.
   Comentários por item: botão discreto que surge no hover; painel para
   ver / editar / concluir / adicionar. Persiste em localStorage. */
const I2 = window.SOL_ICONS;
const D = window.SOL_DATA;
const SC = window.SOL_SCORE;

/* ---- store de comentários (localStorage) ---- */
const CKEY = "sol_comments_v1";
function loadAllComments() { try { return JSON.parse(localStorage.getItem(CKEY)) || {}; } catch (e) { return {}; } }
function loadComments(id) { return loadAllComments()[id] || []; }
function saveComments(id, list) {
  const all = loadAllComments();
  all[id] = list || []; // armazena sempre (inclusive vazio) p/ persistir remoções do comentário semeado
  try { localStorage.setItem(CKEY, JSON.stringify(all)); } catch (e) { /* ignore */ }
}
// Semeia "o que falta" como 1º comentário do item (até o usuário mexer).
function seedComments(item) {
  const all = loadAllComments();
  if (item.id in all) return all[item.id];
  if (item.acao) {
    const label = item.dono === "cliente" ? "Falta — insumo do cliente" : "Falta — ação nossa";
    return [{ id: "seed_" + item.id, texto: `${label}: ${item.acao}`, done: false, criadoEm: Date.now() }];
  }
  return [];
}
let _ck = 0;
const cuid = () => `c_${Date.now().toString(36)}_${(_ck++).toString(36)}`;
function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "agora";
  const m = Math.floor(s / 60); if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60); if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24); if (d < 7) return `há ${d} d`;
  return new Date(ts).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/* ---- painel de comentários (popover) ---- */
function CommentThread({ list, accent, onChange, onClose }) {
  const [draft, setDraft] = React.useState("");
  const [editId, setEditId] = React.useState(null);
  const [editText, setEditText] = React.useState("");
  const inputRef = React.useRef(null);
  const stop = (e) => e.stopPropagation();

  React.useEffect(() => { if (inputRef.current && !list.length) inputRef.current.focus(); }, []);

  const add = () => {
    const t = draft.trim(); if (!t) return;
    onChange([...list, { id: cuid(), texto: t, done: false, criadoEm: Date.now() }]);
    setDraft("");
  };
  const toggleDone = (id) => onChange(list.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  const remove = (id) => onChange(list.filter((c) => c.id !== id));
  const startEdit = (c) => { setEditId(c.id); setEditText(c.texto); };
  const commitEdit = () => {
    const t = editText.trim();
    onChange(list.map((c) => (c.id === editId ? { ...c, texto: t || c.texto, editadoEm: Date.now() } : c)));
    setEditId(null); setEditText("");
  };

  return React.createElement("div", {
    onClick: stop, onMouseDown: stop,
    style: {
      position: "absolute", left: "calc(100% + 10px)", bottom: 0, width: 280, zIndex: 30,
      background: "var(--white)", borderRadius: 16, boxShadow: "var(--shadow-lg, 0 18px 50px rgba(21,21,21,0.18)), var(--ring-hairline)",
      display: "flex", flexDirection: "column", overflow: "hidden", cursor: "default",
      animation: "ccPop var(--dur-base, .18s) var(--ease-out, ease) both",
    },
  },
    // header
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "11px 12px", borderBottom: "1px solid var(--gray-150)" } },
      React.createElement("span", { style: { display: "inline-flex", color: accent } }, I2.message({ size: 15, color: accent })),
      React.createElement("span", { style: { fontSize: 13, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)" } }, "Comentários"),
      list.length > 0 && React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--gray-400)" } }, list.length),
      React.createElement("button", { type: "button", onClick: onClose, title: "Fechar", style: { marginLeft: "auto", width: 26, height: 26, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)" } }, I2.x({ size: 15, color: "var(--gray-400)" }))
    ),
    // lista
    list.length > 0 && React.createElement("div", { style: { maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column" } },
      list.map((c) => React.createElement(CommentRow, {
        key: c.id, c, accent, editing: editId === c.id, editText, setEditText, commitEdit,
        onToggle: () => toggleDone(c.id), onEdit: () => startEdit(c), onDelete: () => remove(c.id), stop,
      }))
    ),
    list.length === 0 && React.createElement("div", { style: { padding: "16px 14px 6px", fontSize: 12.5, color: "var(--gray-400)", fontWeight: 500, lineHeight: 1.4 } }, "Sem comentários ainda. Deixe uma nota para quem fizer o processo."),
    // novo comentário
    React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 8, padding: 10, borderTop: list.length ? "1px solid var(--gray-150)" : "none" } },
      React.createElement("textarea", {
        ref: inputRef, value: draft, rows: 1, placeholder: "Escrever um comentário…",
        onChange: (e) => setDraft(e.target.value),
        onKeyDown: (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); add(); } },
        onInput: (e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px"; },
        style: { flex: 1, border: "none", outline: "none", background: "var(--gray-100)", borderRadius: 11, padding: "9px 11px", fontSize: 13, fontWeight: 500, lineHeight: 1.35, color: "var(--ink)", letterSpacing: "-0.01em", resize: "none", fontFamily: "inherit", overflow: "hidden" },
      }),
      React.createElement("button", {
        type: "button", onClick: add, disabled: !draft.trim(), title: "Adicionar (⌘/Ctrl+Enter)",
        style: { width: 36, height: 36, borderRadius: 10, border: "none", flex: "0 0 auto", cursor: draft.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", background: draft.trim() ? accent : "var(--gray-150)", transition: "background var(--dur-fast) var(--ease-out)" },
      }, I2.send({ size: 16, color: draft.trim() ? "#fff" : "var(--gray-400)" }))
    )
  );
}

function CommentRow({ c, accent, editing, editText, setEditText, commitEdit, onToggle, onEdit, onDelete, stop }) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("div", {
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    style: { display: "flex", gap: 9, padding: "10px 12px", borderBottom: "1px solid var(--gray-100)" },
  },
    // marcar como concluído
    React.createElement("button", {
      type: "button", onClick: onToggle, title: c.done ? "Reabrir" : "Marcar como concluído",
      style: { width: 19, height: 19, marginTop: 1, flex: "0 0 auto", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: c.done ? "var(--success)" : "transparent", boxShadow: c.done ? "none" : "inset 0 0 0 1.6px var(--gray-200)", transition: "box-shadow var(--dur-fast) var(--ease-out)" },
    }, c.done && I2.check({ size: 11, color: "#fff", sw: 2.8 })),
    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
      editing
        ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } },
            React.createElement("textarea", {
              value: editText, rows: 2, autoFocus: true,
              onChange: (e) => setEditText(e.target.value),
              onKeyDown: (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); commitEdit(); } },
              style: { width: "100%", border: "none", outline: "none", background: "var(--gray-100)", borderRadius: 9, padding: "7px 9px", fontSize: 12.5, fontWeight: 500, lineHeight: 1.35, color: "var(--ink)", resize: "none", fontFamily: "inherit" },
            }),
            React.createElement("button", { type: "button", onClick: commitEdit, style: { alignSelf: "flex-start", border: "none", background: accent, color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, "Salvar")
          )
        : React.createElement("div", { style: { fontSize: 12.5, fontWeight: 500, lineHeight: 1.38, color: c.done ? "var(--gray-400)" : "var(--ink)", textDecoration: c.done ? "line-through" : "none", letterSpacing: "-0.01em", wordBreak: "break-word", textWrap: "pretty" } }, c.texto),
      !editing && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 4, minHeight: 18 } },
        React.createElement("span", { style: { fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, timeAgo(c.criadoEm) + (c.editadoEm ? " · editado" : "")),
        hover && React.createElement("div", { style: { display: "flex", gap: 2, marginLeft: "auto" } },
          React.createElement("button", { type: "button", onClick: onEdit, title: "Editar", style: { border: "none", background: "transparent", cursor: "pointer", padding: 3, display: "flex", color: "var(--gray-400)" } }, I2.edit({ size: 13, color: "var(--gray-400)" })),
          React.createElement("button", { type: "button", onClick: onDelete, title: "Excluir", style: { border: "none", background: "transparent", cursor: "pointer", padding: 3, display: "flex", color: "var(--gray-400)" } }, I2.trash({ size: 13, color: "var(--gray-400)" }))
        )
      )
    )
  );
}

function ItemCard({ item, mode, onToggle }) {
  const done = mode === "com" ? item.com : item.sem;
  const pil = D.PILARES[item.pilar];
  const StageIcon = I2[item.etapa];
  const impactoLabel = { baixo: "Baixo", medio: "Médio", alto: "Alto" }[item.impacto];

  const [hover, setHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // anima o card inteiro só na transição não-feito -> feito (não no load inicial)
  const prevDone = React.useRef(done);
  const [animating, setAnimating] = React.useState(false);
  React.useEffect(() => {
    if (done && !prevDone.current) setAnimating(true);
    prevDone.current = done;
  }, [done]);
  const [comments, setComments] = React.useState(() => seedComments(item));
  const abertos = comments.filter((c) => !c.done).length;
  const temComentarios = comments.length > 0;

  const updateComments = (next) => { setComments(next); saveComments(item.id, next); };

  // fechar ao clicar fora / Esc
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onDoc = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDoc);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onDoc); };
  }, [open]);

  const showCommentBtn = hover || open || temComentarios;
  const commentAccent = pil.cor;

  return React.createElement("div", {
    onClick: () => onToggle(item.id),
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    onAnimationEnd: () => setAnimating(false),
    role: "checkbox", "aria-checked": done,
    className: "sol-itemcard" + (done ? " is-done" : "") + (animating ? " sol-card-anim" : ""),
    title: mode === "com"
      ? (done ? "Entregue — clique para desmarcar" : "A entregar — clique para marcar")
      : (done ? "Já existia antes — clique para desmarcar" : "Não existia antes — clique para marcar"),
    style: {
      position: "relative", zIndex: open ? 60 : "auto",
      borderRadius: 14, padding: "12px 13px",
      display: "flex", flexDirection: "column", gap: 9, cursor: "pointer",
      "--acc": pil.cor,
    },
  },
    // conteúdo (esmaece quando não entregue)
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9, opacity: done ? 1 : 0.5, transition: "opacity var(--dur-base) var(--ease-out)" } },
      // top row: status + stage + impacto + critico + pillar
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
        React.createElement("span", { style: { width: 22, height: 22, borderRadius: "50%", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", background: done ? "var(--success)" : "transparent", boxShadow: done ? "none" : "inset 0 0 0 1.8px var(--gray-200)", transition: "box-shadow var(--dur-fast) var(--ease-out)" } }, done && I2.check({ size: 13, color: "#fff", sw: 2.6 })),
        React.createElement("span", { title: `Etapa: ${D.ETAPAS[item.etapa].rotulo}`, style: { width: 22, height: 22, borderRadius: 7, background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, StageIcon({ size: 13, color: "var(--gray-500)" })),
        React.createElement("span", { style: { fontSize: 10.5, fontWeight: 600, color: "var(--gray-400)" } }, impactoLabel),
        item.critico && React.createElement("span", { title: "Item crítico — aplica teto ao score", style: { color: "var(--brand-orange-deep)", display: "flex" } }, I2.alert({ size: 12, color: "var(--brand-orange-deep)" })),
        React.createElement("span", { style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 999, background: pil.tint, color: pil.cor, fontSize: 10.5, fontWeight: 700, letterSpacing: "-0.01em" } },
          React.createElement("span", { style: { width: 5, height: 5, borderRadius: "50%", background: pil.cor } }), pil.rotulo)
      ),
      // promessa
      React.createElement("div", { style: { fontSize: 13.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, letterSpacing: "-0.02em", textWrap: "pretty" } }, item.texto),
      // footer: comment + evidence
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
        React.createElement("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 } },
          // botão de comentário — sutil, surge no hover (ou se há comentários)
          React.createElement("button", {
            onClick: (e) => { e.stopPropagation(); setOpen((v) => !v); },
            title: temComentarios ? `${comments.length} comentário${comments.length > 1 ? "s" : ""}` : "Adicionar comentário",
            style: {
              position: "relative", border: "none", width: 26, height: 26, borderRadius: 8, flex: "0 0 auto",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              background: open || temComentarios ? pil.tint : "var(--gray-100)",
              opacity: showCommentBtn ? 1 : 0, pointerEvents: showCommentBtn ? "auto" : "none",
              transition: "opacity var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)",
            },
          },
            (temComentarios ? I2.messageDot : I2.message)({ size: 14, color: open || temComentarios ? pil.cor : "var(--gray-400)" }),
            abertos > 0 && React.createElement("span", { style: { position: "absolute", top: -4, right: -4, minWidth: 15, height: 15, padding: "0 4px", borderRadius: 999, background: "var(--brand-orange-deep)", color: "#fff", fontSize: 9.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 1.5px var(--white)" } }, abertos)
          )
        )
      )
    ),
    // painel de comentários — fora do conteúdo esmaecido, opacidade plena
    open && React.createElement(CommentThread, { list: comments, accent: commentAccent, onChange: updateComments, onClose: () => setOpen(false) })
  );
}

window.SOL_CARDS = { ItemCard, ReviewCard };

/* ---------- Nota por estrelas — arrastável, fracionária ---------- */
function StarRating({ value, onChange, color }) {
  const ref = React.useRef(null);
  const dragRef = React.useRef(false);
  const N = 5, size = 30, gap = 0;
  const W = N * size + (N - 1) * gap;
  const setFromX = (clientX) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    let v = ((clientX - rect.left) / rect.width) * N;
    v = Math.max(0, Math.min(N, Math.round(v * 10) / 10));
    onChange(v);
  };
  const oneStar = (i) => {
    const fill = Math.max(0, Math.min(1, value - i));
    return React.createElement("span", { key: i, style: { position: "relative", width: size, height: size, flex: "0 0 auto", display: "block" } },
      React.createElement("span", { style: { position: "absolute", inset: 0, display: "flex" } }, I2.autenticidade({ size, color: "var(--gray-150)", fill: "var(--gray-150)" })),
      fill > 0 && React.createElement("span", { style: { position: "absolute", top: 0, left: 0, height: "100%", width: `${fill * 100}%`, overflow: "hidden", pointerEvents: "none" } },
        React.createElement("span", { style: { display: "flex", width: size, height: size } }, I2.autenticidade({ size, color, fill: color }))
      )
    );
  };
  return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } },
    React.createElement("div", {
      ref,
      onClick: (e) => { e.stopPropagation(); },
      onPointerDown: (e) => { e.stopPropagation(); dragRef.current = true; e.currentTarget.setPointerCapture(e.pointerId); setFromX(e.clientX); },
      onPointerMove: (e) => { if (dragRef.current) setFromX(e.clientX); },
      onPointerUp: () => { dragRef.current = false; },
      onPointerCancel: () => { dragRef.current = false; },
      title: "Arraste para definir a nota",
      style: { display: "flex", gap, width: W, height: size, cursor: "pointer", touchAction: "none", flex: "0 0 auto" },
    },
      Array.from({ length: N }, (_, i) => oneStar(i))
    ),
    React.createElement("span", { style: { fontSize: 19, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.04em", minWidth: 36 } }, (value || 0).toFixed(1))
  );
}

/* ---------- Card de avaliação — range (segmentado) ou nota (estrelas) ---------- */
function ReviewCard({ item, mode, onSet }) {
  const isGoogle = item.fonte === "Google";
  const fonteCor = isGoogle ? "var(--brand-orange-deep)" : "var(--brand-purple)";
  const fonteBg = isGoogle ? "var(--tint-peach)" : "var(--tint-lavender)";
  return React.createElement("div", { style: { background: "var(--white)", borderRadius: 14, padding: "14px 15px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", gap: 13 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
      React.createElement("span", { style: { display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 999, background: fonteBg, color: fonteCor, fontSize: 11, fontWeight: 800, letterSpacing: "-0.01em", flex: "0 0 auto" } }, item.fonte),
      React.createElement("span", { style: { fontSize: 13.5, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", textWrap: "pretty" } }, item.texto)
    ),
    item.tipo === "range"
      ? React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
          item.opcoes.map((opt) => {
            const sel = item.valor[mode] === opt;
            return React.createElement("button", {
              key: opt, type: "button", onClick: () => onSet(item.id, { valor: { ...item.valor, [mode]: opt } }),
              style: { border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 14px", fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.01em", background: sel ? "var(--ink)" : "var(--gray-100)", color: sel ? "#fff" : "var(--gray-600)", transition: "color var(--dur-fast) var(--ease-out)" },
            }, opt);
          })
        )
      : React.createElement(StarRating, { value: item.nota[mode] || 0, color: "var(--brand-amber)", onChange: (v) => onSet(item.id, { nota: { ...item.nota, [mode]: v } }) })
  );
}

window.SOL_CARDS = { ItemCard, ReviewCard, StarRating };
