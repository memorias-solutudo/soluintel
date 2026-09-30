# Processo — do cadastro Solutudo à central do parceiro

**Status:** vigente desde 30/09/2026 · primeiro caso pelo processo: **Grupo Execon** (ID 23008544)
**Onde está na tela:** hub de parceiros, bloco **"Começar um parceiro · API do cadastro"**, no topo
(`artefatos/parceiros/#comecar`) — gerador de link por ID, o fluxo em seis passos e as melhorias.

---

## 1. O código

Só a ID muda de um parceiro para outro:

```text
https://api.solutudo.com/ad_costumer_core/ad_costumer_core/getData?key=<CHAVE>&id=<ID>
```

**A chave não é gravada em nenhum arquivo deste repositório.** O repositório e o site são
públicos, e a API devolve o nome, o telefone e o e-mail do patrocinador — dado pessoal. A chave
fica em dois lugares só: no navegador de quem usa o gerador do hub (colada uma vez, guardada
localmente) e, quando a automação for ligada, na variável de ambiente `SOLUTUDO_API_KEY` (§3).

## 2. O processo de hoje

| # | Passo | Quem |
|---|---|---|
| 1 | Pegar a ID na lista de clientes Solutudo | pessoa |
| 2 | Trocar a ID no fim do link (o gerador do hub faz isso) | pessoa |
| 3 | Abrir a API no navegador | pessoa |
| 4 | Copiar todo o conteúdo e colar na conversa com o Claude | pessoa |
| 5 | Agentes na curadoria: descoberta em 4 ângulos → verificação adversarial → redação e pauta → auditoria de indexação → supervisão | Claude |
| 6 | Central publicada: Destaque, Solusite e Conteúdo, com notas antes e depois e pendências do CS | Claude |

O pipeline do passo 5 é o de `.claude/skills/empresa-3-0/SKILL.md`, com os agentes de
`.claude/agents/`. As regras são as de sempre: `descricao-empresa-3-0.md`, `solusite-padrao.md`
e `editorias-conteudo.md`, incluindo a declaração de acesso às fontes (§1.1 das editorias).

## 3. Para automatizar — em ordem de ganho

1. **Liberar `api.solutudo.com` na rede do ambiente do Claude.** Em 30/09/2026 o domínio deu 403
   no proxy de saída desta sessão. Liberado (configurações do ambiente → acesso à rede → domínios
   permitidos), o Claude busca o cadastro sozinho: a entrada passa a ser só a ID, ou uma lista de
   IDs, e os passos 3 e 4 somem. Some também o risco de colar JSON cortado — o da Execon tinha cerca
   de 70 mil caracteres.
2. **Chave como segredo do ambiente**, em `SOLUTUDO_API_KEY`. O Claude lê a chave dali; ela não
   passa pelo chat nem pelo repositório. Ao mudar para o ambiente, vale gerar uma chave nova, já que
   a atual circulou em conversa.
3. **Fila por lista de IDs.** Cada parceiro entra no hub como `diagnostico` e sobe para `completa`,
   no mesmo `parceiros.js` que já existe.
4. **Foto datada do cadastro a cada rodada**, sem os campos do patrocinador. Mede o antes e o depois
   e mostra o que o time já mudou entre uma rodada e outra.
5. **Uma versão da API sem os dados do patrocinador.** Nenhuma análise usa esses campos.

## 4. O que nunca muda

- O JSON colado é fonte **COLADO** na declaração de acesso às fontes; os links que ele aponta
  (site, redes, Solusite) entram como **LIDO** ou **NÃO ACESSADO**, em evidência.
- Os campos do patrocinador são internos e nunca vão a texto publicado.
- A data de fundação da pesquisa do contrato (`12/05/1999` em seis de seis parceiros) é
  valor-padrão: não é fato nem conflito.
