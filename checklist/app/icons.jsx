/* Inline stroke icons (Lucide-style: 1.75 stroke, rounded joins).
   Returned as React elements so they re-render cleanly. */

function Ic({ d, size = 18, sw = 1.75, fill = "none", color = "currentColor", children, vb = 24 }) {
  return React.createElement("svg", {
    width: size, height: size, viewBox: `0 0 ${vb} ${vb}`, fill,
    stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block" },
  }, children || React.createElement("path", { d }));
}

const Icons = {
  // etapas da jornada
  descoberta: (p) => React.createElement(Ic, p, React.createElement("circle", { cx: 11, cy: 11, r: 7 }), React.createElement("path", { d: "m21 21-4.3-4.3" })),
  avaliacao: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), React.createElement("path", { d: "m9 12 2 2 4-4" })),
  experiencia: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" })),
  // lentes
  conteudo: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M8 6h13M8 12h13M8 18h13" }), React.createElement("path", { d: "M3 6h.01M3 12h.01M3 18h.01" })),
  visual: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" }), React.createElement("circle", { cx: 12, cy: 12, r: 3 })),
  autenticidade: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M12 3l1.9 4.6 5 .4-3.8 3.3 1.2 4.9L12 13.8 7.7 16.2l1.2-4.9L5.1 8l5-.4L12 3Z" })),
  // controles
  check: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M20 6 9 17l-5-5" })),
  plus: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M12 5v14M5 12h14" })),
  camera: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" }), React.createElement("circle", { cx: 12, cy: 13, r: 3.5 })),
  paperclip: (p) => React.createElement(Ic, p, React.createElement("path", { d: "m21.4 11.1-9.2 9.2a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5" })),
  alert: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" }), React.createElement("path", { d: "M12 9v4M12 17h.01" })),
  user: (p) => React.createElement(Ic, p, React.createElement("circle", { cx: 12, cy: 8, r: 4 }), React.createElement("path", { d: "M4 21a8 8 0 0 1 16 0" })),
  building: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" }), React.createElement("path", { d: "M15 9h2a2 2 0 0 1 2 2v10M9 8h2M9 12h2M9 16h2" })),
  arrowRight: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" })),
  arrowLeft: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M19 12H5M11 18l-6-6 6-6" })),
  chevronDown: (p) => React.createElement(Ic, p, React.createElement("path", { d: "m6 9 6 6 6-6" })),
  sparkles: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3Z" }), React.createElement("path", { d: "M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" })),
  trash: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }), React.createElement("path", { d: "M10 11v6M14 11v6" })),
  edit: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M12 20h9" }), React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" })),
  refresh: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M3 12a9 9 0 0 1 15-6.7L21 8" }), React.createElement("path", { d: "M21 3v5h-5" }), React.createElement("path", { d: "M21 12a9 9 0 0 1-15 6.7L3 16" }), React.createElement("path", { d: "M3 21v-5h5" })),
  copy: (p) => React.createElement(Ic, p, React.createElement("rect", { x: 9, y: 9, width: 12, height: 12, rx: 2, ry: 2 }), React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })),
  download: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M12 3v12M7 10l5 5 5-5" }), React.createElement("path", { d: "M5 21h14" })),
  message: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6a8.5 8.5 0 0 1-.9-3.9A8.38 8.38 0 0 1 12.5 3a8.38 8.38 0 0 1 8.5 8.5Z" })),
  messageDot: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6a8.5 8.5 0 0 1-.9-3.9A8.38 8.38 0 0 1 12.5 3a8.38 8.38 0 0 1 8.5 8.5Z" }), React.createElement("circle", { cx: 12, cy: 11, r: 1.3, fill: "currentColor", stroke: "none" }), React.createElement("circle", { cx: 8, cy: 11, r: 1.3, fill: "currentColor", stroke: "none" }), React.createElement("circle", { cx: 16, cy: 11, r: 1.3, fill: "currentColor", stroke: "none" })),
  x: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })),
  send: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" })),
  // ícones de produto (trilho lateral)
  search: (p) => React.createElement(Ic, p, React.createElement("circle", { cx: 11, cy: 11, r: 7 }), React.createElement("path", { d: "m21 21-4.3-4.3" })),
  globe: (p) => React.createElement(Ic, p, React.createElement("circle", { cx: 12, cy: 12, r: 9 }), React.createElement("path", { d: "M3 12h18" }), React.createElement("path", { d: "M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" })),
  share: (p) => React.createElement(Ic, p, React.createElement("circle", { cx: 18, cy: 5, r: 3 }), React.createElement("circle", { cx: 6, cy: 12, r: 3 }), React.createElement("circle", { cx: 18, cy: 19, r: 3 }), React.createElement("path", { d: "m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" })),
  externalLink: (p) => React.createElement(Ic, p, React.createElement("path", { d: "M15 3h6v6" }), React.createElement("path", { d: "M10 14 21 3" }), React.createElement("path", { d: "M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" })),
};

window.SOL_ICONS = Icons;
