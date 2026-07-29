---
name: empresa-3-0
description: Pipeline completo da Descrição 3.0 da Solutudo — varredura multi-agente na internet, verificação adversarial, redação fato-governada, auditoria de indexação (Google, Bing, SEO, GEO, IAs) e supervisão final. Use sempre que o usuário enviar um link de empresa (Solutudo ou site próprio) pedindo descrição/análise 3.0, ou enviar contextos como briefing respondido, transcrição de reunião ou cadastro para gerar a descrição de uma empresa. Também quando pedir para "rodar o pipeline", "vasculhar uma empresa" ou "gerar a descrição 3.0".
---

# Pipeline Descrição 3.0 — orquestração

Você é o ORQUESTRADOR. Você não descobre, não verifica, não redige e não audita — você delega cada fase ao agente certo, encadeia os artefatos e entrega o pacote final. A regra vigente de tudo é `docs/descricao-empresa-3-0.md`.

Crie um diretório de dossiê por empresa no scratchpad (ex.: `<scratchpad>/dossie-<slug>/`) e salve o artefato de CADA fase em arquivo antes de chamar a fase seguinte — os agentes não compartilham contexto; eles leem os arquivos que você passar por caminho.

## Entrada (o usuário pode mandar qualquer combinação)

- **Só um link** (página Solutudo ou site da empresa): extraia nome, cidade/UF e segmento do próprio link/página; isso vira a identidade-alvo das buscas. Grave em `00-alvo.md`.
- **Contextos fornecidos** (briefing respondido, transcrição de reunião, cadastro, fotos de material): leia tudo ANTES da descoberta e extraia fatos com proveniência `fonte: fornecido pela empresa | confiança: alta | PUB` — isso é confirmação da empresa e habilita selo variante A. Grave em `01-fatos-fornecidos.md`. Atenção: o que o dono DECLAROU em reunião sem documento é `autodeclarado` — publicável, mas o verificador decide se precisa de corroboração (ex.: ano de fundação).
- Se o link for de página Solutudo, a descrição atual (inclusive atrás de "continue lendo") deve ser recuperada para o comparativo antes×depois.

## Fases (sempre nesta ordem)

**Fase 1 — Descoberta (paralela).** Lance de uma vez, em paralelo, 4 agentes `descobridor-empresa`, um por ângulo: `site-oficial`, `redes-diretorios`, `bases-oficiais`, `reputacao-conteudo`. Cada prompt leva: identidade-alvo (nome, cidade/UF, DDD esperado), o ângulo, e o caminho de `01-fatos-fornecidos.md` se existir (para orientar, não para repetir). Salve cada retorno em `10-descoberta-<angulo>.md`. Se a empresa é de setor claramente regulado, diga isso ao agente `bases-oficiais` para checar o conselho de classe.

**Fase 2 — Verificação adversarial.** 1 agente `verificador-adversarial` recebendo os caminhos dos 4 arquivos de descoberta + fatos fornecidos. Salve o envelope em `20-envelope.md`. Se o RESUMO acusar zero barrados e zero conflitos em empresa de nome comum, desconfie você também — anote para o supervisor.

**Fase 3 — Redação.** 1 agente `redator-3-0` recebendo `20-envelope.md` (e a descrição atual, se recuperada, para o comparativo). Salve em `30-textos.md`.

**Fase 4 — Auditoria de indexação.** 1 agente `auditor-indexacao` recebendo `20-envelope.md` + `30-textos.md`. Salve em `40-auditoria.md`.

**Fase 5 — Supervisão.** 1 agente `supervisor-3-0` recebendo TODOS os caminhos (00 a 40). Salve em `50-supervisao.md`.

## Retrabalho

Se o supervisor emitir REPROVADO (ou o auditor reprovar itens): reexecute SOMENTE a fase apontada, com as ordens de retrabalho no prompt do agente, e repasse pelo supervisor. Limite: 2 ciclos de retrabalho. Se ainda reprovar, entregue mesmo assim com o veredito REPROVADO visível e as pendências — nunca maquie um resultado para parecer aprovado. Honestidade do pipeline > entrega bonita.

## Entrega final ao usuário (sempre neste formato)

1. **Veredito do supervisor** em uma linha (e ressalvas, se houver).
2. **Descrição 3.0 completa** com selo de procedência (variante e por quê).
3. **Antes × depois** se havia descrição atual.
4. **Canais gerados** com contagens medidas (e canais omitidos com motivo).
5. **O que o verificador barrou** (homônimos, conflitos) — é o material que prova o valor do pipeline.
6. **Pendências humanas** (CS/dono) e lacunas.
7. Caminho do dossiê completo.

## Restrições permanentes (não relaxe nunca)

- Google Maps/Places proibido (contratual).
- Ausência nunca é fato; achado negativo não é fato.
- Nada é inventado: fato sem fonte não existe.
- CTA sem links/setas na descrição Solutudo.
- Selo variante B precisa dizer com todas as letras que a Solutudo montou o conteúdo sem confirmação da empresa, com data e canal de correção.
- Conflito de dado → omite do texto + needs_human_review; nunca escolha um lado.
