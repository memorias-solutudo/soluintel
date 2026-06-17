/* Browser-canvas evidence preview (internal scroll, full-page width) +
   compact product section. */
const I3 = window.SOL_ICONS;
const DD = window.SOL_DATA;
const SCC = window.SOL_SCORE;
const { Gauge: GaugeC } = window.SOL_UI;
const { ItemCard, ReviewCard } = window.SOL_CARDS;
const { SegmentedToggle: SegToggle, Badge: BadgeC } = window.SolutudoDesignSystem_99d98c;

/* ---------- Importa um arquivo de imagem como data URL (redimensionado) ---------- */
async function fileToDataUrl(file, cap) {
  cap = cap || 1600;
  return new Promise((resolve, reject) => {
    if (!file || !/^image\//.test(file.type)) return reject(new Error("tipo"));
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, cap / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        let out; try { out = cv.toDataURL("image/webp", 0.85); } catch (e) { out = reader.result; }
        if (!out || out.length < 30) out = reader.result;
        resolve(out);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Editor de print: arrastar / selecionar / remover (sem crop) ---------- */
function PrintEditor({ titulo, src, onSave, onRemove, onClose }) {
  const fileRef = React.useRef(null);
  const [over, setOver] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const handle = async (file) => {
    if (!file) return;
    setBusy(true);
    try { const url = await fileToDataUrl(file); onSave(url); } catch (e) { setBusy(false); }
  };
  const btnBase = { border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.01em", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 };
  return ReactDOM.createPortal(React.createElement("div", {
    onClick: (e) => { if (e.target === e.currentTarget) onClose(); },
    style: { position: "fixed", inset: 0, zIndex: 1200, background: "rgba(24,22,34,0.34)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }
  },
    React.createElement("div", { style: { width: 380, maxWidth: "100%", background: "var(--white)", borderRadius: 22, boxShadow: "var(--shadow-lg, 0 24px 60px rgba(20,18,30,0.3))", padding: "20px 22px 22px", animation: "ccPop .18s var(--ease-out)" } },
      React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 } },
        React.createElement("div", { style: { lineHeight: 1.25 } },
          React.createElement("div", { style: { fontWeight: 800, fontSize: 16, color: "var(--ink)", letterSpacing: "-0.03em" } }, "Print da página"),
          React.createElement("div", { style: { fontSize: 12, color: "var(--gray-500)", fontWeight: 500 } }, titulo)
        ),
        React.createElement("button", { type: "button", title: "Fechar", onClick: onClose, style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, I3.x({ size: 16, color: "var(--gray-600)" }))
      ),
      src && React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 14, background: "var(--gray-100)", borderRadius: 14, padding: 10, maxHeight: 200, overflow: "hidden" } },
        React.createElement("img", { src, alt: "", style: { maxWidth: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8, display: "block" } })
      ),
      React.createElement("div", {
        onClick: () => fileRef.current && fileRef.current.click(),
        onDragOver: (e) => { e.preventDefault(); setOver(true); },
        onDragLeave: () => setOver(false),
        onDrop: (e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files && e.dataTransfer.files[0]); },
        style: { border: `2px dashed ${over ? "var(--brand-purple)" : "var(--gray-200, #d9d7e0)"}`, borderRadius: 16, padding: "24px 18px", textAlign: "center", cursor: "pointer", background: over ? "var(--tint-lavender-200, #efebfb)" : "transparent", transition: "border-color .15s var(--ease-out)" }
      },
        React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 9, color: "var(--gray-500)" } }, I3.camera({ size: 26, color: "var(--gray-500)" })),
        React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" } }, busy ? "Processando…" : (src ? "Arraste para substituir" : "Arraste o print aqui")),
        React.createElement("div", { style: { fontSize: 12, color: "var(--gray-500)", fontWeight: 500, marginTop: 2 } }, "ou clique para escolher do computador")
      ),
      React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => handle(e.target.files && e.target.files[0]) }),
      src && React.createElement("button", { type: "button", onClick: () => { if (window.confirm("Remover a imagem atual deste preview?")) onRemove(); }, style: { ...btnBase, marginTop: 14, width: "100%", background: "transparent", color: "var(--brand-orange-deep)", boxShadow: "inset 0 0 0 1px var(--gray-150)" } },
        I3.trash({ size: 15, color: "var(--brand-orange-deep)" }), "Remover imagem"
      )
    )
  ), document.body);
}

