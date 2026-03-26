#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { stringify } = require("yaml");

const APP_ROOT = path.resolve(__dirname, "..");
const STARTER_ROOT = path.join(APP_ROOT, "starter");
const VARIANTS_DIR = path.join(STARTER_ROOT, "variants");
const PUBLIC_VARIANTS_DIR = path.join(APP_ROOT, "public", "variants");

const PRESETS = {
  variant2: {
    name: "Orbit Flow",
    wordmark: "orbit",
    primaryAccent: "#46D6FF",
    secondaryAccent: "#FFB36B",
    dark: "#08111A",
    surface: "#0F1B29",
    surfaceAlt: "#162739",
    cream: "#ECF7FF",
    dim: "rgba(236, 247, 255, 0.45)",
    email: "hello@orbitflow.ai",
    phone: "+55 (21) 4000-0102",
    city: "Rio de Janeiro",
    region: "RJ",
    country: "Brazil",
    locationLines: ["Rio de Janeiro, RJ", "Brazil"],
    seoTitle: "Orbit Flow - White-label Ops Brandbook",
    seoDescription:
      "Starter variant para times de operacao, produto e service design com visual signal-on-dark.",
    footerBadges: ["48+ Components", "Signal UI", "2 Themes", "Variant Fixture"],
    tagLine: "Signal-first Operations Design System",
    bottomNote: "Variant fixture generated from the starter scaffold",
    tokenExportLabel: "ORBIT FLOW",
    tokenExportTitleAccent: "Toolkit",
  },
};

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    slug: "",
    name: "",
    force: false,
  };

  for (const raw of argv) {
    if (raw === "--force") {
      args.force = true;
      continue;
    }

    if (raw.startsWith("--slug=")) {
      args.slug = raw.slice("--slug=".length).trim();
      continue;
    }

    if (raw.startsWith("--name=")) {
      args.name = raw.slice("--name=".length).trim();
      continue;
    }
  }

  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeYaml(filePath, value) {
  fs.writeFileSync(filePath, stringify(value), "utf8");
}

function writeText(filePath, value) {
  fs.writeFileSync(filePath, value, "utf8");
}

function hexToRgbLabel(hex) {
  const normalized = hex.replace("#", "");
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `RGB ${red},${green},${blue}`;
}

function sanitizeSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildTokenExportCss({
  title,
  background,
  foreground,
  primary,
  primaryForeground,
  card,
  secondary,
  muted,
  mutedForeground,
  accent,
  border,
  input,
  ring,
  surface,
  surfaceAlt,
  dim,
  blue,
  flare,
  error,
  warning,
}) {
  return `/* ${title} */
/* Paste into index.css of your Tailwind + shadcn/ui project */

@layer base {
  :root {
    /* Palette */
    --background: ${background};
    --foreground: ${foreground};
    --primary: ${primary};
    --primary-foreground: ${primaryForeground};
    --card: ${card};
    --card-foreground: ${foreground};
    --popover: ${card};
    --popover-foreground: ${foreground};
    --secondary: ${secondary};
    --secondary-foreground: ${foreground};
    --muted: ${muted};
    --muted-foreground: ${mutedForeground};
    --accent: ${accent};
    --accent-foreground: ${primary};
    --destructive: ${error};
    --destructive-foreground: #FFFFFF;
    --border: ${border};
    --input: ${input};
    --ring: ${ring};
    --radius: 0.5rem;

    /* Extended Palette */
    --surface: ${surface};
    --surface-alt: ${surfaceAlt};
    --dim: ${dim};
    --blue: ${blue};
    --flare: ${flare};
    --error: ${error};
    --warning: ${warning};

    /* Font Stack */
    --font-sans: "Manrope", system-ui, sans-serif;
    --font-mono: "IBM Plex Mono", "SFMono-Regular", ui-monospace, monospace;

    /* Motion */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);
  }
}`;
}

