# Epic: aiox-design-starter 100% Agnóstico

> **Status:** Draft
> **Owner:** @architect
> **Priority:** P0
> **Repo:** aiox-imersao
> **App:** apps/aiox-design-starter
> **QA Review:** REOPENED (v3, 5 findings corrigidos: scope drift, emr-brand-data, fronteira v1/v2, números frágeis, acoplamento 5.5b)
> **DS Review:** APPROVED (v1, 6 observações aplicadas inline)

## Contexto

O starter já possui um runtime multi-tenant parcial (`lib/tenant/`), mas hoje ele governa apenas metadata, parte do chrome e parte do tema. O resto (rotas, conteúdo editorial, seeds TS, presets gerados, fontes, assets, integrações) ainda vive hardcoded no código React/CSS/TS.

### Números do problema (aproximados, verificar com grep antes de cada story)

| Dimensão | Atual | Alvo v1 | Alvo v2 |
|----------|-------|---------|---------|
| Rotas page.tsx físicas | 41 | 41 (nav/404 via contrato) | 1 catch-all + pages reservadas |
| Arquivos de seed TS com conteúdo | 10 (6.180 linhas) | 0 (migrados para YAML) | = |
| Componentes de página (.tsx) | 56 | 56 (conteúdo via contrato) | 56 presenters puros |
| Main-sections com dados embutidos | 17 | 17 (dados via YAML) | 17 presenters puros |
| Slides system com dados embutidos | 12 | 12 (dados via YAML) | 12 presenters puros |
| brandbook-sections com dados embutidos | 64 | 64 (parcial via contrato) | 64 presenters puros |
| Arquivos importando starter-brand-data | 65 | Fallback com warning | 0 |
| Referências hardcoded AIOX/Starter | ~80+ (grep) | Reduzido (runtime limpo) | 0 |
| Arquivos .stories.tsx (Storybook) | 260 | 0 (deletados) | = |
| Contratos YAML existentes | 2 configs + 1 content | 9+ contratos canônicos | = |
| Variantes existentes | 23 diretórios | 23 migradas | = |
| Interface de customização | Nenhuma | Agente conversacional `*brand-me` | + Editor web + CLI formal |

### Decisões de produto já travadas

1. **Três interfaces de customização, todas v1:**
   - **CLI no repo** (`npm run tenant:*`): comandos documentados para personalizar por terminal. Interface que o pedido original exigiu
   - **Editor web local** (`/studio`): modo de edição online com persistência local. Interface visual que o pedido original exigiu
   - **Agente conversacional** (`*brand-me`): guia o usuário por conversa natural, sem exigir conhecimento técnico. Camada de UX que torna as outras duas opcionais para quem não quer programar
2. **Library interna como engine.** Funções TS que alimentam as 3 interfaces. CLI, editor e agente chamam as mesmas funções
3. **Tudo configurável** (identidade, conteúdo, dores, tipografia, cores, rotas, assets, navegação)
4. **Arquivos locais git-friendly** como persistência (YAML)
5. **Variantes** como unidade de customização (base intocável por default)
6. **Storybook deletado** (260 arquivos, 6 pacotes, zero consumidor em produção)

### Escopo v1 vs v2

| v1 (este epic) | v2 (futuro) |
|----------------|-------------|
| CLI formal com 13 comandos `tenant:*` | CLI avançada (batch, plugins, CI mode) |
| Editor web `/studio` com 8 painéis | Editor com undo visual, drag-and-drop avançado |
| Agente conversacional `*brand-me` | Agente multi-modal (aceita screenshots, Figma links) |
| Routes.config.yaml controla nav + 404 via middleware | Catch-all dinâmico `[...slug]` substituindo 41 page.tsx |
| 41 page.tsx permanecem, nav/404 lidos do contrato | Pages físicas removidas, renderer registry completo |
| Presenters parciais (conteúdo via contrato, DS pages mantêm demos) | 100% presenters puros para todas as 56 páginas |

### Regras arquiteturais não negociáveis

1. **Um domínio, um contrato canônico.**
   - `themes/*.yaml` e fonte única de verdade para tokens, tipografia, motion e radius.
   - `assets.config.yaml` e fonte única de verdade para slots, paths e alt text de assets.
   - `routes.config.yaml` e fonte única de verdade para páginas navegáveis, ordem, enablement e renderer binding.
   - `design-system.config.yaml` guarda apenas metadata de temas + app bindings + governance. Sem duplicar valores visuais.
   - `editor.config.yaml` não guarda valor de negócio. Só descreve como o editor expõe campos dos contratos canônicos.
2. **Variantes são sparse overrides, não cópias do base.**
   - `tenant:scaffold` cria apenas o delta mínimo + metadata da variante.
   - Se alguém quiser um snapshot completo, isso vira outro comando (`tenant:materialize`), não o default.
3. **Toda rota de app vem de um registry global.**
   - O app pode continuar com páginas reservadas (`/`, `/studio`, `/api`), mas toda página de produto/surface visível ao usuário nasce de contrato.
4. **Todo contrato tem versionamento explícito.**
   - Cada YAML carrega `schema` e `contract_version`.
   - Toda evolução compatível ou breaking do contrato tem migrator oficial e comando `tenant:migrate`.
5. **O cliente nunca escolhe arquivo arbitrário.**
   - CLI e editor enviam `contract_type`, `variant`, `key` e `value`.
   - O servidor resolve o arquivo permitido e valida antes de persistir.

---

## Fase -1: Limpeza (Story -1)

### Story -1: Deletar Storybook 100%

**Objetivo:** Remover toda infraestrutura, arquivos e dependências de Storybook do app.

**Contexto:** 260 arquivos .stories.tsx, 6 pacotes npm, 2 scripts, zero config customizada, zero imports em código de produção. Deleção limpa, sem risco de quebrar o app.

#### Checklist

- [ ] **-1.1** Deletar todos os 260 arquivos `.stories.tsx`:
  - `src/components/brandbook/pages/**/*.stories.tsx` (22 + 13 em main-sections)
  - `src/components/brandbook/atoms/**/*.stories.tsx` (15)
  - `src/components/brandbook/molecules/**/*.stories.tsx` (24)
  - `src/components/brandbook/organisms/**/*.stories.tsx` (5)
  - `src/components/brandbook/chrome/**/*.stories.tsx` (7)
  - `src/components/brandbook/layout/**/*.stories.tsx` (3)
  - `src/components/brandbook/loading/**/*.stories.tsx` (1)
  - `src/components/brandbook/templates/**/*.stories.tsx` (7)
  - `src/components/brandbook-sections/brandbook-main/**/*.stories.tsx` (10)
  - `src/components/brandbook-sections/editorial/**/*.stories.tsx` (11)
  - `src/components/brandbook-sections/foundations/**/*.stories.tsx` (8)
  - `src/components/brandbook-sections/guidelines/**/*.stories.tsx` (2)
  - `src/components/brandbook-sections/motion/**/*.stories.tsx` (10)
  - `src/components/brandbook-sections/patterns/**/*.stories.tsx` (6)
  - `src/components/brandbook-sections/user-flow/**/*.stories.tsx` (1)
  - `src/components/analytics/**/*.stories.tsx` (1)
  - `src/components/animation/**/*.stories.tsx` (5)
  - `src/components/icons/**/*.stories.tsx` (28)
- [ ] **-1.2** Remover scripts de `package.json`:
  - `"storybook": "npm run tokens:sync:write && storybook dev -p 6007"`
  - `"build-storybook": "npm run tokens:sync:write && storybook build"`
- [ ] **-1.3** Remover devDependencies de `package.json`:
  - `@chromatic-com/storybook`
  - `@storybook/addon-a11y`
  - `@storybook/addon-docs`
  - `@storybook/addon-themes`
  - `@storybook/nextjs-vite`
  - `storybook`
- [ ] **-1.4** Remover entrada `storybook-static/` do `.gitignore`
- [ ] **-1.5** Deletar `.storybook/` se existir (verificado: não existe atualmente)
- [ ] **-1.6** Deletar `storybook-static/` se existir localmente
- [ ] **-1.7** Rodar `npm install` para atualizar lockfile
- [ ] **-1.8** Rodar `npm run build` e confirmar que app compila sem erro
- [ ] **-1.9** Verificar que nenhum import de `@storybook/*` sobreviveu fora de `.stories.tsx`

