/* ============================================================
   Admin · Catálogo de Checklist
   Tela isolada para CADASTRAR os itens que devem ser analisados
   em cada produto. Persiste em localStorage (sol_catalog_v1) para
   conectarmos depois ao checklist do cliente. Não interfere na
   tela "Checklist Sem-Com".
   ============================================================ */
const { Button, Card, Badge, Input } = window.SolutudoDesignSystem_99d98c;
const I = window.SOL_ICONS;
const SD = window.SOL_DATA;

const STORAGE_KEY = "sol_catalog_v1";

/* ---- metadados (rótulo + cor) ---- */
const ETAPA_META = SD.ETAPAS; // descoberta | avaliacao | experiencia
const PILAR_META = SD.PILARES; // verdade | atualizacao | confiabilidade
const IMPACTO_META = {
  baixo: { rotulo: "Baixo", cor: "var(--gray-500)", peso: 1 },
  medio: { rotulo: "Médio", cor: "var(--brand-cyan)", peso: 2 },
  alto:  { rotulo: "Alto",  cor: "var(--brand-orange-deep)", peso: 3 },
};
const DONO_META = {
  nos:     { rotulo: "Nós", icon: I.building, ajuda: "Lacuna resolvida por ação nossa" },
  cliente: { rotulo: "Cliente", icon: I.user, ajuda: "Depende de insumo do cliente" },
};
const COR_OPCOES = [
  { nome: "Roxo", valor: "var(--brand-purple)" },
  { nome: "Laranja", valor: "var(--brand-orange)" },
  { nome: "Rosa", valor: "var(--brand-pink)" },
  { nome: "Ciano", valor: "var(--brand-cyan)" },
  { nome: "Verde", valor: "var(--brand-mint)" },
  { nome: "Amarelo", valor: "var(--brand-yellow)" },
];
const ICONE_OPCOES = ["sparkles", "search", "globe", "share", "building", "camera"];

/* ---- uid ---- */
let _k = 0;
const uid = (p) => `${p}_${Date.now().toString(36)}_${(_k++).toString(36)}`;

/* ---- seed a partir dos dados de exemplo (só campos de catálogo) ---- */
function seedFromData() {
  const PROD_ICON = { destaque: "sparkles", google: "search", solusite: "globe", social: "share", atualizacao: "refresh", consistencia: "copy", avaliacoes: "autenticidade" };
  return {
    versao: 1,
    atualizadoEm: Date.now(),
    produtos: SD.PRODUTOS.map((p) => ({
      id: p.id,
      nome: p.nome,
      superficie: p.superficie,
      url: p.url || "",
      cor: p.cor,
      icone: PROD_ICON[p.id] || "sparkles",
      itens: p.itens.map((it) => ({
        id: it.id,
        texto: it.texto,
        etapa: it.etapa,
        pilar: it.pilar,
        impacto: it.impacto,
        critico: !!it.critico,
        dono: it.dono || "nos",
        insumo: it.insumo || "",
      })),
    })),
  };
}

function loadCatalog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return seedFromData();
}
function saveCatalog(cat) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cat)); } catch (e) { /* ignore */ }
}

/* ============================================================
   Controles compactos
   ============================================================ */

/* grupo de pílulas selecionáveis (1 ativa) */
function PillGroup({ options, value, onChange, accent }) {
  return React.createElement("div", { style: { display: "inline-flex", gap: 4, background: "var(--gray-100)", padding: 3, borderRadius: 999 } },
    options.map((o) => {
      const on = o.value === value;
      const col = accent || o.cor || "var(--brand-purple)";
      return React.createElement("button", {
        key: o.value, type: "button", onClick: () => onChange(o.value),
        title: o.ajuda || o.label,
        style: {
          display: "inline-flex", alignItems: "center", gap: 5, border: "none", cursor: "pointer",
          borderRadius: 999, padding: o.icon ? "5px 11px 5px 9px" : "5px 12px",
          fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.01em", whiteSpace: "nowrap",
          background: on ? "var(--white)" : "transparent",
          color: on ? "var(--ink)" : "var(--gray-500)",
          boxShadow: on ? "var(--shadow-sm), var(--ring-hairline)" : "none",
          transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
        },
      },
        o.dot && React.createElement("span", { style: { width: 8, height: 8, borderRadius: 999, background: col, flex: "0 0 auto" } }),
        o.icon && React.createElement("span", { style: { display: "inline-flex", color: on ? col : "var(--gray-400)" } }, o.icon({ size: 14, color: on ? col : "var(--gray-400)" })),
        o.label
      );
    })
  );
}

