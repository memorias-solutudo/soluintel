/* Main app — estado global, modo Sem/Com, scoring (média de tudo). */
const { TopBar, FooterDock, ProductRail, CompanyData, ModeToggle } = window.SOL_UI;
const { ProductSection } = window.SOL_SECTION;
const SD = window.SOL_DATA;
const SS = window.SOL_SCORE;
const Ik = window.SOL_ICONS;

const MODE_KEY = "sol_mode_v1";
const ANIM_KEY = "sol_check_anim";
const CHECK_ANIMS = [
  ["1", "Pop"], ["2", "Bounce"], ["3", "Giro"], ["4", "Anel"], ["5", "Brilho"],
  ["6", "Flip"], ["7", "Zoom"], ["8", "Squash"], ["9", "Gota"], ["10", "Spin"],
];

/* Seletor de animação do check (Tweaks) — fixo à direita, com preview e persistência. */
function TweaksDock() {
  const [v, setV] = React.useState(() => { try { return localStorage.getItem(ANIM_KEY) || "1"; } catch (e) { return "1"; } });
  const [tick, setTick] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.dataset.checkAnim = v;
    try { localStorage.setItem(ANIM_KEY, v); } catch (e) {}
  }, [v]);
  const pick = (id) => { setV(id); setTick((t) => t + 1); };

  if (!open) {
    return React.createElement("button", {
      type: "button", onClick: () => setOpen(true), title: "Animação do check (Tweaks)",
      style: { position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 90, border: "none", cursor: "pointer", background: "var(--white)", boxShadow: "var(--shadow-md)", borderRadius: 999, padding: "12px 9px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--ink)" },
    },
      Ik.autenticidade({ size: 17, color: "var(--brand-purple)", fill: "var(--brand-purple)" }),
      React.createElement("span", { style: { writingMode: "vertical-rl", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--gray-500)" } }, "Tweaks")
    );
  }

  const previewCircle = React.createElement("span", {
    key: v + "-" + tick, className: "sol-check sol-check-anim",
    style: { width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--success)" },
  }, Ik.check({ size: 19, color: "#fff", sw: 2.6 }));

  return React.createElement("div", { style: { position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 90, width: 168, background: "var(--white)", borderRadius: 18, boxShadow: "var(--shadow-lg, 0 18px 50px rgba(21,21,21,0.18))", padding: 12, display: "flex", flexDirection: "column", gap: 10 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
      React.createElement("span", { style: { fontSize: 12.5, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)" } }, "Animação do check"),
      React.createElement("button", { type: "button", onClick: () => setOpen(false), title: "Fechar", style: { marginLeft: "auto", width: 24, height: 24, borderRadius: 8, border: "none", background: "var(--gray-100)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-500)" } }, Ik.x({ size: 14, color: "var(--gray-500)" }))
    ),
    React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "10px 0", background: "var(--gray-100)", borderRadius: 12 } },
      previewCircle,
      React.createElement("span", { style: { fontSize: 11.5, fontWeight: 600, color: "var(--gray-500)" } }, "preview")
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } },
      CHECK_ANIMS.map(([id, nome]) => React.createElement("button", {
        key: id, type: "button", onClick: () => pick(id), title: nome,
        style: { border: "none", cursor: "pointer", borderRadius: 9, padding: "7px 6px", fontSize: 11.5, fontWeight: 700, letterSpacing: "-0.01em", textAlign: "left", display: "flex", alignItems: "center", gap: 5, background: v === id ? "var(--brand-purple)" : "var(--gray-100)", color: v === id ? "#fff" : "var(--gray-600)" },
      },
        React.createElement("span", { style: { fontSize: 10, fontWeight: 800, opacity: 0.7, minWidth: 12 } }, id),
        nome
      ))
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

  // alterna o campo do MODO atual (sem | com) — permite editar antes e depois
  const setItem = (id, patch) => setProdutos((prev) => prev.map((p) => ({ ...p, itens: p.itens.map((i) => i.id === id ? { ...i, ...(typeof patch === "function" ? patch(i) : patch) } : i) })));
  const onToggle = (id) => setItem(id, (i) => ({ [mode]: !i[mode] }));
  const onSet = (id, patch) => setItem(id, patch);
  const onToggleDado = (id) => setDados((prev) => prev.map((d) => d.id === id ? { ...d, [mode]: !d[mode] } : d));

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
