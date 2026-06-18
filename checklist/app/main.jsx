/* Main app — estado global, modo Sem/Com, scoring (média de tudo). */
const { TopBar, FooterDock, ProductRail, CompanyData, ModeToggle } = window.SOL_UI;
const { ProductSection } = window.SOL_SECTION;
const SD = window.SOL_DATA;
const SS = window.SOL_SCORE;
const Ik = window.SOL_ICONS;

const MODE_KEY = "sol_mode_v1";
const CARD_ANIM_KEY = "sol_card_anim";
const ACTIVE_KEY = "sol_active_style_v2";
const CARD_ANIMS = [
  ["1", "Pop"], ["2", "Toque"], ["3", "Pulso"], ["4", "Glow"], ["5", "Flash"],
  ["6", "Lift"], ["7", "Anel"], ["8", "Bounce"], ["9", "Tilt"], ["10", "Sombra"],
];
const ACTIVE_STYLES = [
  ["padrao", "Padrão"], ["anel", "Anel"], ["barra", "Barra"], ["tint", "Fundo"],
  ["elevado", "Elevado"], ["borda", "Borda"], ["selo", "Selo"],
];

/* Seletor de Tweaks — fixo à direita: animação do clique + estado ativo, com preview vivo. */
function TweaksDock() {
  const [anim, setAnim] = React.useState(() => { try { return localStorage.getItem(CARD_ANIM_KEY) || "1"; } catch (e) { return "1"; } });
  const [active, setActive] = React.useState(() => { try { return localStorage.getItem(ACTIVE_KEY) || "padrao"; } catch (e) { return "padrao"; } });
  const [tick, setTick] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { document.body.dataset.cardAnim = anim; try { localStorage.setItem(CARD_ANIM_KEY, anim); } catch (e) {} }, [anim]);
  React.useEffect(() => { document.body.dataset.activeStyle = active; try { localStorage.setItem(ACTIVE_KEY, active); } catch (e) {} }, [active]);
  const replay = () => setTick((t) => t + 1);

  if (!open) {
    return React.createElement("button", {
      type: "button", onClick: () => setOpen(true), title: "Tweaks do card",
      style: { position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 90, border: "none", cursor: "pointer", background: "var(--white)", boxShadow: "var(--shadow-md)", borderRadius: 999, padding: "12px 9px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--ink)" },
    },
      Ik.autenticidade({ size: 17, color: "var(--brand-purple)", fill: "var(--brand-purple)" }),
      React.createElement("span", { style: { writingMode: "vertical-rl", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--gray-500)" } }, "Tweaks")
    );
  }

  // mini-card de preview: reflete o estado ativo e replay da animação a cada escolha
  const previewCard = React.createElement("div", {
    key: tick, className: "sol-itemcard is-done sol-card-anim",
    style: { position: "relative", borderRadius: 12, padding: "10px 11px", display: "flex", flexDirection: "column", gap: 7, "--acc": "var(--brand-purple)" },
  },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } },
      React.createElement("span", { style: { width: 18, height: 18, borderRadius: "50%", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--success)" } }, Ik.check({ size: 11, color: "#fff", sw: 2.8 })),
      React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" } }, "Item marcado")
    ),
    React.createElement("div", { style: { fontSize: 10.5, fontWeight: 500, color: "var(--gray-500)" } }, "Clique p/ pré-visualizar")
  );

  const sectionTitle = (t) => React.createElement("div", { style: { fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--gray-500)", marginTop: 2 } }, t);
  const optBtn = (sel, id, nome, onClick, showNum) => React.createElement("button", {
    key: id, type: "button", onClick, title: nome,
    style: { border: "none", cursor: "pointer", borderRadius: 9, padding: "7px 7px", fontSize: 11.5, fontWeight: 700, letterSpacing: "-0.01em", textAlign: "left", display: "flex", alignItems: "center", gap: 5, background: sel ? "var(--brand-purple)" : "var(--gray-100)", color: sel ? "#fff" : "var(--gray-600)" },
  }, showNum && React.createElement("span", { style: { fontSize: 10, fontWeight: 800, opacity: 0.7, minWidth: 12 } }, id), nome);

  return React.createElement("div", { style: { position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 90, width: 184, maxHeight: "86vh", overflowY: "auto", background: "var(--white)", borderRadius: 18, boxShadow: "var(--shadow-lg, 0 18px 50px rgba(21,21,21,0.18))", padding: 12, display: "flex", flexDirection: "column", gap: 9 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
      React.createElement("span", { style: { fontSize: 12.5, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)" } }, "Tweaks do card"),
      React.createElement("button", { type: "button", onClick: () => setOpen(false), title: "Fechar", style: { marginLeft: "auto", width: 24, height: 24, borderRadius: 8, border: "none", background: "var(--gray-100)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-500)" } }, Ik.x({ size: 14, color: "var(--gray-500)" }))
    ),
    React.createElement("div", { style: { background: "var(--gray-100)", borderRadius: 12, padding: 10 } }, previewCard),
    sectionTitle("Animação do clique"),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } },
      CARD_ANIMS.map(([id, nome]) => optBtn(anim === id, id, nome, () => { setAnim(id); replay(); }, true))
    ),
    sectionTitle("Card marcado (ativo)"),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } },
      ACTIVE_STYLES.map(([id, nome]) => optBtn(active === id, id, nome, () => { setActive(id); replay(); }, false))
    )
  );
}