**Critérios de aceite:**
- Zero arquivos `.stories.tsx` no repo
- Zero pacotes `@storybook/*` ou `storybook` em package.json
- Zero scripts `storybook`/`build-storybook`
- `npm run build` passa sem erro
- Nenhum import de `@storybook/*` no source

---

## Fase 0: Fundação (Stories 0-2)

### Story 0: Blindar o runtime e parar contaminação de preset

**Objetivo:** Arquivos gerados nunca mais são "verdade persistida" do repo.

**Nota:** Nesta story, o merge é simples (base OU variante). O merge profundo com sparse overrides vem na Story 10.

#### Checklist

- [ ] **0.1** Adicionar `runtime-brand-data.generated.ts` ao `.gitignore`
- [ ] **0.2** Adicionar `tenant-tokens.generated.css` ao `.gitignore`
- [ ] **0.3** Atualizar `sync-dtcg-tokens.cjs` para:
  - Quando `STARTER_VARIANT` não está setado, gerar re-export para `./starter-brand-data.starter` (o base), não para `./aiox-brand-data`
  - Quando `STARTER_VARIANT` está setado, gerar re-export para o preset da variante
  - Nunca versionar o output gerado
- [ ] **0.4** Garantir que `npm run dev` e `npm run build` rodam o gerador automaticamente (já fazem via `tokens:sync:write` no prebuild)
- [ ] **0.5** Garantir que `npm run dev` sem nenhuma env var roda o starter base sem erro
- [ ] **0.6** Rodar `npm run test:tenant-runtime` e documentar resultado antes de modificar
- [ ] **0.7** Remover `runtime-brand-data.generated.ts` e `tenant-tokens.generated.css` do tracking git (`git rm --cached`)

**Critérios de aceite:**
- `git status` limpo depois de `npm run build` (gerados estão em .gitignore)
- Starter base funciona sem nenhuma env var setada
- Trocar `STARTER_VARIANT=thiago_nishikata` gera tokens diferentes sem editar código
- `test:tenant-runtime` continua passando

---

### Story 1: Modelo de contrato completo (schemas)

**Objetivo:** Definir schemas fortes para cada camada de configuração.

#### Contratos a criar

| Arquivo | Governa | Schema |
|---------|---------|--------|
| `starter/site.config.yaml` | Identidade, SEO textual, branding, footer, contact, labels. Refs semânticas a slots de assets, sem paths concretos | Já existe, ampliar |
| `starter/design-system.config.yaml` | Registry de temas, app bindings, governance, runtime bridges. Não duplica valores visuais | Já existe, simplificar |
| `starter/routes.config.yaml` | **NOVO.** Topologia global do app: rotas, surfaces, layouts, renderers, nav, enablement | Criar |
| `starter/assets.config.yaml` | **NOVO.** Manifest canônico de assets: slots, paths, alt text, gallery, founders photos, moodboard | Criar |
| `starter/editor.config.yaml` | **NOVO.** Painéis do editor: campos, tipos, labels, help text, validações. Sem valor de negócio | Criar |
| `starter/variant.config.yaml` | **NOVO.** Metadata da base: label, contract_version, created_at | Criar |
| `starter/content/brandbook.yaml` | Nav, sections enablement, not-found | Já existe, ampliar |
| `starter/content/guidelines.yaml` | **NOVO.** Conteúdo da página guidelines | Criar |
| `starter/content/movimento.yaml` | **NOVO.** Conteúdo da página movimento/estratégia de marca (hub principal: 17 seções) | Criar |
| `starter/content/main-page.yaml` | **NOVO.** Seções da brandbook main page (ordem + dados) | Criar |
| `starter/content/culture.yaml` | **NOVO.** Conteúdo do culture deck | Criar |
| `starter/content/slides.yaml` | **NOVO.** Conteúdo dos 12 templates de slides | Criar |
| `starter/content/page-descriptors.yaml` | **NOVO.** Títulos, intros, labels, helpers, grouping e ordering das páginas de design system | Criar |
| `starter/content/token-export.yaml` | **NOVO.** Blocos de export, instruções, compatibility note | Criar |
| `starter/themes/*.yaml` | **NOVO.** Cada tema como arquivo canônico independente (gold.yaml, bronze.yaml) | Criar |

#### Checklist

- [ ] **1.1** Criar `starter/schemas/` com Zod schemas para cada contrato
- [ ] **1.2** Publicar `starter/contract-map.md` deixando explícito o dono canônico de cada campo. Nenhum campo pertence a dois contratos
- [ ] **1.3** Criar schema: `site.config.schema.ts` (ampliar o existente com todos os campos textuais de chrome, CTA, labels e refs semânticas a slots de assets)
- [ ] **1.4** Criar schema: `routes.config.schema.ts`
  - Campos por rota: `id`, `path`, `surface`, `layout`, `renderer`, `content_key`, `enabled`, `nav_group`, `nav_label`, `nav_order`, `theme_override`
  - Incluir bloco `surfaces` para layouts globais, home route e reserved prefixes
- [ ] **1.5** Criar schema: `assets.config.schema.ts`
  - Slots: `logo_light`, `logo_dark`, `favicon`, `og_image`, `gallery.*`, `founders.*`, `moodboard.*`
  - Cada slot inclui `src`, `alt`, `kind`, `tags`, `editor_panel`
- [ ] **1.6** Criar schema: `editor.config.schema.ts`
  - Painéis: Brand, Conteúdo, Dores, Tema, Tipografia, Assets, Navegação, Rotas
  - Cada campo: `contract_type`, `key`, `type`, `label`, `help`, `validation`, `theme_id?`
- [ ] **1.7** Criar schema: `variant.config.schema.ts`
  - Campos: `slug`, `label`, `extends`, `contract_version`, `created_at`, `owner`, `notes`
- [ ] **1.8** Criar schemas de content: `guidelines.schema.ts`, `movimento.schema.ts`, `main-page.schema.ts`, `culture.schema.ts`, `slides.schema.ts`, `page-descriptors.schema.ts`, `token-export.schema.ts`
- [ ] **1.9** Criar schema: `theme.schema.ts` (paleta, fontes, motion, radius, aliases shadcn)
- [ ] **1.10** Adicionar `schema` e `contract_version` em todos os contratos YAML
- [ ] **1.11** Criar `starter/schemas/index.ts` que exporta todos os schemas + `validateContract(type, data)` + `migrateContract(type, data, fromVersion, toVersion)`
- [ ] **1.12** Criar `starter/migrations/` com registry versionado por contrato
- [ ] **1.13** Adicionar testes unitários para cada schema e para cada migrator com mensagens de erro legíveis
- [ ] **1.14** Documentar cada schema em comentários inline com exemplos

**Critérios de aceite:**
- `validateContract('site', yaml)` retorna erros claros por campo
- `migrateContract(...)` converte contratos defasados sem edição manual
- Cada campo do sistema existe em exatamente um contrato canônico (verificável via contract-map.md)
- Todo campo que hoje existe hardcoded em qualquer seed TS tem lugar explícito em algum schema
- Schemas exportam tipos TypeScript que o runtime e os componentes vão consumir

---

### Story 2: Migrar seeds TS para contrato YAML

**Objetivo:** Extrair todo conteúdo editorial dos 10 arquivos de seed TS (6.180 linhas) para YAML estruturado.

#### Mapa de migração

