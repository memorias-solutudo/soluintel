/* Browser-canvas evidence preview (internal scroll, full-page width) +
   compact product section. */
const I3 = window.SOL_ICONS;
const DD = window.SOL_DATA;
const SCC = window.SOL_SCORE;
const { Gauge: GaugeC } = window.SOL_UI;
const { ItemCard } = window.SOL_CARDS;
const { SegmentedToggle: SegToggle, Badge: BadgeC } = window.SolutudoDesignSystem_99d98c;

function EvidencePanel({ produto, mode, onMode, ag }) {
  const isCom = mode === "com";
  const [lightbox, setLightbox] = React.useState(null);
  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);
  const openLightbox = () => {
    const slot = document.getElementById(`ev-${produto.id}-${isCom ? "com" : "sem"}`);
    const img = slot && slot.shadowRoot && slot.shadowRoot.querySelector('img[part="image"]');
    const src = img && img.getAttribute("src");
    if (src) setLightbox({ src, label: isCom ? "Com Solutudo" : "Sem Solutudo" });
  };
  return React.createElement("aside", { style: { position: "sticky", top: 76, alignSelf: "start", display: "flex", flexDirection: "column", gap: 12 } },
    React.createElement("div", { style: { background: "var(--white)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-card)", overflow: "hidden", display: "flex", flexDirection: "column" } },
      // browser chrome
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: "1px solid var(--gray-100)" } },
        React.createElement("div", { style: { display: "flex", gap: 6, flex: "0 0 auto" } },
          ["#FF5F57", "#FEBC2E", "#28C840"].map((c) => React.createElement("span", { key: c, style: { width: 11, height: 11, borderRadius: "50%", background: c } }))
        ),
        React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 7, background: "var(--gray-100)", borderRadius: 999, padding: "6px 12px", minWidth: 0 } },
          React.createElement("span", { style: { color: "var(--gray-400)", display: "flex", flex: "0 0 auto" } }, I3.globe({ size: 13, color: "var(--gray-400)" })),
          React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--gray-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, produto.url || produto.superficie)
        ),
        React.createElement(SegToggle, { value: mode, onChange: onMode, options: [{ value: "sem", label: "Sem" }, { value: "com", label: "Com" }] })
      ),
      // scrollable canvas — full page width, internal vertical scroll
      React.createElement("div", { onClick: openLightbox, title: "Clique para ver o print inteiro", style: { position: "relative", height: "calc(100vh - 280px)", minHeight: 400, overflowY: "auto", overflowX: "hidden", cursor: "zoom-in", background: isCom ? "linear-gradient(180deg,#FBF6FF,#fff)" : "var(--gray-100)" } },
        React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", pointerEvents: "none" } },
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 999, background: isCom ? "var(--grad-cta)" : "var(--ink)", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "-0.01em", boxShadow: "var(--shadow-sm)" } }, isCom ? "Com Solutudo" : "Sem Solutudo"),
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", color: "var(--gray-500)", fontSize: 10.5, fontWeight: 700, boxShadow: "var(--ring-hairline)" } }, I3.arrowRight({ size: 12, color: "var(--gray-400)" }), "role a página")
        ),
        React.createElement("div", { style: { padding: "0 14px 16px", marginTop: -34 } },
          React.createElement("image-slot", { id: `ev-${produto.id}-sem`, shape: "rounded", radius: "12", fit: "contain", position: "50% 0%", placeholder: "Arraste o print de PÁGINA INTEIRA — Sem Solutudo", style: { display: isCom ? "none" : "block", width: "100%", height: 1500, filter: "grayscale(0.2)" } }),
          React.createElement("image-slot", { id: `ev-${produto.id}-com`, shape: "rounded", radius: "12", fit: "contain", position: "50% 0%", placeholder: "Arraste o print de PÁGINA INTEIRA — Com Solutudo", style: { display: isCom ? "block" : "none", width: "100%", height: 1500 } })
        )
      ),
      // caption
      React.createElement("div", { style: { padding: "11px 15px", display: "flex", alignItems: "center", gap: 9, color: "var(--gray-600)", borderTop: "1px solid var(--gray-100)" } },
        I3.paperclip({ size: 14, color: "var(--gray-400)" }),
        React.createElement("span", { style: { fontSize: 12, fontWeight: 500, lineHeight: 1.3 } }, isCom ? "Print de página inteira — Com Solutudo" : "Print de página inteira — Sem Solutudo")
      )
    ),
    // lightbox — print inteiro em largura total, com rolagem
    lightbox && React.createElement("div", { onClick: () => setLightbox(null), style: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(21,21,21,0.86)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", overflowY: "auto", overflowX: "hidden", cursor: "zoom-out" } },
      React.createElement("div", { style: { position: "fixed", top: 16, left: 0, right: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", pointerEvents: "none" } },
        React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", boxShadow: "var(--shadow-sm)", fontSize: 12.5, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" } }, `${produto.nome} · ${lightbox.label}`),
        React.createElement("button", { onClick: (e) => { e.stopPropagation(); setLightbox(null); }, title: "Fechar (Esc)", style: { pointerEvents: "auto", width: 40, height: 40, borderRadius: 999, border: "none", cursor: "pointer", background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", boxShadow: "var(--shadow-md)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, transform: "rotate(45deg)" } }, I3.plus({ size: 20, color: "var(--ink)" }))
      ),
      React.createElement("img", { src: lightbox.src, alt: produto.nome, onClick: (e) => e.stopPropagation(), style: { display: "block", width: "100%", height: "auto", cursor: "default" } })
    )
  );
}

