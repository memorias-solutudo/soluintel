/* Main app — state, scoring, layout. */
const { TopBar, FooterDock, ProductRail } = window.SOL_UI;
const { ProductSection } = window.SOL_SECTION;
const SD = window.SOL_DATA;
const SS = window.SOL_SCORE;
const Ik = window.SOL_ICONS;

function App() {
  const [produtos, setProdutos] = React.useState(() => JSON.parse(JSON.stringify(SD.PRODUTOS)));
  const [modes, setModes] = React.useState(() => Object.fromEntries(SD.PRODUTOS.map((p) => [p.id, "com"])));
  const [activeId, setActiveId] = React.useState(SD.PRODUTOS[0].id);
  const refs = React.useRef({});

  const setItem = (id, patch) => setProdutos((prev) => prev.map((p) => ({ ...p, itens: p.itens.map((i) => i.id === id ? { ...i, ...(typeof patch === "function" ? patch(i) : patch) } : i) })));

  const onToggle = (id) => setItem(id, (i) => ({ com: !i.com }));

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

  const geral = SS.scoreGeral(produtos, SD.PESO);
  const pilares = SS.scorePorPilar(produtos, SD.PESO, SD.PILARES);

  return React.createElement("div", { style: { minHeight: "100vh", background: "var(--surface-app)" } },
    React.createElement(TopBar, { onBack: () => { /* TODO: navegar para o dashboard (a elaborar) */ } }),
    React.createElement(ProductRail, { produtos, activeId, onJump }),
    React.createElement("main", { style: { padding: "76px 44px 128px 64px", display: "flex", flexDirection: "column", gap: 40 } },
      produtos.map((p, idx) =>
        React.createElement(ProductSection, {
          key: p.id, produto: p, idx,
          mode: modes[p.id], onMode: (v) => setModes((m) => ({ ...m, [p.id]: v })),
          onToggle,
          sectionRef: (el) => { refs.current[p.id] = el; },
        })
      )
    ),
    React.createElement(FooterDock, { cliente: SD.CLIENTE, geral, pilares })
  );
}

ReactDOM.createRoot(document.getElementById("app-root")).render(React.createElement(App));