| Arquivo TS (origem) | Linhas | Status | Contrato YAML (destino) |
|---------------------|--------|--------|------------------------|
| `starter-brand-data.starter.ts` | 1.378 | Migrar | `site.config.yaml` + `assets.config.yaml` + `content/main-page.yaml` + `themes/gold.yaml` |
| `aiox-brand-data.ts` | 1.378 | Migrar para variante | `variants/variant3/site.config.yaml` + `variants/variant3/content/main-page.yaml` |
| `emr-brand-data.ts` | 1.660 | **Referenciado por variante** (`bruno_kosminsky/design-system.config.yaml` linha 14: `brand_data_module: ./emr-brand-data`). Migrar para YAML da variante, depois deletar | `variants/bruno_kosminsky/site.config.yaml` + `variants/bruno_kosminsky/content/main-page.yaml` |
| `guidelines-page-content.ts` | 434 | Migrar | `content/guidelines.yaml` |
| `movimento-content.ts` | 663 | **MAIOR RISCO** (20 imports diretos). Migrar com cuidado | `content/movimento.yaml` + `content/main-page.yaml` |
| `culture-content.ts` | 410 | Migrar | `content/culture.yaml` |
| `token-export-blocks.ts` | 119 | **JÁ MIGRADO** para `brandbook.yaml` linhas 217-344. Deletar | N/A |
| `nav-links.ts` | 134 | **JÁ ABSORVIDO** por `content/brandbook.yaml`. Deletar | N/A |
| `runtime-brand-data.generated.ts` | 3 | Artefato derivado (Story 0) | N/A |
| `starter-brand-data.ts` | 1 | Re-export, eliminar | N/A |

#### Checklist

- [ ] **2.1** Migrar `emr-brand-data.ts` (1.660 linhas) para YAML da variante `bruno_kosminsky`:
  - Criar `variants/bruno_kosminsky/site.config.yaml` + `variants/bruno_kosminsky/content/main-page.yaml` com dados extraídos
  - Atualizar `variants/bruno_kosminsky/design-system.config.yaml` para remover `runtime.brand_data_module`
  - Só deletar `emr-brand-data.ts` depois que a variante funcionar sem ele
  - **ATENÇÃO:** Este arquivo é referenciado via `runtime.brand_data_module: ./emr-brand-data` no config da variante. Deletar antes da migração YAML quebra bruno_kosminsky
- [ ] **2.2** Deletar duplicados já migrados: `token-export-blocks.ts` (conteúdo já em brandbook.yaml)
- [ ] **2.3** Deletar fallback obsoleto: `nav-links.ts` (já absorvido por brandbook.yaml)
- [ ] **2.4** Criar `starter/content/guidelines.yaml` com todo conteúdo de `guidelines-page-content.ts`
- [ ] **2.5** Criar `starter/content/movimento.yaml` com todo conteúdo de `movimento-content.ts`
  - **ATENÇÃO:** Este arquivo é o hub principal. ~19 arquivos importam dele diretamente (main-sections + header-banner + brandbook-main-page + culture-content). Verificar contagem exata com `grep -r "from.*movimento-content" src/ --include="*.tsx" --include="*.ts" | grep -v stories | wc -l` antes de iniciar. Migrar com teste de regressão visual
- [ ] **2.6** Criar `starter/content/culture.yaml` com todo conteúdo de `culture-content.ts`
- [ ] **2.7** Criar `starter/content/main-page.yaml` com seções, ordem e dados da brandbook main page
  - Incluir: manifesto, propósito, valores, posicionamento, brandscript, naming, truelines, jornada, arquétipo, vocabulário, voz, visual, contrato, depoimentos, fundadores, contraste, **header-banner**
- [ ] **2.8** Criar `starter/content/slides.yaml` com conteúdo dos 12 templates de slides
- [ ] **2.9** Criar `starter/content/page-descriptors.yaml` com títulos, helpers, labels e ordering das páginas DS que continuam com demos em código
- [ ] **2.10** Criar `starter/themes/gold.yaml` e `starter/themes/bronze.yaml` como fonte canônica e reduzir `design-system.config.yaml` a metadata + refs
- [ ] **2.11** Criar `starter/assets.config.yaml` e mover para ele os paths/alt texts hoje enterrados nos seeds TS
- [ ] **2.12** Criar content adapter que lê cada YAML e retorna tipos tipados (via schemas da Story 1)
- [ ] **2.13** Manter fallback temporário: se YAML não existe, cair para seed TS (com `console.warn`)
- [ ] **2.14** Adicionar teste: carregar starter base sem nenhum seed TS, só YAML, e validar que todas as páginas têm dados
- [ ] **2.15** Marcar seeds TS restantes como `@deprecated` com comentário apontando para o YAML equivalente

#### Migração das 23 variantes existentes

- [ ] **2.16** Criar script `scripts/migrate-variants.ts` que para cada variante em `starter/variants/`:
  - Cria `variant.config.yaml` com metadata (slug, label, extends: base, contract_version)
  - Preserva `site.config.yaml`, `design-system.config.yaml` e `content/` já existentes
  - Valida contra schemas da Story 1
- [ ] **2.17** Rodar migração para todas as 23 variantes e commitar resultado
- [ ] **2.18** Testar 3 variantes representativas: `thiago_nishikata` (completa), `variant2` (preset), uma variante simples

**Critérios de aceite:**
- emr-brand-data migrado para YAML da variante bruno_kosminsky, depois deletado. Duplicados deletados (token-export-blocks, nav-links)
- Todo conteúdo textual restante que hoje vive em TS agora vive em YAML
- O adapter retorna dados tipados a partir de YAML
- Fallback temporário funciona (TS como safety net), mas emite warning no console
- Nenhum conteúdo novo é adicionado aos seeds TS a partir desta story
- As 23 variantes existentes têm `variant.config.yaml` e passam validação

---

## Fase 1: Topologia e Renderers (Stories 3-4)

### Story 3: Contrato de rotas com nav e 404 controlados por YAML

**Objetivo:** Criar `routes.config.yaml` como fonte de verdade para navegação e enablement de páginas. As 41 page.tsx permanecem na v1, mas nav, ordem e 404 vêm do contrato.

**v2 (futuro):** Catch-all dinâmico `[...slug]` substituindo as 41 page.tsx. Renderer registry. `generateStaticParams` a partir do YAML.

#### Checklist

- [ ] **3.1** Criar `starter/routes.config.yaml` com todas as rotas atuais declaradas
  ```yaml
  surfaces:
    - id: brandbook
      layout: brandbook-shell
      base_path: /brandbook
  home_route: /brandbook/guidelines
  routes:
    - id: guidelines
      path: /brandbook/guidelines
      surface: brandbook
      enabled: true
      nav_group: Brandbook
      nav_label: Guidelines
      nav_order: 1
    # ... todas as 41 rotas
  ```
- [ ] **3.2** Criar `src/lib/routes/loader.ts` que lê `routes.config.yaml` e expõe:
  - `getEnabledRoutes()` -> rotas com `enabled: true`
  - `getNavGroups()` -> grupos de navegação ordenados
  - `isRouteEnabled(path)` -> boolean
- [ ] **3.3** Atualizar componente de navegação lateral para ler de `getNavGroups()` em vez de `nav-links.ts`
- [ ] **3.4** Criar middleware Next.js que retorna 404 para rotas com `enabled: false` no contrato
- [ ] **3.5** Testar: desabilitar uma rota no YAML e confirmar que retorna 404 + some da nav
- [ ] **3.6** Testar: reordenar rotas no YAML e confirmar que nav reflete a nova ordem
- [ ] **3.7** A library interna (Story 8) expõe `toggleRoute(variant, routeId, enabled)` para o agente usar

**Critérios de aceite:**
- Nav lateral e top nav geradas a partir do contrato YAML
- Rotas desabilitadas retornam 404 e somem da nav
- Reordenar rotas = editar YAML, sem tocar em TSX
- As 41 page.tsx continuam existindo (migração para catch-all é v2)

---

### Story 4: Páginas, seções, slides e brandbook-sections como presenters puros

**Objetivo:** Componentes recebem dados resolvidos via props, sem importar seeds. Cobre: main-sections (17), slides (12), brandbook-sections (64) e pages (56).

#### Checklist

- [ ] **4.1** Definir interface `PageModel`:
  ```ts
  interface PageModel {
    id: string
    title: string
    description?: string
    sections: SectionModel[]
    theme?: ThemeOverride
    chrome: ChromeModel
    assets: AssetRefs
  }
  ```
