/* ============================================================
   Painel lateral de Tweaks — estilo dos cards do checklist.
   Escolhe a skin do estado ATIVO e do INATIVO, com preview real.
   value = { ativo, inativo }; onChange aplica ao app inteiro.
   ============================================================ */
const TwI = window.SOL_ICONS;

function CardStyleTweaks({ value, onChange, open, onOpenChange }) {
  const SK = window.SOL_SKINS;
  const [tab, setTab] = React.useState("ativo");
  const setOpenP = (v) => onOpenChange(v);

  const list = tab === "ativo" ? SK.ACTIVE : SK.INACTIVE;
  const sel = tab === "ativo" ? (value.ativo || 0) : (value.inativo || 0);
  const setSel = (i) => onChange(tab === "ativo" ? { ...value, ativo: i } : { ...value, inativo: i });

  if (!open) {
    return React.createElement("button", {
      type: "button", onClick: () => setOpenP(true), title: "Abrir tweaks de estilo",
      style: { position: "fixed", top: 76, right: 20, zIndex: 80, display: "flex", alignItems: "center", gap: 8, padding: "10px 15px", borderRadius: 999, border: "none", cursor: "pointer", background: "var(--ink)", color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", boxShadow: "var(--shadow-md, 0 10px 30px rgba(21,21,21,0.18))" },
    }, TwI.sparkles({ size: 15, color: "#fff" }), "Estilo dos cards");
  }

  const tabBtn = (id, label, count) => {
    const active = tab === id;
    return React.createElement("button", { type: "button", onClick: () => setTab(id),
      style: { flex: 1, border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 10px", background: active ? "var(--ink)" : "transparent", color: active ? "#fff" : "var(--gray-500)", fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.01em", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "color var(--dur-fast) var(--ease-out)" } },
      label, React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, opacity: 0.65 } }, count));
  };

  return React.createElement("div", {
    style: { position: "fixed", top: 76, right: 20, zIndex: 80, width: 340, maxWidth: "calc(100vw - 40px)", maxHeight: "calc(100vh - 120px)", background: "var(--white)", borderRadius: 20, boxShadow: "var(--shadow-lg, 0 24px 60px rgba(20,18,30,0.28)), var(--ring-hairline, inset 0 0 0 1px var(--gray-150))", display: "flex", flexDirection: "column", overflow: "hidden" },
  },
    // header
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "15px 16px 12px" } },
      React.createElement("div", { style: { width: 32, height: 32, borderRadius: 10, background: "var(--grad-brand)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, TwI.sparkles({ size: 16, color: "#fff" })),
      React.createElement("div", { style: { lineHeight: 1.2, flex: 1, minWidth: 0 } },
        React.createElement("div", { style: { fontSize: 14.5, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em" } }, "Estilo dos cards"),
        React.createElement("div", { style: { fontSize: 11.5, fontWeight: 500, color: "var(--gray-500)" } }, "Teste o design dos itens do checklist")
      ),
      React.createElement("button", { type: "button", onClick: () => setOpenP(false), title: "Fechar", style: { border: "none", background: "var(--gray-100)", width: 30, height: 30, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-500)", flex: "0 0 auto" } }, TwI.x({ size: 16, color: "var(--gray-500)" }))
    ),
    // tabs
    React.createElement("div", { style: { display: "flex", gap: 3, margin: "0 16px 10px", padding: 4, borderRadius: 999, background: "var(--gray-100)" } },
      tabBtn("ativo", "Ativos", SK.ACTIVE.length),
      tabBtn("inativo", "Inativos", SK.INACTIVE.length)
    ),
    // lista de opções (scroll)
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "2px 16px 14px", display: "flex", flexDirection: "column", gap: 14 } },
      list.map((def, i) => {
        const selected = i === sel;
        return React.createElement("button", { key: `${tab}-${i}`, type: "button", onClick: () => setSel(i),
          style: { display: "block", width: "100%", textAlign: "left", border: "none", cursor: "pointer", background: "transparent", padding: 0 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, margin: "0 2px 7px" } },
            React.createElement("span", { style: { width: 16, height: 16, borderRadius: "50%", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", background: selected ? "var(--brand-purple)" : "transparent", boxShadow: selected ? "none" : "inset 0 0 0 1.6px var(--gray-200)" } }, selected && TwI.check({ size: 10, color: "#fff", sw: 3 })),
            React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" } }, def.nome),
            def.oficial && React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 3, padding: "1px 7px", borderRadius: 999, background: "var(--tint-mint)", color: "var(--success)", fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em" } }, "Oficial"),
            React.createElement("span", { style: { marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "var(--gray-300)" } }, String(i + 1).padStart(2, "0"))
          ),
          React.createElement("div", { style: { borderRadius: 16, padding: 4, background: selected ? "var(--tint-lavender)" : "var(--gray-100)", boxShadow: selected ? "0 0 0 2px var(--brand-purple)" : "none", transition: "box-shadow var(--dur-fast) var(--ease-out)" } },
            React.createElement("div", { style: { pointerEvents: "none" } }, SK.previewSkin(tab, i))
          )
        );
      })
    ),
    // rodapé
    React.createElement("div", { style: { padding: "11px 16px", borderTop: "1px solid var(--gray-100)", display: "flex", alignItems: "center", gap: 8 } },
      React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "var(--success)", flex: "0 0 auto", animation: "solPulseGlow 1.9s var(--ease-out) infinite" } }),
      React.createElement("span", { style: { fontSize: 11, fontWeight: 500, color: "var(--gray-500)", lineHeight: 1.3 } }, "Pulsar é a animação oficial dos cards ativos no momento.")
    )
  );
}

window.SOL_TWEAKS = { CardStyleTweaks };
