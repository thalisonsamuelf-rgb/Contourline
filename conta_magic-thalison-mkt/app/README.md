# AIOX Design Starter

Runtime local-first para criar, editar, validar e exportar superfícies de brandbook e site sem depender do `workspace/**` como fonte primária.

Este app não nasceu para ser apenas uma vitrine de componentes. Ele foi criado para resolver um problema estrutural do ecossistema AIOX: o design system canônico, os conteúdos editoriais e os dados de negócio estavam acoplados demais ao monorepo e ao workspace interno. Isso dificultava três coisas ao mesmo tempo:

1. Evoluir a experiência AIOX sem quebrar a base white-label.
2. Criar variantes leves para outras marcas sem copiar o app inteiro.
3. Levar o starter para outros repositórios sem carregar dependências estruturais de `aiox-stage`.

## Intenção

O `aiox-design-starter` existe para ser a camada intermediária entre:

- a implementação canônica da marca AIOX
- contratos locais editáveis por YAML
- presets e variantes white-label
- exportação standalone para outros repositórios

Em termos práticos, ele foi criado para permitir que a equipe:

- edite branding, chrome, navegação, conteúdo e temas localmente
- use o `workspace` apenas como bridge opcional, e não como fonte obrigatória
- prove paridade visual com AIOX quando necessário
- rode o mesmo runtime com variantes override-only
- exporte o app como artefato autocontido

## O Que Ele É

- Um app Next.js que renderiza superfícies de brandbook/site a partir de contratos locais.
- Um tenant runtime com dois modos de fonte: `starter` e `workspace`.
- Um sistema de variantes com herança base -> override.
- Um host para presets locais, incluindo um preset AIOX 100% local.
- Um artefato exportável para outros repositórios.

## O Que Ele Não É

- Não é o substituto do `workspace/businesses/*`.
- Não é apenas um espelho de `apps/aiox-design-system`.
- Não é um template genérico sem opinião arquitetural.
- Não deve depender de conteúdo hardcoded espalhado nos renderers.
- Não deve depender estruturalmente de `packages/*` do monorepo para existir em outro repositório.

## Princípios Arquiteturais

### 1. Local-first

O starter deve funcionar sem `BUSINESS_SLUG` e sem `workspace`.

A fonte primária de verdade para o app é o conjunto de contratos locais em `starter/`, não o `workspace`. O bridge para `workspace` existe para importação, validação e paridade, não como dependência de operação diária.

### 2. Contract-driven

Branding, navegação, content seeds, tema e metadata devem viver em contratos explícitos, principalmente YAML, em vez de permanecerem espalhados em seeds TypeScript difíceis de editar.

### 3. Variantes leves

Uma variante deve sobrescrever apenas o necessário. O diff ideal de uma variante deve representar identidade e override reais, não cópia massiva do contrato base.

### 4. Conteúdo separado de renderer

O app foi evoluído para reduzir copy hardcoded em TSX. O objetivo é facilitar edição editorial, reduzir regressões visuais e deixar os componentes focados em layout/render.

### 5. Tema semântico

Accent, estados e destaques devem reagir ao tema ativo. O starter não deve vazar `lime` hardcoded nem confundir identidade visual com token legado.

### 6. Preset local canônico

A marca AIOX deve poder ser ativada localmente, sem depender de `workspace` nem de outro app em runtime.

### 7. Portabilidade real

O starter deve poder sair deste monorepo como artefato autocontido. Por isso, as dependências editoriais que antes viviam em `packages/*` foram vendorizadas em `src/vendor/**` e o fluxo de export standalone passou a fazer parte do próprio app.

## Estrutura Principal

- `starter/`
  Fonte local do contrato base do app. A documentação de uso e intenção fica neste README de root.
- `starter/site.config.yaml`
  Branding global, SEO, navegação, assets, footer e feature flags.
- `starter/design-system.config.yaml`
  Temas, apps bindings, tokens e governança do design system local.
- `starter/content/*.yaml`
  Conteúdo contratual por surface.
- `starter/variants/<slug>/`
  Overrides locais por variante.
- `src/lib/tenant/`
  Runtime que resolve `starter`, `variant` e `workspace bridge`.
- `src/components/brandbook/`
  Renderers, páginas e dados editoriais do brandbook.
- `src/vendor/`
  Dependências editoriais internalizadas para portabilidade standalone.
- `scripts/sync-dtcg-tokens.cjs`
  Gera o bridge de tokens e seleciona o preset ativo.
- `scripts/scaffold-starter-variant.cjs`
  Cria variantes no formato override-only.
- `scripts/export-standalone-app.cjs`
  Exporta o app como artefato standalone para outro diretório.

## Modos De Operação

