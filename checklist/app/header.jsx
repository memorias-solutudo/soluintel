/* UI components for the checklist screen. Composes DS primitives. */
const { Badge, Card, Button, SegmentedToggle } = window.SolutudoDesignSystem_99d98c;
const I = window.SOL_ICONS;
const { PILARES, ETAPAS, PESO } = window.SOL_DATA;
const { qualidadeItem, ehDelta, agregar, pct } = window.SOL_SCORE;

/* ---------- Donut gauge (overall + pillar) ---------- */
function Gauge({ value, size = 64, stroke = 7, color = "var(--brand-purple)", track = "var(--gray-150)", label, sub, capped }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value);
  return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
    React.createElement("div", { style: { position: "relative", width: size, height: size, flex: "0 0 auto" } },
      React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" } },
        React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: track, strokeWidth: stroke }),
        React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeDasharray: c, strokeDashoffset: off, style: { transition: "stroke-dashoffset .5s var(--ease-out)" } })
      ),
      React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.26, color: "var(--ink)", letterSpacing: "-0.04em" } }, pct(value))
    ),
    (label || sub) && React.createElement("div", { style: { lineHeight: 1.2 } },
      label && React.createElement("div", { style: { fontWeight: 700, fontSize: 14, color: "var(--ink)" } }, label),
      sub && React.createElement("div", { style: { fontSize: 11.5, color: "var(--gray-500)", fontWeight: 500 } }, sub),
      capped && React.createElement("div", { style: { fontSize: 11, color: "var(--brand-orange-deep)", fontWeight: 700, marginTop: 2 } }, "teto por crítico")
    )
  );
}

/* ---------- Barra superior — logo + voltar ---------- */
function TopBar({ onBack }) {
  const glass = { background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", boxShadow: "var(--shadow-card), var(--ring-hairline)" };
  return React.createElement("div", { style: { position: "fixed", top: 16, left: 20, zIndex: 50, display: "flex", alignItems: "center", gap: 9 } },
    React.createElement("button", { type: "button", title: "Voltar", onClick: onBack, style: { ...glass, width: 40, height: 40, borderRadius: 999, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" } }, I.arrowLeft({ size: 18, color: "var(--ink)" })),
    React.createElement("button", { type: "button", title: "Ir para o dashboard", onClick: onBack, style: { ...glass, border: "none", borderRadius: 999, padding: "7px 17px", cursor: "pointer", display: "flex", alignItems: "center" } },
      React.createElement("img", { src: "assets/logo-solutudo.png", alt: "Solutudo", style: { height: 28, width: "auto", display: "block" } })
    )
  );
}

/* ---------- Mini medidor de pilar (rodapé) ---------- */
function PillarMini({ value, color, rotulo }) {
  const size = 36, stroke = 4.5, r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - value);
  return React.createElement("div", { title: rotulo, style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
    React.createElement("div", { style: { position: "relative", width: size, height: size } },
      React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" } },
        React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "var(--gray-150)", strokeWidth: stroke }),
        React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeDasharray: c, strokeDashoffset: off, style: { transition: "stroke-dashoffset .5s var(--ease-out)" } })
      ),
      React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: "var(--ink)", letterSpacing: "-0.04em" } }, pct(value))
    ),
    React.createElement("div", { style: { fontSize: 9.5, fontWeight: 700, color: "var(--gray-500)", letterSpacing: "-0.01em", lineHeight: 1 } }, rotulo)
  );
}

/* ---------- Bloco de demanda (rodapé direito) ---------- */
function DemandBlock({ icon, tone, value, label, title }) {
  return React.createElement("div", { title, style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 1, padding: "0 8px", minWidth: 52 } },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } },
      React.createElement("span", { style: { color: tone, display: "flex" } }, icon({ size: 12, color: tone })),
      React.createElement("span", { style: { fontWeight: 800, fontSize: 18, color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1 } }, value)
    ),
    React.createElement("span", { style: { fontSize: 9.5, fontWeight: 700, color: "var(--gray-500)", letterSpacing: "-0.01em" } }, label)
  );
}