function FootStat({ value, label, color }) {
  return React.createElement("div", { style: { textAlign: "center", minWidth: 40 } },
    React.createElement("div", { style: { fontWeight: 800, fontSize: 19, color } }, value),
    React.createElement("div", { style: { fontSize: 10, fontWeight: 600, color: "var(--gray-500)" } }, label)
  );
}

function ProductSection({ produto, idx, mode, onMode, onToggle, sectionRef }) {
  const ag = SCC.agregar(produto.itens, DD.PESO);
  return React.createElement("section", { ref: sectionRef, id: `sec-${produto.id}`, "data-screen-label": produto.nome, style: { scrollMarginTop: 160, paddingTop: 14 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" } },
      React.createElement("span", { style: { fontSize: 12, fontWeight: 800, color: produto.cor, letterSpacing: "0.06em" } }, String(idx + 1).padStart(2, "0")),
      React.createElement("h2", { style: { fontSize: 24, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", margin: 0 } }, produto.nome),
      // score do produto — ao lado do título
      React.createElement("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 16, background: "var(--white)", borderRadius: 999, boxShadow: "var(--shadow-sm), var(--ring-hairline)", padding: "7px 16px 7px 10px" } },
        React.createElement(GaugeC, { value: ag.pct, size: 44, stroke: 6, color: produto.cor, label: "Score do produto", sub: `${ag.completos}/${ag.total} entregues`, capped: ag.criticoFuro }),
        React.createElement("div", { style: { display: "flex", gap: 6 } },
          React.createElement(FootStat, { value: ag.pendNos, label: "nós", color: "var(--brand-orange-deep)" }),
          React.createElement(FootStat, { value: ag.pendCliente, label: "cliente", color: "var(--gray-500)" })
        )
      )
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1fr) 600px", gap: 22, alignItems: "start" } },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(max(232px, (100% - 33px) / 4), 1fr))", gap: 11, alignContent: "start" } },
        produto.itens.map((item) =>
          React.createElement(ItemCard, { key: item.id, item, onToggle })
        )
      ),
      React.createElement(EvidencePanel, { produto, mode, onMode, ag })
    )
  );
}

window.SOL_SECTION = { ProductSection };