/* toggle (crítico) */
function ToggleChip({ active, onClick, icon, children, tone }) {
  const col = tone || "var(--brand-orange-deep)";
  return React.createElement("button", {
    type: "button", onClick,
    style: {
      display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer",
      borderRadius: 999, padding: "7px 13px 7px 11px", fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.01em",
      background: active ? col : "var(--gray-100)",
      color: active ? "var(--white)" : "var(--gray-500)",
      boxShadow: active ? "none" : "var(--ring-hairline)",
      transition: "all var(--dur-fast) var(--ease-out)",
    },
  },
    icon && React.createElement("span", { style: { display: "inline-flex" } }, icon({ size: 14, color: active ? "var(--white)" : "var(--gray-400)" })),
    children
  );
}

/* botão-ícone fantasma */
function IconBtn({ icon, onClick, title, danger, disabled, rotate }) {
  const [h, setH] = React.useState(false);
  const col = danger ? "var(--danger, #E5484D)" : "var(--gray-500)";
  return React.createElement("button", {
    type: "button", onClick, title, disabled,
    onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: {
      width: 32, height: 32, borderRadius: 9, border: "none", flex: "0 0 auto",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.3 : 1,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: h && !disabled ? (danger ? "var(--tint-peach)" : "var(--gray-100)") : "transparent",
      color: col, transition: "background var(--dur-fast) var(--ease-out)",
      transform: rotate ? `rotate(${rotate}deg)` : "none",
    },
  }, icon({ size: 17, color: h && danger ? "var(--danger, #E5484D)" : col }));
}

/* rótulo de microcampo */
function FieldLabel({ children }) {
  return React.createElement("span", { style: { fontSize: 10.5, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--gray-400)" } }, children);
}

/* ============================================================
   Editor de um item do catálogo
   ============================================================ */
function ItemEditor({ item, idx, total, onChange, onDelete, onMove }) {
  const set = (patch) => onChange({ ...item, ...patch });
  const pilarCor = PILAR_META[item.pilar] ? PILAR_META[item.pilar].cor : "var(--brand-purple)";

  return React.createElement("div", {
    style: {
      background: "var(--white)", borderRadius: "var(--radius-lg, 16px)",
      boxShadow: "var(--shadow-sm), var(--ring-hairline)", padding: "14px 14px 14px 16px",
      borderLeft: `3px solid ${pilarCor}`, display: "flex", flexDirection: "column", gap: 12,
    },
  },
    // linha 1: índice + texto + ações
    React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 } },
      React.createElement("span", { style: { fontSize: 12, fontWeight: 800, color: "var(--gray-300)", paddingTop: 11, minWidth: 22, fontVariantNumeric: "tabular-nums" } }, String(idx + 1).padStart(2, "0")),
      React.createElement("textarea", {
        value: item.texto, rows: 1,
        onChange: (e) => set({ texto: e.target.value }),
        onInput: (e) => { e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; },
        ref: (el) => { if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; } },
        placeholder: "Descreva a promessa verificável a analisar…",
        style: {
          flex: 1, border: "none", outline: "none", background: "var(--gray-100)", borderRadius: 10,
          padding: "9px 13px", fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: "var(--ink)",
          letterSpacing: "-0.02em", overflow: "hidden",
        },
      }),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } },
        React.createElement(IconBtn, { icon: I.chevronDown, rotate: 180, title: "Mover para cima", disabled: idx === 0, onClick: () => onMove(idx, idx - 1) }),
        React.createElement(IconBtn, { icon: I.chevronDown, title: "Mover para baixo", disabled: idx === total - 1, onClick: () => onMove(idx, idx + 1) })
      ),
      React.createElement(IconBtn, { icon: I.trash, title: "Excluir item", danger: true, onClick: onDelete })
    ),
    // linha 2: campos
    React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", paddingLeft: 34 } },
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
        React.createElement(FieldLabel, null, "Etapa"),
        React.createElement(PillGroup, {
          value: item.etapa, onChange: (v) => set({ etapa: v }),
          options: Object.keys(ETAPA_META).map((k) => ({ value: k, label: ETAPA_META[k].rotulo, icon: I[k] })),
        })
      ),
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
        React.createElement(FieldLabel, null, "Pilar"),
        React.createElement(PillGroup, {
          value: item.pilar, onChange: (v) => set({ pilar: v }),
          options: Object.keys(PILAR_META).map((k) => ({ value: k, label: PILAR_META[k].rotulo, cor: PILAR_META[k].cor, dot: true })),
        })
      ),
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
        React.createElement(FieldLabel, null, "Impacto"),
        React.createElement(PillGroup, {
          value: item.impacto, onChange: (v) => set({ impacto: v }),
          options: Object.keys(IMPACTO_META).map((k) => ({ value: k, label: IMPACTO_META[k].rotulo, cor: IMPACTO_META[k].cor, dot: true })),
        })
      ),
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
        React.createElement(FieldLabel, null, "Responsável padrão"),
        React.createElement(PillGroup, {
          value: item.dono, onChange: (v) => set({ dono: v }),
          options: Object.keys(DONO_META).map((k) => ({ value: k, label: DONO_META[k].rotulo, icon: DONO_META[k].icon, ajuda: DONO_META[k].ajuda })),
        })
      ),
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 5 } },
        React.createElement(FieldLabel, null, "Crítico"),
        React.createElement(ToggleChip, { active: !!item.critico, icon: I.alert, onClick: () => set({ critico: !item.critico }) }, item.critico ? "Aplica teto" : "Não")
      )
    ),
    // insumo do cliente (quando responsável = cliente)
    item.dono === "cliente" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5, paddingLeft: 34 } },
      React.createElement(FieldLabel, null, "Insumo esperado do cliente"),
      React.createElement(Input, {
        value: item.insumo || "", onChange: (e) => set({ insumo: e.target.value }),
        placeholder: "Ex.: Fotos autorais e história da empresa", size: "md",
      })
    )
  );
}