- [ ] **4.2** Definir interface `SectionModel`:
  ```ts
  interface SectionModel {
    id: string
    type: string // renderer lookup
    order: number
    enabled: boolean
    data: Record<string, unknown> // section-specific
  }
  ```
- [ ] **4.3** Refatorar `brandbook-main-page.tsx`:
  - Remover imports de `STARTER_*`, `AIOX_*`, `PAGE_CONTENT`
  - Receber `PageModel` como prop
  - Iterar `sections` e renderizar via section renderer registry
- [ ] **4.4** Refatorar as 17 main-sections (16 seções + header-banner) para receber `SectionModel.data` como props:
  - `header-banner.tsx` -> recebe `{ title, subtitle, badge, backgroundAsset }`
  - `section-manifesto.tsx` -> recebe `{ title, paragraphs, callout }`
  - `section-proposito.tsx` -> recebe `{ purpose, mission, vision }`
  - `section-valores.tsx` -> recebe `{ values: Array<{ name, description }> }`
  - `section-posicionamento.tsx` -> recebe `{ positioning, differentiation, audience }`
  - `section-brandscript.tsx` -> recebe `{ hero, problem, guide, plan, action, success, failure }`
  - `section-naming.tsx` -> recebe `{ name, meaning, origin, rules }`
  - `section-truelines.tsx` -> recebe `{ trueline, tagline, slogans }`
  - `section-jornada.tsx` -> recebe `{ stages: Array<{ name, description, emotion }> }`
  - `section-arquetipo.tsx` -> recebe `{ primary, secondary, tertiary, mix }`
  - `section-vocabulario.tsx` -> recebe `{ doUse, dontUse, tone }`
  - `section-voz.tsx` -> recebe `{ voice, personality, examples }`
  - `section-visual.tsx` -> recebe `{ moodboard, palette, typography_preview }`
  - `section-contrato.tsx` -> recebe `{ rules, dosAndDonts }`
  - `section-depoimentos.tsx` -> recebe `{ testimonials: Array<{ text, author, role }> }`
  - `section-fundadores.tsx` -> recebe `{ founders: Array<{ name, role, bio, photo }> }`
  - `section-contraste.tsx` -> recebe `{ contrasts: Array<{ before, after, label }> }`
- [ ] **4.5** Refatorar os 12 componentes de slides (`src/components/brandbook/slides/`):
  - Templates (abertura, brand, conteudo, dados, fechamento, social, v2, visual) recebem dados via props
  - `shared.tsx` lê de contrato em vez de `STARTER_*`
  - `registry.ts` registra renderers por id
- [ ] **4.6** Refatorar brandbook-sections que importam de `starter-brand-data` (14 arquivos confirmados):
  - `editorial/` (cover-section, application-spread, logo-system-spread, dual-voice-spread, typography-spread, color-palette-spread, spread-section): recebem assets e labels via props
  - `foundations/typography-section.tsx`: recebe typography data via props
  - `motion/` (brand-reveal-cell, speed-lines-cell, glitch-cell): recebem asset refs via props
  - `brandbook-main/visual-section.tsx`: recebe dados visuais via props
- [ ] **4.7** Refatorar `guidelines-page.tsx` para receber `PageModel` via props
- [ ] **4.8** Refatorar demais páginas de conteúdo (movimento, culture) para props-only
- [ ] **4.9** Páginas de design system mantêm os demos em código, mas todo texto visível, labels, grouping, helpers, ordering e enablement vêm de `content/page-descriptors.yaml`
- [ ] **4.10** Criar `PageDescriptorAdapter` para páginas DS que mescla descriptor YAML + demo renderer
- [ ] **4.11** Criar section renderer registry em `src/lib/renderers/sections.ts`
- [ ] **4.12** Criar slide renderer registry em `src/lib/renderers/slides.ts`
- [ ] **4.13** Testar: renderizar brandbook-main-page com dados mockados (sem YAML, sem TS) e confirmar visual
- [ ] **4.14** Testar: trocar títulos, helpers e ordem de showcases de uma página DS só via YAML
- [ ] **4.15** Remover imports de seeds TS de todos os componentes refatorados

**Critérios de aceite:**
- Nenhum componente importa `STARTER_*`, `AIOX_*`, `PAGE_CONTENT`, `MANIFESTO`, `SECTION_CHROME` ou seeds TS
- Componentes recebem dados resolvidos pelo catch-all + content adapter
- Slides recebem conteúdo de `content/slides.yaml`, não de constantes TS
- Páginas de demo continuam com renderer em código, mas não exibem copy/layout metadata hardcoded
- Trocar conteúdo = editar YAML, sem tocar em TSX

---

## Fase 2: Tema e Assets (Stories 5-7)

### Story 5: Fechar fronteira do tema

**Objetivo:** globals.css vira base mínima. Tudo visual configurável vem de contrato. `themes/*.yaml` é a fonte canônica, sem duplicação em `design-system.config.yaml`.

**Pré-requisito (decisões DS):** Resolver antes de iniciar esta story:
1. **Formato canônico de cor:** O globals.css atual mistura oklch (shadcn tokens: `--background: oklch(0.9644 ...)`) e hex/rgba (BB tokens: `--primary: #DDD1BB`). Decidir qual formato vence no theme YAML. Se hex, shadcn perde manipulação nativa oklch. Se oklch, o token export precisará converter para hex para compatibilidade com Lovable/Tailwind v3. Documentar na contract-map.md.
2. **Mapa YAML-vs-CSS:** Os 6 arquivos em `src/components/brandbook/styles/` (tokens.css, primitives.css, components-lib.css, editorial-lib.css, keyframes.css, patterns.css) são a camada visual real do DS. Decidir quais variáveis migram para `themes/*.yaml` (configuráveis por variante) vs quais permanecem em CSS (styles de componente, keyframes, patterns que são engine visual, não branding).
3. **Font loading strategy:** O `layout.tsx` usa pacote `geist` (next/font, self-hosted, FOUT minimizado). O `site.config.yaml` usa Google Fonts via `external_stylesheets` (network-dependent). Decidir: (a) all fonts via external_stylesheets no YAML, (b) next/font para base + YAML só para overrides, (c) self-hosted via `public/fonts/` + YAML manifest. Documentar trade-off de performance.

#### Checklist

- [ ] **5.0** Documentar as 3 decisões DS acima na contract-map.md antes de implementar
- [ ] **5.1** Auditar `tokens.css` e `primitives.css`: classificar cada variável como "theme-configurable" (vai para YAML) ou "component-style" (fica em CSS). Criar mapa explícito
- [ ] **5.1b** Extrair variáveis classificadas como "theme-configurable" de `globals.css` para `starter/themes/base.yaml`
- [ ] **5.2** Criar pipeline: `themes/*.yaml` -> `tenant-tokens.generated.css` (no build)
- [ ] **5.3** Remover font-family hardcoded de `layout.tsx` (Geist)
  - Fonte vem de `site.config.yaml > fonts`
- [ ] **5.4** Mover font stacks de `starter-brand-data.starter.ts` para `themes/gold.yaml`
- [ ] **5.5** Reduzir `design-system.config.yaml` para metadata + refs de tema. Remover `accent_hex`, `accent_rgb`, `accent_cmyk`, font stacks e qualquer valor visual duplicado. Esses campos vivem apenas em `themes/*.yaml`
- [ ] **5.5b** O schema de `design-system.config.yaml` é definido pelo starter (em `starter/schemas/`). Se o workspace (`aiox-stage`) quiser consumir esse schema, ele que se adapte. O starter não importa nem referencia configs de business externo. Documentar na contract-map.md que o starter é a fonte canônica do schema DS
- [ ] **5.6** Remover referências a `aiox-brandbook-theme` do `brandbook-theme-provider.tsx`
- [ ] **5.7** Theme provider carrega tema ativo de contrato, não de constante TS
- [ ] **5.8** Garantir que shadcn tokens (`--primary`, `--background`, etc.) são gerados pelo pipeline
- [ ] **5.9** Testar: trocar accent, font-family e radius via YAML e confirmar visual atualizado
- [ ] **5.10** Testar: criar tema novo em `themes/custom.yaml` e ativá-lo via env var