function App() {
  const [produtos, setProdutos] = React.useState(() => JSON.parse(JSON.stringify(SD.PRODUTOS)));
  const [dados, setDados] = React.useState(() => JSON.parse(JSON.stringify(SD.DADOS_EMPRESA)));
  const [mode, setMode] = React.useState(() => { try { return localStorage.getItem(MODE_KEY) || "com"; } catch (e) { return "com"; } });
  const [activeId, setActiveId] = React.useState(SD.PRODUTOS[0].id);
  const [modalOpen, setModalOpen] = React.useState(false);
  const refs = React.useRef({});

  const changeMode = (m) => { setMode(m); try { localStorage.setItem(MODE_KEY, m); } catch (e) {} };

  // alterna o campo do MODO atual (sem | com) — permite editar antes e depois.
  // Vínculo de consistência: itens com o mesmo `grupo` representam o mesmo fato
  // em vários canais. Marcar o item de Consistência (consolida) marca todos os
  // do grupo; e o item de Consistência fica ativo só quando todos do grupo estão.
  const toggleItem = (id) => {
    const m = mode;
    const P = produtos.map((p) => ({ ...p, itens: p.itens.map((i) => ({ ...i })) }));
    const D = dados.map((d) => ({ ...d }));
    const items = [...D, ...P.flatMap((p) => p.itens)];
    const byId = {}; items.forEach((i) => { byId[i.id] = i; });
    const target = byId[id];
    if (!target) return;
    const newVal = !target[m];
    const changed = new Set([id]);
    target[m] = newVal;
    // Consolida (item de Consistência) → propaga para os membros do(s) grupo(s).
    if (target.consolida && target.grupo) {
      for (const it of items) {
        if (!it.consolida && it.grupo && it.grupo.some((g) => target.grupo.includes(g))) {
          it[m] = newVal; changed.add(it.id);
        }
      }
    }
    // Recalcula só os agregadores cujos grupos foram afetados (evita efeitos colaterais).
    const afetados = new Set();
    changed.forEach((cid) => (byId[cid].grupo || []).forEach((g) => afetados.add(g)));
    for (const agg of items) {
      if (!agg.consolida || !agg.grupo || !agg.grupo.some((g) => afetados.has(g))) continue;
      const membros = items.filter((it) => !it.consolida && it.grupo && it.grupo.some((g) => agg.grupo.includes(g)));
      if (membros.length) agg[m] = membros.every((it) => it[m]);
    }
    setProdutos(P); setDados(D);
  };
  const onToggle = (id) => toggleItem(id);
  // Avaliações: quantidade e nota da MESMA fonte dependem uma da outra.
  //  - "Nenhuma" => zera a nota (0 estrelas).
  //  - nota >= 0.1 (há ao menos 1 avaliação) => quantidade sobe p/ "1 a 5".
  const onSet = (id, patch) => setProdutos((prev) => prev.map((p) => {
    const target = p.itens.find((i) => i.id === id);
    if (!target) return p;
    const updated = { ...target, ...(typeof patch === "function" ? patch(target) : patch) };
    const sibling = p.itens.find((i) => i.id !== id && i.fonte && i.fonte === target.fonte && i.tipo !== target.tipo);
    let sibPatch = null;
    if (sibling) {
      if (updated.tipo === "range" && updated.valor[mode] === updated.opcoes[0] && (sibling.nota && sibling.nota[mode] || 0) > 0) {
        sibPatch = { nota: { ...sibling.nota, [mode]: 0 } };
      } else if (updated.tipo === "rating" && (updated.nota[mode] || 0) >= 0.1 && sibling.opcoes && sibling.valor[mode] === sibling.opcoes[0]) {
        sibPatch = { valor: { ...sibling.valor, [mode]: sibling.opcoes[1] } };
      }
    }
    return { ...p, itens: p.itens.map((i) => {
      if (i.id === id) return updated;
      if (sibPatch && sibling && i.id === sibling.id) return { ...i, ...sibPatch };
      return i;
    }) };
  }));
  const onToggleDado = (id) => toggleItem(id);

  const onJump = (pid) => {
    const el = refs.current[pid];
    if (el) window.scrollTo({ top: el.offsetTop - 84, behavior: "smooth" });
  };

  React.useEffect(() => {
    const onScroll = () => {
      let best = produtos[0].id, bestTop = -Infinity;
      for (const p of produtos) {
        const el = refs.current[p.id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top - 200;
        if (top <= 0 && top > bestTop) { bestTop = top; best = p.id; }
      }
      setActiveId(best);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [produtos]);

  // média de TUDO: dados da empresa + itens dos produtos (avaliações têm métrica própria, fora da média binária)
  const itensProdutos = produtos.filter((p) => p.tipo !== "avaliacoes").reduce((a, p) => a.concat(p.itens), []);
  const allItens = dados.concat(itensProdutos);
  const geral = SS.scoreGeral(allItens, SD.PESO, mode);
  const pilares = SS.scorePorPilar(allItens, SD.PESO, SD.PILARES, mode);

  return React.createElement("div", { style: { minHeight: "100vh", background: "var(--surface-app)" } },
    !modalOpen && React.createElement(TopBar, { onBack: () => { /* TODO: navegar para o dashboard (a elaborar) */ } }),
    !modalOpen && React.createElement(ModeToggle, { mode, onChange: changeMode }),
    !modalOpen && React.createElement(ProductRail, { produtos, activeId, onJump, mode }),
    React.createElement("main", { style: { padding: "76px 44px 128px 64px", display: "flex", flexDirection: "column", gap: 40 } },
      React.createElement(CompanyData, { dados, mode, onToggle: onToggleDado }),
      produtos.map((p, idx) =>
        React.createElement(ProductSection, {
          key: p.id, produto: p, idx, mode, onToggle, onSet, onModal: setModalOpen,
          sectionRef: (el) => { refs.current[p.id] = el; },
        })
      )
    ),
    !modalOpen && React.createElement(FooterDock, { cliente: SD.CLIENTE, geral, pilares, mode }),
    !modalOpen && React.createElement(TweaksDock, null)
  );
}

ReactDOM.createRoot(document.getElementById("app-root")).render(React.createElement(App));