### 1. Starter default

Usa somente os contratos locais base:

```bash
npm run dev
```

### 2. Variante local

Usa `starter/variants/<slug>/` com merge base -> override:

```bash
STARTER_VARIANT=variant2 npm run dev
```

### 3. Workspace bridge opcional

Importa temporariamente um business interno do monorepo:

```bash
STARTER_SOURCE=workspace BUSINESS_SLUG=aiox WORKSPACE_ROOT=../.. npm run dev
```

Esse modo existe para validação e importação. Ele não substitui a filosofia local-first.

### 4. Preset local AIOX

O preset `variant3` existe para ativar a marca AIOX sem workspace bridge:

```bash
STARTER_VARIANT=variant3 npm run dev
```

Esse preset usa apenas arquivos locais de dados, tokens e assets.

## Fluxo De Trabalho Recomendado

1. Edite contratos locais primeiro.
2. Use variantes para experimentar identidade, não para duplicar base.
3. Use `workspace bridge` só quando precisar importar ou validar uma fonte interna.
4. Só depois decida se a mudança deve voltar para o canônico AIOX.
5. Quando precisar levar o app para outro repositório, use o export standalone.

## Comandos Principais

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:tenant-runtime
npm run scaffold:variant -- --slug=<slug> --name="<name>" --force
npm run tokens:sync:write
npm run export:standalone -- --target=../aiox-imersao/app
```

## Export Standalone

O fluxo de export existe porque o starter deixou de ser somente um app interno e passou a ser também um artefato transportável.

Objetivo do export:

- copiar o app com contratos, scripts e assets essenciais
- preservar os aliases e dependências locais necessárias
- evitar dependência estrutural de `../../packages/*`
- materializar uma cópia autocontida em outro repositório

Destino atual de referência:

- `../aiox-imersao/app/`

Importante:

- o export leva o app e seus arquivos de runtime
- dependências npm continuam sendo instaladas no repositório de destino
- a cópia exportada deve ser tratada como artefato derivado do starter

## Decisões Que Moldaram O Starter

### Contract hardening

O starter deixou de depender de fallbacks TS para navegação granular e token export blocks. Esses blocos passaram para o contrato YAML, reforçando o modelo contract-driven.

### Variant inheritance

O runtime passou a fazer merge profundo base -> variante, permitindo variantes override-only.

### Guidelines content extraction

O conteúdo editorial do `guidelines-page` foi separado do renderer para facilitar edição e reduzir regressão.

### Movimento editorial standardization

O brandbook principal foi empurrado para um padrão mais canônico de conteúdo centralizado, principalmente para sidebar, chrome de seções e copy estrutural.

### Theme color hardening

Os componentes passaram a responder ao tema ativo com accent semântico, em vez de manter verde fixo por hardcode.

### Workspace AIOX parity

O modo `workspace` passou a provar paridade visual real com AIOX, especialmente em guidelines e font setup.

### Local AIOX preset

O preset `variant3` formalizou a capacidade de rodar AIOX localmente sem bridge externa.

### Standalone export

O starter foi ajustado para sair do monorepo como app standalone, com dependências editoriais internalizadas e configs portáveis.

## Mapa De Stories

Os stories abaixo explicam a evolução do app e o motivo das decisões atuais:

- `docs/stories/2026-03-18-aiox-design-starter-contract-hardening.story.md`
- `docs/stories/2026-03-18-aiox-design-starter-variant-inheritance.story.md`
- `docs/stories/2026-03-18-aiox-design-starter-guidelines-content-extraction.story.md`
- `docs/stories/2026-03-18-aiox-design-starter-movimento-editorial-standardization.story.md`
- `docs/stories/2026-03-18-aiox-design-starter-theme-color-hardening.story.md`
- `docs/stories/2026-03-18-aiox-design-starter-workspace-aiox-parity.story.md`
- `docs/stories/2026-03-18-aiox-design-starter-local-aiox-preset.story.md`
- `docs/stories/2026-03-19-aiox-design-starter-standalone-export-to-aiox-imersao.story.md`

## Leitura Complementar

- `starter/variants/variant3/README.md`
  Resumo rápido do preset local AIOX.

## Regra Prática

Se você estiver em dúvida sobre como evoluir o starter, use esta hierarquia:

1. Preferir contrato local a hardcode.
2. Preferir override pequeno a cópia grande.
3. Preferir preset local a bridge permanente.
4. Preferir export autocontido a dependência implícita do monorepo.

Essa é a intenção do projeto. O problema não é apenas renderizar páginas bonitas. O problema que ele resolve é permitir que identidade visual, chrome, conteúdo e tema sejam operados como sistema portátil, editável e comprovável.