/* ---------- Logo da empresa: imagem redonda ou 2 iniciais ---------- */
function empresaIniciais(nome) {
  const palavras = (nome || "").trim().split(/\s+/).filter(Boolean);
  if (!palavras.length) return "?";
  const a = palavras[0][0] || "";
  const b = palavras[1] ? palavras[1][0] : (palavras[0][1] || "");
  return (a + b).toUpperCase();
}

function CompanyLogo({ empresa, logo, size = 38, onEdit }) {
  return React.createElement("div", { style: { position: "relative", width: size, height: size, flex: "0 0 auto" } },
    React.createElement("div", { style: { width: size, height: size, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: logo ? "var(--white)" : "var(--grad-brand)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" } },
      logo
        ? React.createElement("img", { src: logo, alt: empresa, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : React.createElement("span", { style: { color: "#fff", fontWeight: 800, fontSize: size * 0.4, letterSpacing: "-0.02em", lineHeight: 1 } }, empresaIniciais(empresa))
    ),
    onEdit && React.createElement("button", { type: "button", title: "Alterar logo", onClick: onEdit, style: { position: "absolute", right: -3, bottom: -3, width: 18, height: 18, borderRadius: "50%", border: "2px solid var(--white)", background: "var(--ink)", color: "#fff", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" } }, I.edit({ size: 9, color: "#fff" }))
  );
}

/* ---------- Modal de logo: arrastar, recortar (circular) ou remover ---------- */
function LogoEditor({ empresa, logo, onSave, onRemove, onClose }) {
  const V = 252, O = 360;
  const fileRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const [src, setSrc] = React.useState(null);
  const [nat, setNat] = React.useState({ w: 0, h: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [over, setOver] = React.useState(false);

  const baseScale = nat.w ? Math.max(V / nat.w, V / nat.h) : 1;
  const scale = baseScale * zoom;
  const dw = nat.w * scale, dh = nat.h * scale;
  const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
  const clampPos = (p) => ({ x: clamp(p.x, V - dw, 0), y: clamp(p.y, V - dh, 0) });

  React.useEffect(() => { if (nat.w) setPos((p) => clampPos(p)); }, [zoom]);

  const loadFile = (file) => {
    if (!file || !/^image\//.test(file.type)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const bs = Math.max(V / img.naturalWidth, V / img.naturalHeight);
        const ndw = img.naturalWidth * bs, ndh = img.naturalHeight * bs;
        setNat({ w: img.naturalWidth, h: img.naturalHeight });
        setZoom(1);
        setPos({ x: (V - ndw) / 2, y: (V - ndh) / 2 });
        setSrc(reader.result);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const onDown = (e) => { e.currentTarget.setPointerCapture(e.pointerId); dragRef.current = { px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y }; };
  const onMove = (e) => { if (!dragRef.current) return; setPos(clampPos({ x: dragRef.current.ox + (e.clientX - dragRef.current.px), y: dragRef.current.oy + (e.clientY - dragRef.current.py) })); };
  const onUp = () => { dragRef.current = null; };

  const apply = () => {
    const cv = document.createElement("canvas");
    cv.width = O; cv.height = O;
    const ctx = cv.getContext("2d");
    const f = O / V;
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, pos.x * f, pos.y * f, dw * f, dh * f); onSave(cv.toDataURL("image/png")); };
    img.src = src;
  };

  const btnBase = { border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.01em", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 };
  const ghost = { ...btnBase, background: "var(--gray-100, #f2f1f5)", color: "var(--ink)" };
  const primary = { ...btnBase, background: "var(--ink)", color: "#fff" };

  const cropView = React.createElement(React.Fragment, null,
    React.createElement("div", {
      onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerCancel: onUp,
      style: { position: "relative", width: V, height: V, margin: "0 auto", borderRadius: 16, overflow: "hidden", background: "var(--gray-150)", cursor: "grab", touchAction: "none" }
    },
      React.createElement("img", { src, draggable: false, style: { position: "absolute", left: pos.x, top: pos.y, width: dw, height: dh, maxWidth: "none", userSelect: "none", pointerEvents: "none" } }),
      React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at center, transparent calc(50% - 1px), rgba(24,22,34,0.42) 50%)" } }),
      React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "50%", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.92)" } })
    ),
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, margin: "16px 2px 4px" } },
      I.search({ size: 15, color: "var(--gray-500)" }),
      React.createElement("input", { type: "range", min: 1, max: 3, step: 0.01, value: zoom, onChange: (e) => setZoom(parseFloat(e.target.value)), style: { flex: 1, accentColor: "var(--brand-purple)" } })
    ),
    React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 14 } },
      React.createElement("button", { type: "button", style: { ...ghost, flex: "0 0 auto" }, onClick: () => setSrc(null) }, "Trocar imagem"),
      React.createElement("button", { type: "button", style: { ...primary, flex: 1 }, onClick: apply }, I.check({ size: 16, color: "#fff" }), "Aplicar logo")
    )
  );

  const pickView = React.createElement(React.Fragment, null,
    React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 16 } },
      React.createElement(CompanyLogo, { empresa, logo, size: 76 })
    ),
    React.createElement("div", {
      onClick: () => fileRef.current && fileRef.current.click(),
      onDragOver: (e) => { e.preventDefault(); setOver(true); },
      onDragLeave: () => setOver(false),
      onDrop: (e) => { e.preventDefault(); setOver(false); loadFile(e.dataTransfer.files && e.dataTransfer.files[0]); },
      style: { border: `2px dashed ${over ? "var(--brand-purple)" : "var(--gray-200, #d9d7e0)"}`, borderRadius: 16, padding: "26px 18px", textAlign: "center", cursor: "pointer", background: over ? "var(--tint-lavender-200, #efebfb)" : "transparent", transition: "all .15s var(--ease-out)" }
    },
      React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 9, color: "var(--gray-500)" } }, I.camera({ size: 26, color: "var(--gray-500)" })),
      React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" } }, "Arraste uma imagem aqui"),
      React.createElement("div", { style: { fontSize: 12, color: "var(--gray-500)", fontWeight: 500, marginTop: 2 } }, "ou clique para escolher do computador")
    ),
    React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => loadFile(e.target.files && e.target.files[0]) }),
    logo && React.createElement("button", { type: "button", onClick: onRemove, style: { ...btnBase, marginTop: 14, width: "100%", background: "transparent", color: "var(--brand-orange-deep)", boxShadow: "inset 0 0 0 1px var(--gray-150)" } },
      I.x({ size: 15, color: "var(--brand-orange-deep)" }), "Remover logo · usar iniciais"
    )
  );

  return React.createElement("div", {
    onClick: (e) => { if (e.target === e.currentTarget) onClose(); },
    style: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(24,22,34,0.34)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, pointerEvents: "auto" }
  },
    React.createElement("div", { style: { width: 340, maxWidth: "100%", background: "var(--white)", borderRadius: 22, boxShadow: "var(--shadow-lg, 0 24px 60px rgba(20,18,30,0.3))", padding: "20px 22px 22px", animation: "ccPop .18s var(--ease-out)" } },
      React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 } },
        React.createElement("div", { style: { lineHeight: 1.25 } },
          React.createElement("div", { style: { fontWeight: 800, fontSize: 16, color: "var(--ink)", letterSpacing: "-0.03em" } }, "Logo da empresa"),
          React.createElement("div", { style: { fontSize: 12, color: "var(--gray-500)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 250 } }, empresa)
        ),
        React.createElement("button", { type: "button", title: "Fechar", onClick: onClose, style: { border: "none", background: "var(--gray-100, #f2f1f5)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-600)", flex: "0 0 auto" } }, I.x({ size: 16, color: "var(--gray-600)" }))
      ),
      src ? cropView : pickView
    )
  );
}