**Critérios de aceite:**
- `globals.css` tem apenas reset e base layout (sem hex, sem font-family, sem aliases de cor)
- Trocar tipografia, paleta, radius e motion = editar theme YAML
- Não existe informação visual duplicada entre `themes/*.yaml` e `design-system.config.yaml`
- shadcn components respondem automaticamente às mudanças de tema

---

### Story 6: Normalizar branding e assets

**Objetivo:** Nenhum componente renderiza marca textual ou asset fixo fora do contrato.

#### Checklist

- [ ] **6.1** Criar `starter/assets.config.yaml` com todos os slots de asset (se não criado na Story 2)
- [ ] **6.2** Remover concrete paths de `site.config.yaml` e fazer site/SEO/chrome referenciar slots lógicos do `assets.config.yaml`
- [ ] **6.3** Refatorar `logo.tsx`: remover wordmark textual fixa, ler de `site.config.yaml > branding`
- [ ] **6.4** Refatorar chrome/header: wordmark, aria-label, CTA vêm do contrato
- [ ] **6.5** Refatorar chrome/footer: entity name, legal name, copyright, socials vêm do contrato
- [ ] **6.6** Refatorar metadata/SEO: title, description vêm de `site.config.yaml`; `og_image` é resolvido por slot do `assets.config.yaml`
- [ ] **6.7** Refatorar alt texts de imagens: vêm de `assets.config.yaml`
- [ ] **6.8** Badge labels ("60+ Components", "Local-first", etc.) vêm de `site.config.yaml`
- [ ] **6.9** Testar: trocar logo, wordmark e footer por variante e confirmar visual

**Critérios de aceite:**
- `grep -r "AIOX\|Starter\|AIOXsquad\|SynkraAI\|Florianopolis\|starter@aiox" src/` retorna 0 matches
- Assets, alt texts e SEO visual vêm de contrato YAML sem duplicação

---

### Story 7: Eliminar vazamentos de negócio e integração

**Objetivo:** O runtime só depende do target ativo e de config explícita.

#### Checklist

- [ ] **7.1** Remover `DEFAULT_APP_BUSINESS_SLUG = "aiox"` de `app-runtime.ts`
  - Se nenhum slug configurado, runtime opera em modo "starter base"
- [ ] **7.2** Migrar legado do theme provider (`brandbook-theme-provider.tsx`):
  - `LEGACY_STORAGE_KEY = "aiox-brandbook-theme"` (linha 28): migrar para `site.config.yaml > features.theme_storage_key` com valor genérico (ex: `"bb-theme"`)
  - `LEGACY_THEME_ALIASES = { lime: "main", gold: "secondary" }` (linha 29-31): remover constante TS e ler dos `legacy_ids` já declarados no `design-system.config.yaml` por tema
  - Remover qualquer outra storage key com prefixo `AIOX` do localStorage/sessionStorage
- [ ] **7.3** Corrigir `server.ts` do Supabase: não procurar `.env` em `apps/site-aiox` (linhas 21-22)
- [ ] **7.4** Remover `metadata_base: http://localhost:3001` como default
  - Ler de `site.config.yaml > seo.metadata_base`
- [ ] **7.5** Remover `href: mailto:starter@aiox.ai` como CTA default
- [ ] **7.6** Remover `DEV_FALLBACK_SLUG = "aiox"` de `sync-dtcg-tokens.cjs` (linha 26)
- [ ] **7.7** Auditar `next.config.ts` para referências hardcoded
- [ ] **7.8** Testar: rodar app com `.env` vazio e nenhum YAML de variante, confirmar que base funciona

**Critérios de aceite:**
- App funciona com zero env vars (modo starter base)
- Nenhuma referência a aiox, site-aiox, localhost:3001 ou starter@aiox no source
- Supabase client funciona ou falha gracefully se não configurado

---

## Fase 3: Engine, CLI e Editor (Stories 8-10)

### Story 8: Library interna + CLI formal

**Objetivo:** Criar (a) as funções TS que alimentam todas as interfaces e (b) os comandos CLI `tenant:*` que o usuário roda no terminal.

**Nota:** O script `scaffold-starter-variant.cjs` (360+ linhas) já existe. Migrar lógica útil para a library.

#### 8A. API da library (`src/lib/contracts/`)

| Função | Descrição |
|--------|-----------|
| `readContract(type, variant?)` | Lê YAML, valida contra schema, retorna dados tipados |
| `writeContract(type, variant, path, value)` | Valida, persiste no YAML da variante |
| `scaffoldVariant(slug, label?)` | Cria variante sparse (`variant.config.yaml` + dirs) |
| `resolveVariant(slug)` | Merge profundo base + variant = resolved |
| `diffVariant(slug)` | Retorna delta legível entre base e variante |
| `validateAll(variant?)` | Roda todos os schemas do target ativo |
| `migrateContracts(variant)` | Roda migrators oficiais por contrato/versão |
| `generateTokens(variant?)` | Gera `tenant-tokens.generated.css` a partir do tema resolvido |
| `copyAsset(variant, slot, sourcePath)` | Copia asset para `public/variants/<slug>/` e atualiza `assets.config.yaml` |
| `toggleRoute(variant, routeId, enabled)` | Habilita/desabilita rota em `routes.config.yaml` |
| `exportConfig(variant, format)` | Exporta config resolvida como YAML ou JSON |
| `listVariants()` | Lista todas as variantes com metadata |
| `getVariantStatus(slug)` | Retorna estado da variante (completa, parcial, campos faltando) |

#### 8B. Comandos CLI (`scripts/cli/`)

Cada comando é um wrapper fino sobre a library. O agente chama a library diretamente. O usuário pode usar qualquer um dos dois.

| Comando | Descrição |
|---------|-----------|
| `npm run tenant:init` | Inicializa contratos base se não existem |
| `npm run tenant:scaffold -- --slug <slug>` | Cria variante sparse |
| `npm run tenant:validate` | Valida todos os contratos do target ativo |
| `npm run tenant:migrate -- --variant <slug>` | Migra contratos para a versão atual |
| `npm run tenant:preview -- --variant <slug>` | Abre dev server com variante ativa |
| `npm run tenant:content -- --variant <slug> --path <dot.path> --value <value>` | Edita campo de conteúdo |
| `npm run tenant:theme -- --variant <slug> --token <name> --value <value>` | Edita token de tema |
| `npm run tenant:asset -- --variant <slug> --slot <slot> --file <path>` | Copia asset para variante |
| `npm run tenant:route -- --variant <slug> --route <id> --enable\|--disable` | Habilita/desabilita rota |
| `npm run tenant:diff -- --variant <slug>` | Mostra delta da variante em relação ao base |
| `npm run tenant:editor -- --variant <slug>` | Abre editor web local |
| `npm run tenant:export -- --variant <slug> --format <yaml\|json>` | Exporta config completa |
| `npm run tenant:materialize -- --variant <slug>` | Materializa snapshot completo |

#### Checklist

- [ ] **8.1** Criar `src/lib/contracts/` como módulo da library
- [ ] **8.2** Implementar `readContract`: carrega YAML, parseia, valida contra schema Zod, retorna tipo inferido
- [ ] **8.3** Implementar `writeContract`: valida valor contra schema, faz merge no YAML existente, persiste
- [ ] **8.4** Implementar `scaffoldVariant`: cria `starter/variants/<slug>/variant.config.yaml` com metadata mínima
- [ ] **8.5** Implementar `resolveVariant`: merge profundo base + variant (arrays substituem, objects mergem, null remove)
- [ ] **8.6** Implementar `diffVariant`: compara base vs variant, retorna delta por contrato
- [ ] **8.7** Implementar `validateAll`: itera todos os contratos do target, coleta erros, retorna report
- [ ] **8.8** Implementar `migrateContracts`: lê `contract_version` de cada YAML, roda migrators se defasado
- [ ] **8.9** Implementar `generateTokens`: lê tema resolvido, gera CSS, escreve `tenant-tokens.generated.css`
- [ ] **8.10** Implementar `copyAsset`: copia arquivo, atualiza slot no `assets.config.yaml` da variante
- [ ] **8.11** Implementar `toggleRoute`: toggle de enabled no `routes.config.yaml` da variante
- [ ] **8.12** Implementar `exportConfig`: merge resolve + serializa
- [ ] **8.13** Implementar `listVariants` e `getVariantStatus`
- [ ] **8.14** Migrar lógica útil de `scaffold-starter-variant.cjs` para a library
- [ ] **8.15** Criar `scripts/cli/` com entrada principal e wrappers para cada comando
- [ ] **8.16** Adicionar `--help` em cada comando CLI com exemplos
- [ ] **8.17** Testes unitários para cada função da library
- [ ] **8.18** Testar fluxo CLI completo: scaffold -> content edit -> theme edit -> validate -> preview