/* ============================================================
   Painel do produto selecionado
   ============================================================ */
function ProductPanel({ produto, onChange, onDelete, podeExcluir }) {
  const [editHead, setEditHead] = React.useState(false);
  const setItens = (itens) => onChange({ ...produto, itens });
  const updItem = (i, next) => setItens(produto.itens.map((it, k) => (k === i ? next : it)));
  const delItem = (i) => setItens(produto.itens.filter((_, k) => k !== i));
  const move = (from, to) => {
    if (to < 0 || to >= produto.itens.length) return;
    const arr = produto.itens.slice();
    const [m] = arr.splice(from, 1);
    arr.splice(to, 0, m);
    setItens(arr);
  };
  const addItem = () => setItens([...produto.itens, {
    id: uid("i"), texto: "", etapa: "descoberta", pilar: "verdade", impacto: "medio", critico: false, dono: "nos", insumo: "",
  }]);

  const Icone = I[produto.icone] || I.sparkles;
  const porPilar = Object.keys(PILAR_META).map((k) => ({ k, n: produto.itens.filter((it) => it.pilar === k).length }));
  const criticos = produto.itens.filter((it) => it.critico).length;

  return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 18, paddingBottom: 80 } },
    // cabeçalho do produto
    React.createElement(Card, { padding: 22, elevation: "card" },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16 } },
        React.createElement("div", { style: { width: 52, height: 52, borderRadius: 15, background: produto.cor, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, Icone({ size: 26, color: "#fff" })),
        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
            React.createElement("h1", { style: { margin: 0, fontSize: 23, fontWeight: 800, letterSpacing: "-0.035em", color: "var(--ink)" } }, produto.nome || "Novo produto"),
            React.createElement(Badge, { tone: "gray", size: "sm" }, `${produto.itens.length} ${produto.itens.length === 1 ? "item" : "itens"}`),
            criticos > 0 && React.createElement(Badge, { tone: "orange", size: "sm", iconLeft: I.alert({ size: 12, color: "var(--brand-orange-deep)" }) }, `${criticos} crítico${criticos > 1 ? "s" : ""}`)
          ),
          React.createElement("div", { style: { fontSize: 13, color: "var(--gray-500)", fontWeight: 500, marginTop: 3 } }, `${produto.superficie || "—"}${produto.url ? " · " + produto.url : ""}`)
        ),
        React.createElement(Button, { variant: "secondary", size: "sm", iconLeft: I.edit({ size: 16, color: "var(--ink)" }), onClick: () => setEditHead((v) => !v) }, editHead ? "Fechar" : "Editar produto")
      ),
      editHead && React.createElement(ProductHeadEditor, { produto, onChange, onDelete, podeExcluir }),
      !editHead && React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" } },
        porPilar.map(({ k, n }) => React.createElement("div", { key: k, style: { display: "inline-flex", alignItems: "center", gap: 7, background: "var(--gray-100)", borderRadius: 999, padding: "6px 13px 6px 11px" } },
          React.createElement("span", { style: { width: 9, height: 9, borderRadius: 999, background: PILAR_META[k].cor } }),
          React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)" } }, PILAR_META[k].rotulo),
          React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--gray-400)" } }, n)
        ))
      )
    ),
    // lista de itens
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      produto.itens.length === 0
        ? React.createElement(EmptyItems, { onAdd: addItem })
        : produto.itens.map((it, i) => React.createElement(ItemEditor, {
            key: it.id, item: it, idx: i, total: produto.itens.length,
            onChange: (next) => updItem(i, next), onDelete: () => delItem(i), onMove: move,
          }))
    ),
    produto.itens.length > 0 && React.createElement("button", {
      type: "button", onClick: addItem,
      style: {
        display: "flex", alignItems: "center", justifyContent: "center", gap: 9, width: "100%",
        padding: "15px", borderRadius: "var(--radius-lg, 16px)", cursor: "pointer",
        border: "1.5px dashed var(--gray-200)", background: "transparent", color: "var(--brand-purple)",
        fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.02em",
        transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
      },
      onMouseEnter: (e) => { e.currentTarget.style.background = "var(--tint-lavender)"; e.currentTarget.style.borderColor = "var(--brand-purple)"; },
      onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--gray-200)"; },
    }, I.plus({ size: 18, color: "var(--brand-purple)" }), "Adicionar item ao checklist")
  );
}