function buildVariantTokenExportBlocks({
  mainLabel,
  mainEdition,
  mainAccent,
  secondaryLabel,
  secondaryEdition,
  secondaryAccent,
  dark,
  surface,
  surfaceAlt,
  cream,
  dim,
}) {
  const border = "rgba(236, 247, 255, 0.14)";
  const input = "rgba(236, 247, 255, 0.18)";
  const error = "#EF5A5A";
  const warning = "#F7B955";
  const blue = mainAccent;
  const slugify = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return [
    {
      id: slugify(mainLabel),
      title: mainLabel,
      edition: mainEdition,
      description: `Primary token export block with ${mainAccent} accent.`,
      accentHex: mainAccent,
      surfaceHex: surface,
      textHex: cream,
      borderPreview: border,
      css: buildTokenExportCss({
        title: `${mainLabel} Theme`,
        background: dark,
        foreground: cream,
        primary: mainAccent,
        primaryForeground: dark,
        card: surface,
        secondary: surfaceAlt,
        muted: surface,
        mutedForeground: dim,
        accent: `rgba(${hexToRgbLabel(mainAccent).replace("RGB ", "")}, 0.1)`,
        border,
        input,
        ring: `rgba(${hexToRgbLabel(mainAccent).replace("RGB ", "")}, 0.4)`,
        surface,
        surfaceAlt,
        dim,
        blue,
        flare: secondaryAccent,
        error,
        warning,
      }),
    },
    {
      id: slugify(secondaryLabel),
      title: secondaryLabel,
      edition: secondaryEdition,
      description: `Secondary token export block with ${secondaryAccent} accent.`,
      accentHex: secondaryAccent,
      surfaceHex: surface,
      textHex: cream,
      borderPreview: border,
      css: buildTokenExportCss({
        title: `${secondaryLabel} Theme`,
        background: dark,
        foreground: cream,
        primary: secondaryAccent,
        primaryForeground: dark,
        card: surface,
        secondary: surfaceAlt,
        muted: surface,
        mutedForeground: dim,
        accent: `rgba(${hexToRgbLabel(secondaryAccent).replace("RGB ", "")}, 0.1)`,
        border,
        input,
        ring: `rgba(${hexToRgbLabel(secondaryAccent).replace("RGB ", "")}, 0.4)`,
        surface,
        surfaceAlt,
        dim,
        blue,
        flare: secondaryAccent,
        error,
        warning,
      }),
    },
  ];
}

function buildLogoSvg({ title, subtitle, fill, text }) {
  return `<svg width="720" height="180" viewBox="0 0 720 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="180" rx="20" fill="${fill}"/>
  <path d="M56 48H664" stroke="${text}" stroke-opacity="0.16" stroke-width="2"/>
  <path d="M56 132H664" stroke="${text}" stroke-opacity="0.16" stroke-width="2"/>
  <text x="56" y="102" fill="${text}" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" letter-spacing="8">${title}</text>
  <text x="58" y="142" fill="${text}" fill-opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="500" letter-spacing="5">${subtitle}</text>
</svg>
`;
}

function buildOgSvg({ title, accent, surface, text }) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${surface}"/>
  <rect x="56" y="56" width="1088" height="518" rx="28" stroke="${accent}" stroke-opacity="0.4" stroke-width="2"/>
  <text x="84" y="188" fill="${text}" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="600" letter-spacing="8">STARTER VARIANT</text>
  <text x="84" y="326" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="112" font-weight="700" letter-spacing="6">${title}</text>
  <text x="84" y="420" fill="${text}" fill-opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="500" letter-spacing="4">LOCAL-FIRST WHITE-LABEL FRAMEWORK</text>
</svg>
`;
}

function buildVariantTokensCss(preset) {
  return `/* Auto-generated starter variant tokens for ${preset.name} */