**Critérios de aceite:**
- Todas as funções da library são importáveis como módulo TS (`import { scaffoldVariant } from '@/lib/contracts'`)
- 13 comandos CLI funcionam no terminal com `--help`
- Agente e CLI chamam as mesmas funções (zero duplicação de lógica)
- Validação retorna erros estruturados (não strings), com path do campo e mensagem
- Merge base + variant resolve corretamente (testado com as 3 variantes piloto)
- `scaffold-starter-variant.cjs` depreciado

---

---

### Story 9: Editor web local (`/studio`)

**Objetivo:** Interface visual para editar conteúdo, tema e assets com preview ao vivo e persistência local.

**Nota sobre rota:** Usar `/studio` (sem underscore), não `/_studio`. Em Next.js App Router, pasta com `_` prefix é ignorada como rota. Proteger com middleware que checa `NODE_ENV === 'development'`.

#### Painéis do editor

| Painel | Campos | Persistência |
|--------|--------|-------------|
| Brand | Nome, tagline, wordmark, logo, footer entity, copyright | `site.config.yaml` + `assets.config.yaml` |
| Conteúdo | Headlines, parágrafos, CTAs, labels por página | `content/*.yaml` |
| Dores | Manifesto, propósito, valores, posicionamento, brandscript | `content/main-page.yaml` |
| Tema | Accent, background, foreground, surface, border, radius | `themes/<active>.yaml` |
| Tipografia | Font families (display, sans, mono), weights, stacks | `themes/<active>.yaml` |
| Assets | Logo light/dark, favicon, og_image, gallery | `assets.config.yaml` |
| Navegação | Labels, ordem, agrupamento | `content/brandbook.yaml` |
| Rotas | Enable/disable, order (modo avançado) | `routes.config.yaml` |

#### Checklist

- [ ] **9.1** Criar rota `src/app/(studio)/studio/page.tsx`
- [ ] **9.2** Criar middleware que bloqueia `/studio` quando `NODE_ENV !== 'development'`
- [ ] **9.3** Criar layout do editor: sidebar com painéis + iframe de preview
- [ ] **9.4** Implementar painel Brand
- [ ] **9.5** Implementar painel Conteúdo (campos dinâmicos gerados a partir de `editor.config.yaml`)
- [ ] **9.6** Implementar painel Dores
- [ ] **9.7** Implementar painel Tema (color pickers + preview de paleta)
- [ ] **9.8** Implementar painel Tipografia (font family selector + preview de specimen)
- [ ] **9.9** Implementar painel Assets (file upload + preview de slots)
- [ ] **9.10** Implementar painel Navegação
- [ ] **9.11** Implementar painel Rotas (toggles, modo avançado)
- [ ] **9.12** Criar route handler `POST /api/studio/save` que usa a library interna (Story 8): `writeContract(type, variant, path, value)`
- [ ] **9.13** Implementar autosave com debounce (2s)
- [ ] **9.14** Implementar indicador de dirty state
- [ ] **9.15** Implementar preview ao vivo: iframe recarrega automaticamente após save
- [ ] **9.16** Implementar seletor de variante no topo do editor
- [ ] **9.17** Testar: editar dores, headline, CTA, logo, tipografia e accent no editor e confirmar persistência + preview

**Critérios de aceite:**
- Editor só acessível em dev mode (middleware bloqueia em production)
- Rota usa `/studio` sem underscore (compatível com Next.js App Router)
- Editar qualquer campo salva no YAML correto da variante (via library, sem duplicação de lógica)
- Preview atualiza em < 3 segundos após save
- Validação de schema antes de persistir com erro inline
- Autosave funciona sem perda de dados

---

### Story 10: Governança de variantes

**Objetivo:** Toda customização aponta para variante explícita. Base nunca alterado por acidente.

**Nota:** As funções de merge, scaffold e diff estão implementadas na library (Story 8). Esta story foca nas regras de governança e nos guardrails.

#### Checklist

- [ ] **10.1** A library (Story 8) garante que `writeContract` SEMPRE opera em variante, nunca no base
- [ ] **10.2** `scaffoldVariant` cria apenas `variant.config.yaml` + dirs vazios para overrides
- [ ] **10.3** Lock file: `starter/variants/<slug>/.lock` com timestamp do último edit
- [ ] **10.4** `validateAll` verifica que variante herda corretamente do base antes de qualquer preview
- [ ] **10.5** `diffVariant` retorna delta legível: campos adicionados, alterados e removidos por contrato
- [ ] **10.6** `exportConfig` com `materialize: true` gera snapshot completo sem trocar o modelo default de sparse override
- [ ] **10.7** Testar: criar variante, editar via library, confirmar que base não foi alterado
- [ ] **10.8** Testar: merge resolve corretamente para as 3 variantes piloto

**Critérios de aceite:**
- Fluxo default cria e edita `starter/variants/<slug>/`
- Variante recém-criada contém apenas metadata e overrides mínimos
- Base preservado intacto
- Merge base + variant resolve corretamente
- Diff mostra delta legível

---

## Fase 4: Experiência Conversacional (Stories 11-13)

> **Princípio:** O usuário nunca digita um comando CLI, nunca edita YAML, nunca precisa saber que contratos existem. Ele conversa. A CLI e os contratos são infraestrutura invisível que o agente opera por baixo.

### Story 11: Agente conversacional de customização (`*brand-me`)

**Objetivo:** Criar um agente/skill que guia o usuário por conversa natural para personalizar 100% do starter, sem exigir nenhum conhecimento técnico.

**Modelo de interação:**
```
Usuário: "quero criar meu brandbook"
Agente:  Perfeito. Qual o nome da sua marca?
Usuário: "Café Origem"
Agente:  Registrado. Qual a cor principal da marca? Pode me dizer o hex, ou descrever
         ("vermelho escuro", "azul petróleo", "dourado").
Usuário: "um marrom café quente"
Agente:  Entendi. Vou usar #6F4E37 (Café). Quer que eu sugira uma paleta completa a
         partir dessa cor? (accent, surface, background, foreground)
Usuário: "sim"
Agente:  [gera paleta, mostra preview, aplica no contrato]
         Paleta aplicada. Quer ajustar alguma cor ou seguir para tipografia?
```

#### Fluxos conversacionais

| Fluxo | Gatilho | O que o agente faz por baixo |
|-------|---------|------------------------------|
| **Criar variante** | "quero criar meu brandbook" / "começar" / `*brand-me` | `tenant:scaffold`, depois inicia wizard conversacional |
| **Identidade** | "meu nome é X" / "tagline é Y" / "muda o slogan" | `tenant:content` em `site.config.yaml` |
| **Cor** | "cor principal é X" / "muda o accent para azul" / "paleta mais escura" | `tenant:theme` em `themes/*.yaml` + regenera CSS |
| **Tipografia** | "quero fonte moderna" / "usa Inter" / "display mais bold" | `tenant:theme` (fonts) + atualiza `site.config.yaml > fonts.external_stylesheets` |
| **Logo** | "meu logo é esse" (anexa arquivo) / "troca o logo" | `tenant:asset` no slot logo_light/logo_dark |
| **Conteúdo** | "minha dor é X" / "manifesto: Y" / "propósito da marca é Z" | `tenant:content` em `content/main-page.yaml` ou `content/movimento.yaml` |
| **Páginas** | "não preciso da página de culture" / "desabilita editorial" | `tenant:route --disable` |
| **Preview** | "mostra como ficou" / "abre o preview" | `tenant:preview` + abre browser |
| **Validar** | "tá pronto?" / "valida pra mim" | `tenant:validate` + resume resultado em linguagem simples |
| **Desfazer** | "volta a cor anterior" / "desfaz" | Lê git diff do contrato, reverte a última mudança |
| **Sugerir** | "sugere cores para uma marca de café" / "que fontes combinam?" | Gera sugestões usando conhecimento de design + aplica se aprovado |

