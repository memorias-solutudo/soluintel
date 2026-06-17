/* Main app — estado global, modo Sem/Com, scoring (média de tudo). */
const { TopBar, FooterDock, ProductRail, CompanyData, ModeToggle } = window.SOL_UI;
const { ProductSection } = window.SOL_SECTION;
const SD = window.SOL_DATA;
const SS = window.SOL_SCORE;
const Ik = window.SOL_ICONS;

const MODE_KEY = "sol_mode_v1";

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
    !modalOpen && React.createElement(FooterDock, { cliente: SD.CLIENTE, geral, pilares, mode })
  );
}

ReactDOM.createRoot(document.getElementById("app-root")).render(React.createElement(App));