@layer brandbook-bridge {
  .brandbook-root {
    --bb-accent: ${preset.primaryAccent};
    --bb-dark: ${preset.dark};
    --bg-void: ${preset.dark};
    --bb-surface: ${preset.surface};
    --bb-surface-alt: ${preset.surfaceAlt};
    --bb-cream: ${preset.cream};
    --bb-cream-alt: ${preset.cream};
    --bb-warm-white: ${preset.cream};
    --bb-dim: ${preset.dim};
    --bb-border: rgba(236, 247, 255, 0.14);
    --bb-border-hover: rgba(236, 247, 255, 0.24);
    --bb-gray-charcoal: #35516A;
    --bb-gray-dim: #5E7E98;
    --bb-gray-muted: #89A6BA;
    --bb-gray-silver: #B7D0E1;
    --bb-gray-light: #D8EAF6;
    --bb-blue: ${preset.primaryAccent};
    --bb-flare: ${preset.secondaryAccent};
    --bb-error: #EF5A5A;
    --bb-warning: #F7B955;
    --bb-accent-02: rgba(70, 214, 255, 0.02);
    --bb-accent-04: rgba(70, 214, 255, 0.04);
    --bb-accent-06: rgba(70, 214, 255, 0.06);
    --bb-accent-08: rgba(70, 214, 255, 0.08);
    --bb-accent-10: rgba(70, 214, 255, 0.10);
    --bb-accent-12: rgba(70, 214, 255, 0.12);
    --bb-accent-15: rgba(70, 214, 255, 0.15);
    --bb-accent-20: rgba(70, 214, 255, 0.20);
    --bb-accent-25: rgba(70, 214, 255, 0.25);
    --bb-accent-40: rgba(70, 214, 255, 0.40);
    --bb-map-land: ${preset.surfaceAlt};
    --bb-map-water: ${preset.dark};
    --bb-map-marker: ${preset.primaryAccent};
    --bb-map-land-hover: rgba(70, 214, 255, 0.12);
  }
}
`;
}

function buildVariantReadme(preset, slug) {
  return `# ${preset.name}

Fixture gerada pelo scaffold do starter.

- Slug: \`${slug}\`
- Accent main: \`${preset.primaryAccent}\`
- Accent secondary: \`${preset.secondaryAccent}\`
- Assets: \`public/variants/${slug}/\`
- Tokens: \`starter/variants/${slug}/tokens.css\`
`;
}