function EmptyItems({ onAdd }) {
  return React.createElement("div", { style: { textAlign: "center", padding: "56px 24px", background: "var(--white)", borderRadius: "var(--radius-xl)", boxShadow: "var(--ring-hairline)" } },
    React.createElement("div", { style: { width: 56, height: 56, borderRadius: 16, background: "var(--tint-lavender)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" } }, I.check({ size: 26, color: "var(--brand-purple)" })),
    React.createElement("div", { style: { fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, "Nenhum item ainda"),
    React.createElement("div", { style: { fontSize: 13.5, color: "var(--gray-500)", fontWeight: 500, margin: "5px 0 18px" } }, "Cadastre o que deve ser analisado neste produto."),
    React.createElement(Button, { variant: "primary", size: "md", iconLeft: I.plus({ size: 18, color: "#fff" }), onClick: onAdd }, "Adicionar primeiro item")
  );
}

/* editor do cabeçalho do produto (nome, superfície, url, cor, ícone) */
function ProductHeadEditor({ produto, onChange, onDelete, podeExcluir }) {
  const set = (patch) => onChange({ ...produto, ...patch });
  return React.createElement("div", { style: { marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--gray-150)", display: "flex", flexDirection: "column", gap: 14 } },
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 6 } },
        React.createElement(FieldLabel, null, "Nome do produto"),
        React.createElement(Input, { value: produto.nome, onChange: (e) => set({ nome: e.target.value }), placeholder: "Ex.: Destaque Solutudo" })
      ),
      React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 6 } },
        React.createElement(FieldLabel, null, "Superfície"),
        React.createElement(Input, { value: produto.superficie, onChange: (e) => set({ superficie: e.target.value }), placeholder: "Ex.: Google, Solusite…" })
      )
    ),
    React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 6 } },
      React.createElement(FieldLabel, null, "Referência / URL"),
      React.createElement(Input, { value: produto.url, onChange: (e) => set({ url: e.target.value }), placeholder: "Ex.: solutudo.com.br/empresa", iconLeft: I.globe({ size: 16, color: "var(--gray-400)" }) })
    ),
    React.createElement("div", { style: { display: "flex", gap: 28, flexWrap: "wrap" } },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.createElement(FieldLabel, null, "Cor"),
        React.createElement("div", { style: { display: "flex", gap: 8 } },
          COR_OPCOES.map((c) => React.createElement("button", {
            key: c.valor, type: "button", title: c.nome, onClick: () => set({ cor: c.valor }),
            style: {
              width: 30, height: 30, borderRadius: 999, background: c.valor, cursor: "pointer", border: "none",
              boxShadow: produto.cor === c.valor ? "0 0 0 2.5px var(--white), 0 0 0 4.5px " + c.valor : "var(--ring-hairline)",
              transition: "box-shadow var(--dur-fast) var(--ease-out)",
            },
          }))
        )
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.createElement(FieldLabel, null, "Ícone"),
        React.createElement("div", { style: { display: "flex", gap: 6 } },
          ICONE_OPCOES.map((ic) => {
            const on = produto.icone === ic;
            return React.createElement("button", {
              key: ic, type: "button", onClick: () => set({ icone: ic }),
              style: {
                width: 36, height: 36, borderRadius: 11, cursor: "pointer", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: on ? produto.cor : "var(--gray-100)",
                boxShadow: on ? "none" : "var(--ring-hairline)",
                transition: "background var(--dur-fast) var(--ease-out)",
              },
            }, I[ic]({ size: 18, color: on ? "#fff" : "var(--gray-500)" }));
          })
        )
      )
    ),
    podeExcluir && React.createElement("div", { style: { marginTop: 4 } },
      React.createElement(Button, { variant: "secondary", size: "sm", iconLeft: I.trash({ size: 15, color: "var(--danger, #E5484D)" }), onClick: onDelete, style: { color: "var(--danger, #E5484D)" } }, "Excluir produto")
    )
  );
}