#### Checklist

- [ ] **11.1** Criar agente `brand-customizer` em `squads/aiox-design/agents/brand-customizer.md` com:
  - Persona: guia criativo, acessível, sem jargão técnico
  - Dependências: todos os schemas + CLI tenant:*
  - Comando de entrada: `*brand-me` ou `*customize`
- [ ] **11.2** Criar skill `/brand-me` em `.claude/commands/Design/brand-me.md` que:
  - Carrega o agente brand-customizer
  - Detecta se já existe variante ativa ou precisa criar uma
  - Inicia o wizard conversacional pela etapa que falta
- [ ] **11.3** Implementar o **wizard sequencial** com 8 etapas:
  1. Nome e tagline da marca
  2. Cor principal (aceita hex, nome de cor, ou descrição natural)
  3. Paleta completa (sugere a partir da cor principal, aceita ajustes)
  4. Tipografia (sugere 3 combos, aceita nome de fonte ou estilo desejado)
  5. Logo (aceita upload ou pula)
  6. Conteúdo core (propósito, manifesto, valores, dores em linguagem natural)
  7. Páginas habilitadas (mostra lista, pergunta quais desabilitar)
  8. Review final + preview
  - Cada etapa pode ser pulada ("depois" / "pula")
  - Cada etapa pode ser revisitada ("volta pra cor" / "muda a tipografia")
- [ ] **11.4** Implementar **resolução de linguagem natural para valores de contrato**:
  - Cor: "azul petróleo" -> `#1B4D5C`, "dourado" -> `#DDD1BB`, "vermelho vinho" -> `#722F37`
  - Fonte: "moderna e limpa" -> Manrope/Inter, "editorial clássica" -> Playfair Display, "tech" -> Space Grotesk
  - Validar contra schema antes de persistir
- [ ] **11.5** Implementar **sugestões inteligentes**:
  - Dada uma cor principal, sugerir paleta completa (surface, background, foreground, accent, muted, border)
  - Dada uma indústria ("café", "tech", "moda"), sugerir cor + tipografia + tom de voz
  - Dado um propósito, sugerir manifesto e valores iniciais
- [ ] **11.6** Implementar **preview inline**:
  - Após cada mudança visual (cor, fonte, logo), abrir preview automaticamente
  - Ou mostrar resumo textual: "Cor accent: #6F4E37 (Café). Fonte: Inter. Logo: cafe-logo.svg"
- [ ] **11.7** Implementar **undo conversacional**:
  - "volta a cor anterior" -> lê git diff do YAML, reverte a mudança específica
  - "desfaz tudo" -> reverte todos os changes não commitados da variante
- [ ] **11.8** Implementar **contexto de sessão**:
  - O agente sabe qual variante está ativa
  - Sabe quais etapas do wizard já foram completadas
  - Retoma de onde parou se o usuário voltar depois
  - Persiste estado em `.aiox/squad-runtime/design/brand-customizer/session.yaml`
- [ ] **11.9** Testar fluxo completo: usuário cria brandbook inteiro só por conversa

**Critérios de aceite:**
- Usuário cria brandbook completo sem digitar nenhum comando CLI
- Usuário nunca vê nem edita YAML diretamente
- Linguagem natural resolve para valores válidos de contrato
- Sugestões de paleta/fonte/conteúdo funcionam
- Preview abre automaticamente após mudanças visuais
- Undo funciona por linguagem natural
- Sessão persiste entre conversas

---

### Story 12: Edição conversacional contínua (pós-wizard)

**Objetivo:** Depois do wizard inicial, o usuário pode voltar a qualquer momento e fazer mudanças por conversa natural, sem re-rodar o wizard.

**Modelo de interação:**
```
Usuário: "muda a cor para um verde mais escuro"
Agente:  Accent atual: #6F4E37. Vou trocar para #2D5016 (Verde Floresta).
         Quer que eu ajuste a paleta inteira para harmonizar, ou só o accent?
Usuário: "paleta inteira"
Agente:  [aplica, abre preview]
         Pronto. Preview aberto. O que achou?
Usuário: "ficou bom mas o texto tá difícil de ler"
Agente:  O contraste foreground/background está em 3.2:1, abaixo do mínimo WCAG AA (4.5:1).
         Vou clarear o foreground para #F0F0E8. Quer aplicar?
```

#### Checklist

- [ ] **12.1** Criar comandos de edição rápida ativados por linguagem natural:
  - `*cor <descrição>` / `*font <descrição>` / `*logo` / `*conteúdo` / `*páginas`
  - Atalhos para quem já conhece, mas linguagem natural funciona igual
- [ ] **12.2** Implementar **detecção de intenção**: classificar input do usuário em:
  - Mudança de cor / Mudança de fonte / Mudança de conteúdo / Mudança de estrutura / Preview / Validação / Undo / Pergunta / Fora de escopo
- [ ] **12.3** Implementar **feedback de acessibilidade automático**:
  - Após cada mudança de cor, calcular contraste WCAG AA/AAA
  - Se contraste insuficiente, avisar e sugerir ajuste
- [ ] **12.4** Implementar **comparação antes/depois**:
  - "mostra o que mudou" -> resume todas as alterações desde o último commit
  - "compara com o base" -> `tenant:diff` em linguagem natural
- [ ] **12.5** Implementar **modo batch**:
  - "aplica esse brand guide: nome Café Origem, cor #6F4E37, fonte Inter, tagline Cada grão conta"
  - Parseia múltiplos campos de uma vez e aplica em sequência
- [ ] **12.6** Testar: 10 edições consecutivas por conversa sem erro

**Critérios de aceite:**
- Edições pontuais funcionam sem re-entrar no wizard
- Feedback de acessibilidade é automático em mudanças de cor
- Modo batch aceita múltiplas mudanças em uma frase
- Comparação antes/depois funciona por linguagem natural

---

### Story 13: Documentação e onboarding

**Objetivo:** Qualquer pessoa que abrir o repo sabe como começar, sem ler docs longas.

#### Checklist

- [ ] **13.1** Criar `apps/aiox-design-starter/README.md` com:
  - Quick start: "Abra o terminal e diga `*brand-me`" (1 comando)
  - O que é o starter (2 frases)
  - Screenshots do fluxo conversacional
  - Link para contract-map.md (para quem quiser ir mais fundo)
- [ ] **13.2** Criar mensagem de boas-vindas no agente brand-customizer:
  - Ao ativar, mostrar: "Sou o assistente de personalização. Diga `*brand-me` para começar a criar seu brandbook, ou me diga o que quer mudar."
- [ ] **13.3** Documentar limitações conhecidas da v1:
  - Component taxonomy é fixa (atoms, molecules, organisms, chrome, patterns, motion, pages, ui). Variantes não podem renomear categorias ou reorganizar o component tree na v1
  - Renderers são definidos em código. Variantes podem habilitar/desabilitar e configurar dados, mas não podem criar renderers novos sem TSX
  - Linguagem natural suporta pt-BR e en. Outras línguas podem funcionar mas não são garantidas
- [ ] **13.4** Criar checklist de validação final para entregar variante pronta
- [ ] **13.5** Testar: nova pessoa segue o quick start e cria variante funcional sem ajuda e sem ler docs

**Critérios de aceite:**
- README tem no máximo 30 linhas
- Quick start é 1 comando (`*brand-me`)
- Nova pessoa cria brandbook funcional em < 15 minutos de conversa
- Zero necessidade de ler documentação técnica para o fluxo básico

---

## Teste E2E da v1 completa

### Fluxo conversacional (primário, sem código)