/* ---------- Doca flutuante de rodapé: empresa · scores · demandas ---------- */
function FooterDock({ cliente, geral, pilares }) {
  const glass = { background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", boxShadow: "var(--shadow-card), var(--ring-hairline)", borderRadius: 999 };
  const logoKey = "sol_logo_" + (cliente.empresa || "").toLowerCase().replace(/\s+/g, "_");
  const [logo, setLogo] = React.useState(() => { try { return localStorage.getItem(logoKey) || null; } catch (e) { return null; } });
  const [editing, setEditing] = React.useState(false);
  const saveLogo = (url) => { try { url ? localStorage.setItem(logoKey, url) : localStorage.removeItem(logoKey); } catch (e) {} setLogo(url); setEditing(false); };
  const divider = React.createElement("div", { style: { width: 1, alignSelf: "stretch", background: "var(--gray-150)", margin: "4px 0" } });
  const keys = Object.keys(pilares);
  const overallSize = 50, oStroke = 7, oR = (overallSize - oStroke) / 2, oC = 2 * Math.PI * oR, oOff = oC * (1 - geral.pct);
  return React.createElement("div", { style: { position: "fixed", left: 0, right: 0, bottom: 18, zIndex: 40, padding: "0 24px", pointerEvents: "none", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 } },
    // ESQUERDA — agrupamento da empresa
    React.createElement("div", { style: { ...glass, pointerEvents: "auto", padding: "9px 16px 9px 11px", display: "flex", alignItems: "center", gap: 11, maxWidth: 320 } },
      React.createElement(CompanyLogo, { empresa: cliente.empresa, logo, onEdit: () => setEditing(true) }),
      React.createElement("div", { style: { lineHeight: 1.25, minWidth: 0 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5 } },
          React.createElement("span", { style: { fontWeight: 800, fontSize: 14.5, color: "var(--ink)", letterSpacing: "-0.03em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, cliente.empresa),
          React.createElement("button", { type: "button", title: "Trocar de cliente", onClick: () => { /* TODO: abrir seletor de cliente (a elaborar) */ }, style: { border: "none", background: "transparent", padding: 1, margin: 0, cursor: "pointer", display: "flex", color: "var(--gray-500)", flex: "0 0 auto" } }, I.chevronDown({ size: 15, color: "var(--gray-500)" }))
        ),
        React.createElement("div", { style: { fontSize: 11.5, color: "var(--gray-500)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, `${cliente.categoria} · ${cliente.cidade}/${cliente.estado} · ${cliente.plano}`)
      )
    ),
    // CENTRO — scores, média primeiro e depois os 3 pilares
    React.createElement("div", { style: { ...glass, pointerEvents: "auto", position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", padding: "8px 16px", display: "flex", alignItems: "center" } },
      React.createElement("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 11, paddingRight: 16 } },
        React.createElement("div", { style: { position: "relative", width: overallSize, height: overallSize } },
          React.createElement("svg", { width: overallSize, height: overallSize, style: { transform: "rotate(-90deg)" } },
            React.createElement("circle", { cx: overallSize / 2, cy: overallSize / 2, r: oR, fill: "none", stroke: "var(--gray-150)", strokeWidth: oStroke }),
            React.createElement("circle", { cx: overallSize / 2, cy: overallSize / 2, r: oR, fill: "none", stroke: "var(--brand-purple)", strokeWidth: oStroke, strokeLinecap: "round", strokeDasharray: oC, strokeDashoffset: oOff, style: { transition: "stroke-dashoffset .5s var(--ease-out)" } })
          ),
          React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color: "var(--ink)", letterSpacing: "-0.04em" } }, pct(geral.pct))
        ),
        React.createElement("div", { style: { lineHeight: 1.15 } },
          React.createElement("div", { style: { fontWeight: 800, fontSize: 13, color: "var(--ink)", letterSpacing: "-0.02em" } }, "Score do cliente"),
          React.createElement("div", { style: { fontSize: 10.5, color: "var(--gray-500)", fontWeight: 600 } }, `${geral.completos}/${geral.total} completos`),
          geral.criticoFuro && React.createElement("div", { style: { fontSize: 10, color: "var(--brand-orange-deep)", fontWeight: 700 } }, "teto por crítico")
        )
      ),
      divider,
      React.createElement("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 16, paddingLeft: 16 } },
        keys.map((k) => React.createElement(PillarMini, { key: k, value: pilares[k].pct, color: PILARES[k].cor, rotulo: PILARES[k].rotulo }))
      )
    ),
    // DIREITA — demandas em blocos menores
    React.createElement("div", { style: { ...glass, pointerEvents: "auto", padding: "9px 6px", display: "flex", alignItems: "center" } },
      React.createElement(DemandBlock, { icon: I.building, tone: "var(--brand-orange-deep)", value: geral.pendNos, label: "p/ nós", title: "Pendentes por ação nossa" }),
      divider,
      React.createElement(DemandBlock, { icon: I.user, tone: "var(--gray-600)", value: geral.pendCliente, label: "p/ cliente", title: "Aguardam insumo do cliente" })
    ),
    editing && React.createElement(LogoEditor, { empresa: cliente.empresa, logo, onSave: saveLogo, onRemove: () => saveLogo(null), onClose: () => setEditing(false) })
  );
}

/* ---------- Trilho vertical de produtos (etapas, só ícones) ---------- */
const PROD_ICON = { destaque: "sparkles", google: "search", solusite: "globe", social: "share" };

function ProductRail({ produtos, activeId, onJump }) {
  const [hover, setHover] = React.useState(null);
  return React.createElement("nav", { "aria-label": "Produtos do cliente", style: { position: "fixed", left: 18, top: "50%", transform: "translateY(-50%)", zIndex: 45 } },
    React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "16px 11px", background: "var(--glass-white)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", borderRadius: 999, boxShadow: "var(--shadow-card), var(--ring-hairline)", transform: "scale(0.5)", transformOrigin: "left center" } },
      // linha conectora (sensação de etapas)
      React.createElement("div", { style: { position: "absolute", top: 30, bottom: 30, width: 2.5, background: "var(--gray-150)", borderRadius: 2, zIndex: 0 } }),
      produtos.map((p) => {
        const ag = agregar(p.itens, PESO);
        const on = activeId === p.id;
        const Icon = I[PROD_ICON[p.id]] || I.sparkles;
        const size = 46, r = (size - 4) / 2, c = 2 * Math.PI * r, off = c * (1 - ag.pct);
        return React.createElement("button", {
          key: p.id, onClick: () => onJump(p.id),
          onMouseEnter: () => setHover(p.id), onMouseLeave: () => setHover((h) => (h === p.id ? null : h)),
          title: p.nome,
          style: { position: "relative", zIndex: 1, width: size, height: size, border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" },
        },
          React.createElement("svg", { width: size, height: size, style: { position: "absolute", inset: 0, transform: "rotate(-90deg)" } },
            React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "var(--gray-150)", strokeWidth: 3.25 }),
            React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: p.cor, strokeWidth: 3.25, strokeLinecap: "round", strokeDasharray: c, strokeDashoffset: off, style: { transition: "stroke-dashoffset .5s var(--ease-out)" } })
          ),
          React.createElement("span", { style: { width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: on ? "var(--ink)" : "var(--white)", boxShadow: on ? "none" : "inset 0 0 0 1px var(--gray-150)", transition: "background var(--dur-base) var(--ease-out)" } },
            Icon({ size: 18, color: on ? "#fff" : p.cor })
          ),
          hover === p.id && React.createElement("div", { style: { position: "absolute", left: size + 13, top: "50%", transform: "translateY(-50%) scale(1.5)", transformOrigin: "left center", whiteSpace: "nowrap", background: "var(--ink)", color: "#fff", padding: "8px 13px", borderRadius: 12, boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 1, pointerEvents: "none" } },
            React.createElement("span", { style: { position: "absolute", left: -4, top: "50%", transform: "translateY(-50%) rotate(45deg)", width: 9, height: 9, background: "var(--ink)", borderRadius: 2 } }),
            React.createElement("span", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em" } }, p.nome),
            React.createElement("span", { style: { fontSize: 11.5, color: "rgba(255,255,255,0.6)", fontWeight: 600 } }, `${pct(ag.pct)}% · ${ag.completos}/${ag.total} itens`)
          )
        );
      })
    )
  );
}

window.SOL_UI = { Gauge, TopBar, FooterDock, ProductRail };
