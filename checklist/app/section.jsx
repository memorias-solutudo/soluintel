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

/* ---------- Normaliza um link colado (adiciona https:// quando falta) ---------- */
function normalizeUrl(s) {
  s = (s || "").trim();
  if (!s) return "";
  if (!/^https?:\/\//i.test(s)) s = "https://" + s.replace(/^\/+/, "");
  return s;
}

/* ---------- Editor de print + link: arrastar / selecionar / remover (sem crop) ---------- */
function PrintEditor({ titulo, src, link, showLink, onSave, onRemove, onSaveLink, onClose }) {
  const fileRef = React.useRef(null);
  const [over, setOver] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [linkDraft, setLinkDraft] = React.useState(link || "");
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
    React.createElement("div", { style: { width: 380, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", background: "var(--white)", borderRadius: 22, boxShadow: "var(--shadow-lg, 0 24px 60px rgba(20,18,30,0.3))", padding: "20px 22px 22px", animation: "ccPop .18s var(--ease-out)" } },
      React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 } },
        React.createElement("div", { style: { lineHeight: 1.25 } },
          React.createElement("div", { style: { fontWeight: 800, fontSize: 16, color: "var(--ink)", letterSpacing: "-0.03em" } }, "Preview da página"),
          React.createElement("div", { style: { fontSize: 12, color: "var(--gray-500)", fontWeight: 500 } }, titulo)
        ),
        React.createElement("button", { type: "button", title: "Fechar", onClick: onClose, style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, I3.x({ size: 16, color: "var(--gray-600)" }))
      ),
      showLink && React.createElement("div", { style: { marginBottom: 18, padding: "13px 14px 14px", background: "var(--gray-100)", borderRadius: 16 } },
        React.createElement("div", { style: { fontSize: 12.5, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.01em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 } },
          React.createElement("img", { src: "assets/mark-heart.png", alt: "", style: { height: 13, width: "auto" } }), "Link do site ao vivo (Com Solutudo)"),
        React.createElement("div", { style: { display: "flex", gap: 7 } },
          React.createElement("input", { type: "url", value: linkDraft, placeholder: "saborserra.com.br", onChange: (e) => setLinkDraft(e.target.value), onKeyDown: (e) => { if (e.key === "Enter") onSaveLink(normalizeUrl(linkDraft)); }, style: { flex: 1, minWidth: 0, border: "none", background: "var(--white)", borderRadius: 10, padding: "9px 11px", fontSize: 13, fontWeight: 600, color: "var(--ink)", boxShadow: "inset 0 0 0 1px var(--gray-200, #ddd)" } }),
          React.createElement("button", { type: "button", onClick: () => onSaveLink(normalizeUrl(linkDraft)), style: { ...btnBase, padding: "9px 14px", background: "var(--ink)", color: "#fff" } }, "Salvar")
        ),
        React.createElement("div", { style: { fontSize: 11, color: "var(--gray-500)", fontWeight: 500, marginTop: 7, lineHeight: 1.35 } }, "Mostra o site ao vivo no container. Se o site não permitir ser incorporado (ex.: Instagram, perfil do Google), cai automaticamente no print abaixo."),
        link && React.createElement("button", { type: "button", onClick: () => { setLinkDraft(""); onSaveLink(""); }, style: { ...btnBase, marginTop: 9, padding: "7px 12px", fontSize: 12.5, background: "transparent", color: "var(--brand-orange-deep)" } }, I3.trash({ size: 13, color: "var(--brand-orange-deep)" }), "Remover link")
      ),
      showLink && React.createElement("div", { style: { fontSize: 12.5, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.01em", marginBottom: 9 } }, "Print (fallback)"),
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
  const linkKey = `sol_link_${produto.id}`;
  const loadImg = (m) => { try { return localStorage.getItem(storeKey(m)) || null; } catch (e) { return null; } };
  const loadLink = () => { try { return localStorage.getItem(linkKey) || ""; } catch (e) { return ""; } };
  const [imgs, setImgs] = React.useState(() => ({ sem: loadImg("sem"), com: loadImg("com") }));
  const [link, setLink] = React.useState(loadLink);
  const [comView, setComView] = React.useState("live"); // "live" | "print"
  const [frameState, setFrameState] = React.useState("loading"); // loading | ok | blocked
  const [editing, setEditing] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const [previewH] = React.useState(() => Math.max(360, Math.min(560, (typeof window !== "undefined" ? window.innerHeight : 820) - 240)));
  const src = imgs[mode];
  const showLive = isCom && !!link && comView === "live";

  React.useEffect(() => { if (onModal) onModal(editing || expanded); }, [editing, expanded]);

  React.useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  // Carga do iframe: se não carregar em ~7s, assume bloqueio e cai no print.
  React.useEffect(() => {
    if (!showLive) return;
    setFrameState("loading");
    const t = setTimeout(() => setFrameState((s) => (s === "loading" ? "blocked" : s)), 7000);
    return () => clearTimeout(t);
  }, [showLive, link]);

  const saveLink = (url) => {
    setLink(url);
    try { url ? localStorage.setItem(linkKey, url) : localStorage.removeItem(linkKey); } catch (e) {}
    if (url) setComView("live");
  };

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
      // browser chrome + alternar Site/Print + abrir + editar
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderBottom: "1px solid var(--gray-100)" } },
        React.createElement("div", { style: { display: "flex", gap: 6, flex: "0 0 auto" } },
          ["#FF5F57", "#FEBC2E", "#28C840"].map((c) => React.createElement("span", { key: c, style: { width: 11, height: 11, borderRadius: "50%", background: c } }))
        ),
        React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 7, background: "var(--gray-100)", borderRadius: 999, padding: "6px 12px", minWidth: 0 } },
          React.createElement("span", { style: { color: showLive ? "var(--brand-purple)" : "var(--gray-400)", display: "flex", flex: "0 0 auto" } }, I3.globe({ size: 13, color: showLive ? "var(--brand-purple)" : "var(--gray-400)" })),
          React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--gray-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, showLive ? link.replace(/^https?:\/\//, "") : (produto.url || produto.superficie))
        ),
        // alternador Site/Print — só no Com Solutudo quando há link
        isCom && link && React.createElement("div", { style: { display: "flex", gap: 2, background: "var(--gray-100)", borderRadius: 999, padding: 2, flex: "0 0 auto" } },
          [["live", "Site"], ["print", "Print"]].map(([v, lbl]) => React.createElement("button", { key: v, type: "button", onClick: () => setComView(v), style: { border: "none", borderRadius: 999, padding: "5px 11px", fontSize: 11.5, fontWeight: 800, letterSpacing: "-0.01em", cursor: "pointer", background: comView === v ? "var(--white)" : "transparent", color: comView === v ? "var(--ink)" : "var(--gray-500)", boxShadow: comView === v ? "var(--shadow-sm)" : "none" } }, lbl))
        ),
        showLive && React.createElement("button", { type: "button", title: "Ver em tela cheia", onClick: () => setExpanded(true), style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, (I3.maximize || I3.globe)({ size: 14, color: "var(--gray-600)" })),
        showLive && React.createElement("a", { href: link, target: "_blank", rel: "noopener noreferrer", title: "Abrir em nova aba", style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto", textDecoration: "none" } }, I3.externalLink ? I3.externalLink({ size: 14, color: "var(--gray-600)" }) : I3.globe({ size: 14, color: "var(--gray-600)" })),
        React.createElement("button", { type: "button", title: "Editar link / print", onClick: () => setEditing(true), style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, I3.edit({ size: 15, color: "var(--gray-600)" }))
      ),
      // site ao vivo (iframe) · imagem · ou placeholder
      showLive
        ? React.createElement("div", { style: { position: "relative", background: "linear-gradient(180deg,#FBF6FF,#fff)" } },
            React.createElement("div", { style: { position: "absolute", top: 10, left: 12, zIndex: 3, pointerEvents: "none" } }, badge),
            // miniatura do site a 50% (iframe 200% reduzido por scale 0.5); rolagem interna isolada
            frameState !== "blocked" && React.createElement("div", { style: { position: "relative", height: previewH, overflow: "hidden", overscrollBehavior: "contain" } },
              React.createElement("iframe", { src: link, title: produto.nome, onLoad: () => setFrameState("ok"), onError: () => setFrameState("blocked"), loading: "lazy", referrerPolicy: "no-referrer", scrolling: "auto", sandbox: "allow-scripts allow-same-origin allow-popups allow-forms", style: { width: "200%", height: previewH * 2, border: "none", background: "#fff", transform: "scale(0.5)", transformOrigin: "top left" } })
            ),
            frameState === "loading" && React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-500)", fontSize: 13, fontWeight: 600, pointerEvents: "none" } }, "Carregando o site…"),
            frameState === "blocked" && React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 360, padding: 24, textAlign: "center", color: "var(--gray-600)" } },
              src
                ? React.createElement("img", { src, alt: produto.nome, onClick: () => setLightbox(true), title: "Clique para ampliar", style: { maxWidth: "100%", maxHeight: 320, objectFit: "contain", borderRadius: 10, cursor: "zoom-in" } })
                : I3.globe({ size: 30, color: "var(--gray-400)" }),
              React.createElement("div", { style: { fontSize: 12.5, fontWeight: 600, lineHeight: 1.4, maxWidth: 360 } }, src ? "O site não permitiu ser incorporado — exibindo o print." : "O site não permitiu ser incorporado. Adicione um print como fallback ou abra em nova aba."),
              React.createElement("a", { href: link, target: "_blank", rel: "noopener noreferrer", style: { fontSize: 12.5, fontWeight: 800, color: "var(--brand-purple)", textDecoration: "none" } }, "Abrir o site em nova aba →")
            )
          )
        : src
        ? React.createElement("div", { style: { position: "relative", height: previewH, background: isCom ? "linear-gradient(180deg,#FBF6FF,#fff)" : "var(--gray-100)" } },
            React.createElement("div", { style: { position: "absolute", top: 10, left: 12, zIndex: 2, pointerEvents: "none" } }, badge),
            React.createElement("div", { style: { height: "100%", overflowY: "auto", overscrollBehavior: "contain" } },
              React.createElement("img", { src, alt: produto.nome, onClick: () => setLightbox(true), title: "Clique para ampliar", style: { display: "block", width: "100%", height: "auto", cursor: "zoom-in" } })
            )
          )
        : React.createElement("div", { onClick: () => setEditing(true), style: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, height: 360, cursor: "pointer", background: isCom ? "linear-gradient(180deg,#FBF6FF,#fff)" : "var(--gray-100)", color: "var(--gray-500)", textAlign: "center", padding: 20 } },
            React.createElement("div", { style: { position: "absolute", top: 10, left: 12 } }, badge),
            isCom ? I3.globe({ size: 30, color: "var(--gray-400)" }) : I3.camera({ size: 30, color: "var(--gray-400)" }),
            React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)" } }, isCom ? "Adicionar link do site ou print" : "Adicionar print da página"),
            React.createElement("div", { style: { fontSize: 12, fontWeight: 500 } }, isCom ? "Clique em editar para colar o link ou arraste um print" : "Arraste a imagem ou clique para escolher")
          ),
      // caption
      React.createElement("div", { style: { padding: "11px 15px", display: "flex", alignItems: "center", gap: 9, color: "var(--gray-600)", borderTop: "1px solid var(--gray-100)" } },
        showLive ? I3.globe({ size: 14, color: "var(--gray-400)" }) : I3.paperclip({ size: 14, color: "var(--gray-400)" }),
        React.createElement("span", { style: { fontSize: 12, fontWeight: 500, lineHeight: 1.3 } }, showLive ? "Site ao vivo — Com Solutudo" : (isCom ? "Print da página — Com Solutudo" : "Print da página — Sem Solutudo"))
      )
    ),
    editing && React.createElement(PrintEditor, { titulo: `${produto.nome} · ${isCom ? "Com Solutudo" : "Sem Solutudo"}`, src, link, showLink: isCom, onSave: saveImg, onRemove: () => saveImg(null), onSaveLink: saveLink, onClose: () => setEditing(false) }),
    // modal do site ao vivo — 90% da tela, iframe a 100% e interativo (portal)
    expanded && link && ReactDOM.createPortal(React.createElement("div", { onClick: (e) => { if (e.target === e.currentTarget) setExpanded(false); }, style: { position: "fixed", inset: 0, zIndex: 1100, background: "rgba(21,21,21,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3vh 0" } },
      React.createElement("div", { style: { width: "90vw", height: "90vh", background: "#fff", borderRadius: 16, boxShadow: "var(--shadow-lg, 0 24px 60px rgba(20,18,30,0.4))", overflow: "hidden", display: "flex", flexDirection: "column" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: "1px solid var(--gray-100)", flex: "0 0 auto" } },
          React.createElement("div", { style: { display: "flex", gap: 6, flex: "0 0 auto" } }, ["#FF5F57", "#FEBC2E", "#28C840"].map((c) => React.createElement("span", { key: c, style: { width: 11, height: 11, borderRadius: "50%", background: c } }))),
          React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 7, background: "var(--gray-100)", borderRadius: 999, padding: "6px 12px", minWidth: 0 } },
            React.createElement("span", { style: { color: "var(--brand-purple)", display: "flex", flex: "0 0 auto" } }, I3.globe({ size: 13, color: "var(--brand-purple)" })),
            React.createElement("span", { style: { fontSize: 12.5, fontWeight: 600, color: "var(--gray-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, link.replace(/^https?:\/\//, ""))
          ),
          React.createElement("a", { href: link, target: "_blank", rel: "noopener noreferrer", title: "Abrir em nova aba", style: { border: "none", background: "var(--gray-100)", width: 32, height: 32, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", textDecoration: "none" } }, (I3.externalLink || I3.globe)({ size: 15, color: "var(--gray-600)" })),
          React.createElement("button", { type: "button", title: "Fechar (Esc)", onClick: () => setExpanded(false), style: { border: "none", background: "var(--gray-100)", width: 32, height: 32, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, I3.x({ size: 17, color: "var(--gray-600)" }))
        ),
        React.createElement("iframe", { src: link, title: produto.nome, referrerPolicy: "no-referrer", sandbox: "allow-scripts allow-same-origin allow-popups allow-forms", style: { flex: 1, width: "100%", border: "none", background: "#fff" } })
      )
    ), document.body),
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
    React.createElement("div", { style: temPreview ? { display: "grid", gridTemplateColumns: "minmax(0,1fr) 780px", gap: 22, alignItems: "start" } : { display: "block" } },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(max(220px, (100% - 22px) / 3), 1fr))", gap: 11, alignContent: "start" } },
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