```
1. Usuário abre o repo e diz: *brand-me
2. Agente pergunta o nome da marca
   -> Usuário: "Café Origem"
3. Agente pergunta a cor principal
   -> Usuário: "marrom café"
   -> Agente sugere #6F4E37 e paleta completa
   -> Usuário: "aprovado"
4. Agente pergunta tipografia
   -> Agente sugere 3 combos para "café artesanal"
   -> Usuário: "a segunda opção"
5. Agente pergunta logo
   -> Usuário: "pula por enquanto"
6. Agente pergunta propósito/manifesto/valores
   -> Usuário descreve em linguagem natural
   -> Agente estrutura e confirma
7. Agente pergunta quais páginas desabilitar
   -> Usuário: "tira culture e slides"
8. Agente faz review final:
   "Café Origem: cor #6F4E37, fonte Lora+Inter, 2 páginas desabilitadas.
    Quer abrir o preview?"
   -> Usuário: "sim"
9. Preview abre no browser com o brandbook customizado
10. Usuário: "tá ótimo, salva"
    -> Agente commita a variante
```

### Fluxo CLI (fallback para power users)

```
1. npm run tenant:scaffold -- --slug cafe-origem
2. npm run tenant:editor -- --variant cafe-origem
3. Edita no /studio visual
4. npm run tenant:validate
5. npm run tenant:preview -- --variant cafe-origem
6. git add starter/variants/cafe-origem/ && git commit
```

---

## Ordem de execução recomendada

### v1 (este epic): 3 interfaces + infraestrutura agnóstica

| Prioridade | Story | Dependências | Estimativa | Marco |
|------------|-------|-------------|-----------|-------|
| 0 | Story -1: Deletar Storybook | Nenhuma | Pequena | Limpeza |
| 1 | Story 0: Blindar runtime | Nenhuma | Pequena | Fundação |
| 2 | Story 1: Schemas | Nenhuma | Média | Fundação |
| 3 | Story 2: Migrar seeds + variantes | Story 1 | Grande | Fundação |
| 4 | Story 10: Governança variantes | Story 2 | Média | Engine |
| 5 | Story 8: Library + CLI | Story 1, 2, 10 | Grande | **CLI funcional** |
| 6 | Story 5: Fronteira do tema | Story 2 | Média | Qualidade visual |
| 7 | Story 6+7: Branding + vazamentos | Story 5 | Média | Limpeza |
| 8 | Story 3: Contrato de rotas | Story 2 | Média | Nav controlada |
| 9 | Story 9: Editor web `/studio` | Story 8 | Grande | **Editor funcional** |
| 10 | Story 11: Agente `*brand-me` | Story 8 | Grande | **Conversa funcional** |
| 11 | Story 12: Edição contínua | Story 11 | Média | Polimento UX |
| 12 | Story 4: Presenters puros | Story 2, 3 | Grande | Qualidade interna |
| 13 | Story 13: Docs e onboarding | Story 9, 11 | Pequena | Entrega |

**Marcos de entrega:**
- Após Story 8 (prioridade 5): CLI funcional, power users já conseguem personalizar por terminal
- Após Story 9 (prioridade 9): Editor web funcional, quem prefere UI visual pode usar
- Após Story 11 (prioridade 10): Agente conversacional funcional, zero código necessário

### v2 (futuro)

| Story | Descrição | Dependência |
|-------|-----------|-------------|
| Story 3b: Catch-all dinâmico | `[...slug]` substituindo 41 page.tsx, renderer registry, `generateStaticParams` | Story 3 |
| Story 4b: Presenters 100% | brandbook-sections + slides como presenters puros | Story 4 |
| Story 8c: CLI avançada | Batch mode, CI integration, plugins | Story 8 |
| Story 9b: Editor avançado | Undo visual, drag-and-drop avançado, multi-tab | Story 9 |
| Story 11b: Agente multi-modal | Screenshots, Figma links, voz | Story 11 |

---

## Riscos identificados

| Risco | Severidade | Story afetada | Mitigação |
|-------|-----------|---------------|-----------|
| Build time com YAML parsing de 15+ arquivos | MEDIA | Story 2 | Cache de parse no gerador, invalidação por mtime |
| HMR mais lento com YAML watcher | MEDIA | Story 0, 5 | Usar polling seletivo, não watch recursivo |
| 23 variantes existentes quebram durante migração | ALTA | Story 2 | Script de migração + validação + 3 variantes piloto |
| YAML parsing errors em runtime (bad indentation) | ALTA | Story 1 | Schemas validam no boot + try/catch no adapter com fallback |
| Performance do editor com iframe + autosave | MEDIA | Story 9 (v2) | Debounce 2s, HMR do Next.js já é incremental |
| movimento-content.ts tem 20 imports diretos | ALTA | Story 2.5 | Migrar com fallback temporário, testar regressão visual |
| Formato de cor oklch vs hex não decidido | ALTA | Story 5 | Decidir antes de implementar. Documentar na contract-map.md |
| 6 CSS do DS (tokens, primitives, etc.) sem mapa YAML-vs-CSS | ALTA | Story 5 | Auditar e classificar cada variável antes de migrar |
| Dois design-system configs divergentes (starter vs workspace) | MEDIA | Story 5 | Sincronizar schema entre repos após redução |
| Font loading: next/font vs external_stylesheets | MEDIA | Story 5 | Decidir estratégia e documentar trade-off de performance |

---

## Critérios de done do epic (v1)

### Infraestrutura
- [ ] Zero arquivos .stories.tsx no repo
- [ ] Zero seeds TS como fonte primária de conteúdo (dead code migrado, restante deprecated com fallback)
- [ ] Contratos canônicos definidos, sem duplicação de ownership entre theme/assets/site
- [ ] 9+ contratos YAML governando o app inteiro, com `contract_version` explícito
- [ ] Library interna com 13+ funções importáveis (`readContract`, `writeContract`, `scaffoldVariant`, etc.)
- [ ] Governança de variantes com merge base + variant (sparse por default)
- [ ] 23 variantes existentes migradas e validadas (incluindo `bruno_kosminsky` ex-emr-brand-data)
- [ ] Testes unitários para schemas, migrators, merge, route loader
- [ ] Nav lateral e 404 controlados por `routes.config.yaml` (pages físicas permanecem)

### 3 interfaces de customização
- [ ] CLI com 13 comandos `tenant:*` documentados com `--help`
- [ ] Editor web `/studio` funcional com 8 painéis, protegido por middleware
- [ ] Agente `brand-customizer` com wizard de 8 etapas + edição contínua
- [ ] Skill `*brand-me` como ponto de entrada conversacional
- [ ] As 3 interfaces chamam a mesma library (zero duplicação de lógica)

### Experiência conversacional
- [ ] Usuário cria brandbook completo por conversa sem digitar nenhum comando
- [ ] Linguagem natural resolve para valores válidos de contrato (cor, fonte, conteúdo)
- [ ] Sugestões inteligentes funcionam (paleta, combos de fonte, conteúdo a partir de indústria)
- [ ] Preview abre automaticamente após mudanças visuais
- [ ] Undo funciona por linguagem natural
- [ ] Feedback de acessibilidade automático em mudanças de cor (WCAG AA)
- [ ] Sessão persiste entre conversas

### Validação final
- [ ] Fluxo E2E CLI: `tenant:scaffold` -> editar -> `tenant:validate` -> `tenant:preview` -> commit
- [ ] Fluxo E2E editor: abrir `/studio` -> editar nos painéis -> preview -> commit
- [ ] Fluxo E2E conversacional: `*brand-me` -> conversa -> preview -> commit (< 15 min)
- [ ] README com 3 quick starts (CLI, editor, conversa)
- [ ] Nova pessoa cria brandbook funcional sem ler documentação técnica

### Critérios de done v2 (futuro, não bloqueia v1)
- [ ] Zero referências hardcoded a AIOX/Starter/SynkraAI no source
- [ ] Catch-all dinâmico substituindo 41 page.tsx
- [ ] 100% presenters puros (56 páginas + 64 brandbook-sections + 12 slides)
- [ ] Agente multi-modal (screenshots, Figma links)