function EvidencePanel({ produto, mode, ag, onModal }) {
  const isCom = mode === "com";
  const storeKey = (m) => `sol_print_${produto.id}_${m}`;
  const loadImg = (m) => { try { return localStorage.getItem(storeKey(m)) || null; } catch (e) { return null; } };
  const [imgs, setImgs] = React.useState(() => ({ sem: loadImg("sem"), com: loadImg("com") }));
  const [editing, setEditing] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const src = imgs[mode];

  React.useEffect(() => { if (onModal) onModal(editing); }, [editing]);

  const saveImg = (url) => {
    setImgs((p) => ({ ...p, [mode]: url }));
    try { url ? localStorage.setItem(storeKey(mode), url) : localStorage.removeItem(storeKey(mode)); } catch (e) {}
    setEditing(false);
  };

  React.useEffect(() => {
    if (!lightbox) return;
    setZoom(1);
    const onKey = (e) => { if (e.key === "Escape") setLightbox(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const zoomBtn = { width: 30, height: 30, borderRadius: 999, border: "none", cursor: "pointer", background: "transparent", color: "var(--ink)", fontSize: 19, fontWeight: 800, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" };
  const badge = React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 999, background: isCom ? "var(--grad-cta)" : "var(--ink)", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "-0.01em", boxShadow: "var(--shadow-sm)" } }, isCom && React.createElement("img", { src: "assets/mark-heart.png", alt: "", style: { height: 13, width: "auto", display: "block" } }), isCom ? "Com Solutudo" : "Sem Solutudo");

  return React.createElement("aside", { style: { position: "sticky", top: 76, alignSelf: "start", display: "flex", flexDirection: "column", gap: 12 } },
    React.createElement("div", { style: { background: "var(--white)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-card)", overflow: "hidden", display: "flex", flexDirection: "column" } },
      // browser chrome + botão editar
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: "1px solid var(--gray-100)" } },
        React.createElement("div", { style: { display: "flex", gap: 6, flex: "0 0 auto" } },
          ["#FF5F57", "#FEBC2E", "#28C840"].map((c) => React.createElement("span", { key: c, style: { width: 11, height: 11, borderRadius: "50%", background: c } }))
        ),
        React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 7, background: "var(--gray-100)", borderRadius: 999, padding: "6px 12px", minWidth: 0 } },
          React.createElement("span", { style: { color: "var(--gray-400)", display: "flex", flex: "0 0 auto" } }, I3.globe({ size: 13, color: "var(--gray-400)" })),
          React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--gray-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, produto.url || produto.superficie)
        ),
        React.createElement("button", { type: "button", title: "Editar print", onClick: () => setEditing(true), style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, I3.edit({ size: 15, color: "var(--gray-600)" }))
      ),
      // imagem (container acompanha a altura) ou placeholder
      src
        ? React.createElement("div", { style: { position: "relative", background: isCom ? "linear-gradient(180deg,#FBF6FF,#fff)" : "var(--gray-100)" } },
            React.createElement("div", { style: { position: "absolute", top: 10, left: 12, zIndex: 2, pointerEvents: "none" } }, badge),
            React.createElement("img", { src, alt: produto.nome, onClick: () => setLightbox(true), title: "Clique para ampliar", style: { display: "block", width: "100%", height: "auto", cursor: "zoom-in" } })
          )
        : React.createElement("div", { onClick: () => setEditing(true), style: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, height: 360, cursor: "pointer", background: isCom ? "linear-gradient(180deg,#FBF6FF,#fff)" : "var(--gray-100)", color: "var(--gray-500)", textAlign: "center", padding: 20 } },
            React.createElement("div", { style: { position: "absolute", top: 10, left: 12 } }, badge),
            I3.camera({ size: 30, color: "var(--gray-400)" }),
            React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)" } }, "Adicionar print da página"),
            React.createElement("div", { style: { fontSize: 12, fontWeight: 500 } }, "Arraste a imagem ou clique para escolher")
          ),
      // caption
      React.createElement("div", { style: { padding: "11px 15px", display: "flex", alignItems: "center", gap: 9, color: "var(--gray-600)", borderTop: "1px solid var(--gray-100)" } },
        I3.paperclip({ size: 14, color: "var(--gray-400)" }),
        React.createElement("span", { style: { fontSize: 12, fontWeight: 500, lineHeight: 1.3 } }, isCom ? "Print da página — Com Solutudo" : "Print da página — Sem Solutudo")
      )
    ),
    editing && React.createElement(PrintEditor, { titulo: `${produto.nome} · ${isCom ? "Com Solutudo" : "Sem Solutudo"}`, src, onSave: saveImg, onRemove: () => saveImg(null), onClose: () => setEditing(false) }),
    // lightbox — máx 90% da largura, zoom em pílula, fundo desfocado (portal p/ cobrir tudo)
    lightbox && src && ReactDOM.createPortal(React.createElement("div", { onClick: () => setLightbox(false), style: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(21,21,21,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", overflow: "auto", cursor: "zoom-out", padding: "64px 20px" } },
      React.createElement("button", { onClick: (e) => { e.stopPropagation(); setLightbox(false); }, title: "Fechar (Esc)", style: { position: "fixed", top: 16, right: 20, zIndex: 3, width: 40, height: 40, borderRadius: 999, border: "none", cursor: "pointer", background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", boxShadow: "var(--shadow-md)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" } }, I3.x({ size: 18, color: "var(--ink)" })),
      React.createElement("img", { src, alt: produto.nome, onClick: (e) => { e.stopPropagation(); setZoom((z) => (z === 1 ? 2 : 1)); }, style: { display: "block", margin: "0 auto", width: `${90 * zoom}vw`, maxWidth: zoom === 1 ? "90vw" : "none", height: "auto", borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.45)", cursor: zoom === 1 ? "zoom-in" : "zoom-out" } }),
      React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", alignItems: "center", gap: 2, padding: 5, borderRadius: 999, background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", boxShadow: "var(--shadow-md)" } },
        React.createElement("button", { type: "button", title: "Menos zoom", onClick: () => setZoom((z) => Math.max(1, Math.round((z - 0.25) * 100) / 100)), style: zoomBtn }, "−"),
        React.createElement("span", { style: { minWidth: 52, textAlign: "center", fontSize: 12.5, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" } }, Math.round(zoom * 100) + "%"),
        React.createElement("button", { type: "button", title: "Mais zoom", onClick: () => setZoom((z) => Math.min(4, Math.round((z + 0.25) * 100) / 100)), style: zoomBtn }, "+")
      )
    ), document.body)
  );
}

function FootStat({ value, label, color }) {
  return React.createElement("div", { style: { textAlign: "center", minWidth: 40 } },
    React.createElement("div", { style: { fontWeight: 800, fontSize: 19, color } }, value),
    React.createElement("div", { style: { fontSize: 10, fontWeight: 600, color: "var(--gray-500)" } }, label)
  );
}

function ProductSection({ produto, idx, mode, onToggle, onSet, onModal, sectionRef }) {
  const ehAv = produto.tipo === "avaliacoes";
  const ag = ehAv ? SCC.scoreAvaliacoes(produto.itens, mode) : SCC.agregar(produto.itens, DD.PESO, mode);
  const temPreview = produto.preview !== false;
  return React.createElement("section", { ref: sectionRef, id: `sec-${produto.id}`, "data-screen-label": produto.nome, style: { scrollMarginTop: 160, paddingTop: 14 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" } },
      React.createElement("span", { style: { fontSize: 12, fontWeight: 800, color: produto.cor, letterSpacing: "0.06em" } }, String(idx + 1).padStart(2, "0")),
      React.createElement("h2", { style: { fontSize: 24, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", margin: 0 } }, produto.nome),
      // score do produto — ao lado do título
      React.createElement("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 16, background: "var(--white)", borderRadius: 999, boxShadow: "var(--shadow-sm), var(--ring-hairline)", padding: "7px 16px 7px 10px" } },
        React.createElement(GaugeC, { value: ag.pct, size: 44, stroke: 6, color: produto.cor, label: ehAv ? "Score de avaliações" : "Score do produto", sub: ehAv ? `${ag.completos}/${ag.total} preenchidos` : `${ag.completos}/${ag.total} ${mode === "com" ? "entregues" : "já tinha"}`, capped: ag.criticoFuro }),
        !ehAv && React.createElement("div", { style: { display: "flex", gap: 6 } },
          React.createElement(FootStat, { value: ag.pendNos, label: "nós", color: "var(--brand-orange-deep)" }),
          React.createElement(FootStat, { value: ag.pendCliente, label: "cliente", color: "var(--gray-500)" })
        )
      )
    ),
    React.createElement("div", { style: temPreview ? { display: "grid", gridTemplateColumns: "minmax(0,1fr) 600px", gap: 22, alignItems: "start" } : { display: "block" } },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(max(232px, (100% - 33px) / 4), 1fr))", gap: 11, alignContent: "start" } },
        produto.itens.map((item) =>
          ehAv
            ? React.createElement(ReviewCard, { key: item.id, item, mode, onSet })
            : React.createElement(ItemCard, { key: item.id, item, mode, onToggle })
        )
      ),
      temPreview && React.createElement(EvidencePanel, { produto, mode, ag, onModal })
    )
  );
}

window.SOL_SECTION = { ProductSection };
