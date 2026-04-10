# PartnerZone — Paleta de Cores (Light Theme)

> Edite este arquivo para alterar as cores do PartnerZone.
> Após editar, atualize as variáveis CSS em `partnerzone.css` e os valores hardcoded nos componentes.

## 🎨 Paleta Principal

### Sidebar (Azul Contourline)
| Token            | HEX        | RGBA                  | Uso                                  |
|------------------|------------|-----------------------|--------------------------------------|
| `--pz-sidebar-bg`     | `#24336E`  | `rgb(36, 51, 110)`    | Fundo da sidebar                     |
| `--pz-sidebar-text`   | `#FFFFFF`  | `rgb(255, 255, 255)`  | Texto e ícones                       |
| `--pz-sidebar-muted`  | `#FFFFFF99`| `rgba(255,255,255,0.6)` | Texto secundário/labels            |
| `--pz-sidebar-active` | `#3A4D8E`  | `rgb(58, 77, 142)`    | Item ativo (azul mais claro)         |
| `--pz-sidebar-hover`  | `#FFFFFF1A`| `rgba(255,255,255,0.10)`| Hover dos itens                    |
| `--pz-sidebar-border` | `#FFFFFF14`| `rgba(255,255,255,0.08)`| Divisores                          |

### Página / Conteúdo
| Token              | HEX        | RGBA                  | Uso                              |
|--------------------|------------|-----------------------|----------------------------------|
| `--pz-bg`          | `#E7E7E6`  | `rgb(231, 231, 230)`  | Fundo principal                  |
| `--pz-card-bg`     | `#FFFFFF`  | `rgb(255, 255, 255)`  | Fundo dos cards / painéis        |
| `--pz-card-hover`  | `#F5F5F5`  | `rgb(245, 245, 245)`  | Hover dos cards                  |
| `--pz-border`      | `#00000014`| `rgba(0, 0, 0, 0.08)` | Bordas sutis                     |
| `--pz-border-strong` | `#0000001F` | `rgba(0, 0, 0, 0.12)` | Bordas mais visíveis           |

### Tipografia
| Token             | HEX/RGBA              | Uso                       |
|-------------------|-----------------------|---------------------------|
| `--pz-text`       | `rgba(0, 0, 0, 0.80)` | Texto principal           |
| `--pz-text-muted` | `rgba(0, 0, 0, 0.60)` | Texto secundário          |
| `--pz-text-soft`  | `rgba(0, 0, 0, 0.40)` | Labels, placeholders      |
| `--pz-text-faint` | `rgba(0, 0, 0, 0.25)` | Texto de apoio mínimo     |

### Accent (Botões / Links)
| Token                | HEX        | Uso                              |
|----------------------|------------|----------------------------------|
| `--pz-accent`        | `#24336E`  | Cor primária (mesma da sidebar)  |
| `--pz-accent-hover`  | `#1B2655`  | Hover do botão primário          |
| `--pz-accent-text`   | `#FFFFFF`  | Texto sobre accent               |
| `--pz-accent-soft`   | `#24336E1A`| Background suave (badges, hover) |

### Status (Funcionais)
| Token              | HEX        | Uso                |
|--------------------|------------|--------------------|
| `--pz-success`     | `#10B981`  | Verde sucesso      |
| `--pz-success-bg`  | `#10B98114`| Fundo do badge     |
| `--pz-warning`     | `#F59E0B`  | Amarelo pendente   |
| `--pz-warning-bg`  | `#F59E0B14`| Fundo do badge     |
| `--pz-error`       | `#EF4444`  | Vermelho erro      |
| `--pz-error-bg`    | `#EF444414`| Fundo do badge     |
| `--pz-info`        | `#3B82F6`  | Azul informação    |
| `--pz-info-bg`     | `#3B82F614`| Fundo do badge     |

---

## 📐 Como Usar

### Em CSS / Tailwind arbitrary values
```tsx
<div className="bg-[var(--pz-card-bg)] text-[var(--pz-text)] border border-[var(--pz-border)]">
  ...
</div>
```

### Diretamente com hex
```tsx
<div className="bg-[#FFFFFF] text-black/80 border border-black/[0.08]">
  ...
</div>
```

---

## 🔄 Como Alterar uma Cor

1. Edite o valor HEX neste arquivo (ex: `--pz-sidebar-bg`)
2. Edite a mesma variável em `src/app/(partnerzone)/partnerzone/partnerzone.css`
3. Faça commit e push

> **Dica:** Para um redesign completo, use o `*tokenize` do agente UX para regenerar todas as variáveis automaticamente.

---

## 📋 Histórico de Mudanças

| Data       | Mudança                                          |
|------------|--------------------------------------------------|
| 2026-04-10 | Tema light criado (azul sidebar + cinza claro)  |