/* ============================================================
   Barra lateral de produtos
   ============================================================ */
function Sidebar({ produtos, activeId, onSelect, onAdd }) {
  return React.createElement("aside", {
    style: {
      width: 286, flex: "0 0 286px", alignSelf: "stretch",
      borderRight: "1px solid var(--gray-150)", background: "var(--white)",
      display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh",
    },
  },
    // marca / topo
    React.createElement("div", { style: { padding: "20px 22px 16px", display: "flex", alignItems: "center", gap: 11, borderBottom: "1px solid var(--gray-150)" } },
      React.createElement("a", { href: "Checklist Sem-Com Solutudo.html", title: "Voltar ao checklist", style: { display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 999, background: "var(--gray-100)", flex: "0 0 auto", textDecoration: "none" } }, I.arrowLeft({ size: 17, color: "var(--ink)" })),
      React.createElement("img", { src: "assets/logo-solutudo.png", alt: "Solutudo", style: { height: 26, width: "auto", display: "block" } })
    ),
    React.createElement("div", { style: { padding: "16px 18px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between" } },
      React.createElement("span", { style: { fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-400)" } }, "Produtos"),
      React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--gray-300)" } }, produtos.length)
    ),
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "4px 12px 12px", display: "flex", flexDirection: "column", gap: 4 } },
      produtos.map((p) => {
        const on = p.id === activeId;
        const Icone = I[p.icone] || I.sparkles;
        return React.createElement("button", {
          key: p.id, type: "button", onClick: () => onSelect(p.id),
          style: {
            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 13, border: "none",
            cursor: "pointer", textAlign: "left", width: "100%",
            background: on ? "var(--tint-lavender)" : "transparent",
            transition: "background var(--dur-fast) var(--ease-out)",
          },
          onMouseEnter: (e) => { if (!on) e.currentTarget.style.background = "var(--gray-100)"; },
          onMouseLeave: (e) => { if (!on) e.currentTarget.style.background = "transparent"; },
        },
          React.createElement("span", { style: { width: 34, height: 34, borderRadius: 10, background: p.cor, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, Icone({ size: 17, color: "#fff" })),
          React.createElement("span", { style: { flex: 1, minWidth: 0 } },
            React.createElement("span", { style: { display: "block", fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", color: on ? "var(--brand-purple)" : "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.nome || "Sem nome"),
            React.createElement("span", { style: { display: "block", fontSize: 11.5, fontWeight: 600, color: "var(--gray-400)" } }, `${p.itens.length} ${p.itens.length === 1 ? "item" : "itens"}`)
          )
        );
      })
    ),
    React.createElement("div", { style: { padding: 14, borderTop: "1px solid var(--gray-150)" } },
      React.createElement(Button, { variant: "secondary", size: "md", fullWidth: true, iconLeft: I.plus({ size: 17, color: "var(--ink)" }), onClick: onAdd }, "Novo produto")
    )
  );
}

/* ============================================================
   App
   ============================================================ */
function AdminApp() {
  const [catalog, setCatalog] = React.useState(loadCatalog);
  const [activeId, setActiveId] = React.useState(() => (loadCatalog().produtos[0] || {}).id);
  const [savedAt, setSavedAt] = React.useState(null);
  const first = React.useRef(true);

  // persistência automática
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => {
      const next = { ...catalog, atualizadoEm: Date.now() };
      saveCatalog(next);
      setSavedAt(Date.now());
    }, 400);
    return () => clearTimeout(t);
  }, [catalog]);

  const produtos = catalog.produtos;
  const active = produtos.find((p) => p.id === activeId) || produtos[0];

  const updProduto = (next) => setCatalog((c) => ({ ...c, produtos: c.produtos.map((p) => (p.id === next.id ? next : p)) }));
  const addProduto = () => {
    const np = { id: uid("p"), nome: "", superficie: "", url: "", cor: COR_OPCOES[produtos.length % COR_OPCOES.length].valor, icone: "sparkles", itens: [] };
    setCatalog((c) => ({ ...c, produtos: [...c.produtos, np] }));
    setActiveId(np.id);
  };
  const delProduto = (id) => {
    setCatalog((c) => {
      const rest = c.produtos.filter((p) => p.id !== id);
      return { ...c, produtos: rest };
    });
    if (id === activeId) {
      const rest = produtos.filter((p) => p.id !== id);
      setActiveId((rest[0] || {}).id);
    }
  };

  const totalItens = produtos.reduce((s, p) => s + p.itens.length, 0);

  const exportar = () => {
    const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "catalogo-checklist-solutudo.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const restaurar = () => {
    if (!window.confirm("Restaurar o catálogo de exemplo? As alterações cadastradas serão substituídas.")) return;
    const seed = seedFromData();
    setCatalog(seed); setActiveId((seed.produtos[0] || {}).id);
  };

  return React.createElement("div", { style: { display: "flex", minHeight: "100vh", alignItems: "flex-start" } },
    React.createElement(Sidebar, { produtos, activeId: active ? active.id : null, onSelect: setActiveId, onAdd: addProduto }),
    // coluna principal
    React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" } },
      // topo
      React.createElement("header", { style: { position: "sticky", top: 0, zIndex: 10, background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", boxShadow: "0 1px 0 var(--gray-150)" } },
        React.createElement("div", { style: { padding: "16px 36px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" } },
          React.createElement("div", { style: { flex: "1 1 240px", minWidth: 0 } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--brand-purple)" } }, "Admin · Catálogo"),
            React.createElement("h1", { style: { margin: "1px 0 0", fontSize: 20, fontWeight: 800, letterSpacing: "-0.035em", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "Itens do checklist por produto")
          ),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flex: "0 0 auto", flexWrap: "wrap" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: "var(--gray-400)" } },
              savedAt ? I.check({ size: 15, color: "var(--success, #00B37E)" }) : null,
              React.createElement("span", null, savedAt ? "Salvo" : "Salva automaticamente"),
              React.createElement("span", { style: { color: "var(--gray-300)" } }, "·"),
              React.createElement("span", null, `${totalItens} itens`)
            ),
            React.createElement(Button, { variant: "secondary", size: "sm", iconLeft: I.refresh({ size: 15, color: "var(--ink)" }), onClick: restaurar }, "Restaurar exemplo"),
            React.createElement(Button, { variant: "dark", size: "sm", iconLeft: I.download({ size: 15, color: "#fff" }), onClick: exportar }, "Exportar JSON")
          )
        ),
        React.createElement("div", { style: { height: 3, background: "var(--grad-rainbow)" } })
      ),
      // conteúdo
      React.createElement("main", { style: { padding: "26px 36px", maxWidth: 940, width: "100%", margin: "0 auto" } },
        active
          ? React.createElement(ProductPanel, { key: active.id, produto: active, onChange: updProduto, onDelete: () => delProduto(active.id), podeExcluir: produtos.length > 1 })
          : React.createElement(NoProducts, { onAdd: addProduto })
      )
    )
  );
}

function NoProducts({ onAdd }) {
  return React.createElement("div", { style: { textAlign: "center", padding: "90px 24px" } },
    React.createElement("div", { style: { fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, "Nenhum produto cadastrado"),
    React.createElement("div", { style: { fontSize: 14, color: "var(--gray-500)", margin: "6px 0 20px" } }, "Crie um produto para começar a montar o checklist."),
    React.createElement(Button, { variant: "primary", iconLeft: I.plus({ size: 18, color: "#fff" }), onClick: onAdd }, "Novo produto")
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(React.createElement(AdminApp));