function scaffoldVariant({ slug, name, force }) {
  const normalizedSlug = sanitizeSlug(slug);
  if (!normalizedSlug) {
    fail("Missing --slug=<variant-slug>");
  }

  const preset = {
    ...(PRESETS[normalizedSlug] || PRESETS.variant2),
    name: name || (PRESETS[normalizedSlug] || PRESETS.variant2).name,
  };

  const variantRoot = path.join(VARIANTS_DIR, normalizedSlug);
  const variantContentRoot = path.join(variantRoot, "content");
  const publicVariantRoot = path.join(PUBLIC_VARIANTS_DIR, normalizedSlug);

  if (fs.existsSync(variantRoot) && !force) {
    fail(`Variant already exists: ${variantRoot}. Re-run with --force to overwrite.`);
  }

  fs.rmSync(variantRoot, { recursive: true, force: true });
  fs.rmSync(publicVariantRoot, { recursive: true, force: true });
  ensureDir(variantContentRoot);
  ensureDir(publicVariantRoot);

  const site = {
    slug: normalizedSlug,
    name: preset.name,
    seo: {
      title: preset.seoTitle,
      description: preset.seoDescription,
      og_image: `/variants/${normalizedSlug}/og.svg`,
    },
    branding: {
      marketing_wordmark: preset.wordmark,
      home_aria_label: `Ir para a home de ${preset.name}`,
      logo_light_alt: preset.name,
      logo_dark_alt: preset.name,
      brandbook_tagline: preset.tagLine,
      version_label: "Variant 2",
      edition_label: "Scaffold Fixture",
      brandbook_cta_label: "Open Brandbook",
      floating_brandbook_label: preset.name,
      footer_badges: preset.footerBadges,
    },
    navigation: {
      cta: {
        label: "Book Intro",
        href: `mailto:${preset.email}`,
      },
    },
    footer: {
      entity: {
        display_name: preset.name,
        legal_name: `${preset.name} Studio`,
      },
      contact: {
        email: preset.email,
        phone: preset.phone,
        city: preset.city,
        region: preset.region,
        location_lines: preset.locationLines,
      },
      socials: [
        { label: "X / Twitter", href: "https://x.com/orbitflow" },
        { label: "Instagram", href: "https://instagram.com/orbitflow" },
        { label: "GitHub", href: "https://github.com/SynkraAI/aiox-stage" },
      ],
      copyright_notice: `${preset.name}. All rights reserved.`,
      bottom_note: preset.bottomNote,
    },
    assets: {
      logo_light: `/variants/${normalizedSlug}/logo-light.svg`,
      logo_dark: `/variants/${normalizedSlug}/logo-dark.svg`,
      og_image: `/variants/${normalizedSlug}/og.svg`,
    },
    fonts: {
      external_stylesheets: [
        "https://fonts.cdnfonts.com/css/tasa-orbiter-display",
      ],
    },
  };

  const designSystem = {
    id: normalizedSlug,
    name: `${preset.name} Design System`,
    owner_bu: normalizedSlug,
    themes: {
      main: {
        label: `${preset.name} Main`,
        description: `Tema principal de ${preset.name}.`,
        tokens: {
          primary: `starter/variants/${normalizedSlug}/tokens.css`,
        },
        brandbook: {
          picker_label: "Cyan",
          edition_label: "Signal Stream Edition",
          accent_name: `${preset.name} Cyan`,
          accent_hex: preset.primaryAccent,
          accent_rgb: hexToRgbLabel(preset.primaryAccent),
          accent_cmyk: "CMYK custom",
          live_badge_color: preset.primaryAccent,
          legacy_ids: [],
        },
      },
      secondary: {
        label: `${preset.name} Secondary`,
        description: `Tema secundario de ${preset.name}.`,
        tokens: {
          primary: `starter/variants/${normalizedSlug}/tokens.css`,
        },
        brandbook: {
          picker_label: "Amber",
          edition_label: "Sunset Relay Edition",
          accent_name: `${preset.name} Amber`,
          accent_hex: preset.secondaryAccent,
          accent_rgb: hexToRgbLabel(preset.secondaryAccent),
          accent_cmyk: "CMYK custom",
          live_badge_color: preset.secondaryAccent,
          legacy_ids: [],
        },
      },
    },
  };

  const contents = {
    "brandbook.yaml": {
      shell: {
        home_aria_label: `${preset.name} Brandbook home`,
      },
      footer: {
        meta_line: `${preset.name} // Brandbook // Variant Fixture`,
      },
      not_found: {
        message: `Page not found in the ${preset.name} brandbook`,
      },
      token_export: {
        header: {
          nav_left: preset.tokenExportLabel,
          nav_right: "V1.0 // SCAFFOLD READY",
          title_accent: preset.tokenExportTitleAccent,
          subtitle: `Copy ${preset.name} tokens for Tailwind + shadcn/ui projects`,
        },
        instructions: [
          "Pick a theme below and review the palette preview before copying the CSS block.",
          "Click Copy CSS to copy the full variable block.",
          "Paste into your project's index.css or globals.css.",
          `All shadcn/ui components will automatically adopt the ${preset.name} visual system.`,
        ],
        blocks: buildVariantTokenExportBlocks({
          mainLabel: designSystem.themes.main.brandbook.picker_label,
          mainEdition: designSystem.themes.main.brandbook.edition_label,
          mainAccent: preset.primaryAccent,
          secondaryLabel: designSystem.themes.secondary.brandbook.picker_label,
          secondaryEdition: designSystem.themes.secondary.brandbook.edition_label,
          secondaryAccent: preset.secondaryAccent,
          dark: preset.dark,
          surface: preset.surface,
          surfaceAlt: preset.surfaceAlt,
          cream: preset.cream,
          dim: preset.dim,
        }),
      },
    },
  };

  writeYaml(path.join(variantRoot, "site.config.yaml"), site);
  writeYaml(path.join(variantRoot, "design-system.config.yaml"), designSystem);
  for (const [fileName, content] of Object.entries(contents)) {
    writeYaml(path.join(variantContentRoot, fileName), content);
  }

  writeText(path.join(variantRoot, "tokens.css"), buildVariantTokensCss(preset));
  writeText(path.join(variantRoot, "README.md"), buildVariantReadme(preset, normalizedSlug));

  writeText(
    path.join(publicVariantRoot, "logo-light.svg"),
    buildLogoSvg({
      title: preset.name.toUpperCase(),
      subtitle: "SIGNAL SYSTEM",
      fill: preset.dark,
      text: preset.primaryAccent,
    })
  );
  writeText(
    path.join(publicVariantRoot, "logo-dark.svg"),
    buildLogoSvg({
      title: preset.name.toUpperCase(),
      subtitle: "SIGNAL SYSTEM",
      fill: preset.cream,
      text: preset.dark,
    })
  );
  writeText(
    path.join(publicVariantRoot, "og.svg"),
    buildOgSvg({
      title: preset.name.toUpperCase(),
      accent: preset.primaryAccent,
      surface: preset.dark,
      text: preset.cream,
    })
  );

  console.log(`Scaffolded starter variant "${normalizedSlug}" at ${path.relative(APP_ROOT, variantRoot)}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  scaffoldVariant(args);
}

main();
