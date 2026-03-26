import { STARTER_FONT_FAMILIES } from "./starter-brand-data"
import type { TokenExportBlock } from "@/lib/tenant/types"

export type { TokenExportBlock }

export const tokenExportBlocks: TokenExportBlock[] = [
  {
    id: "gold",
    title: "Gold",
    edition: "Starter Gold Edition",
    description: "Warm editorial palette with #DDD1BB accent. Default scale for the starter shell.",
    accentHex: "#DDD1BB",
    surfaceHex: "#151517",
    textHex: "#F4F4F4",
    borderPreview: "#FFFFFF17",
    css: `/* AIOX Design Starter — Gold */
/* Paste into index.css of your Tailwind + shadcn/ui project */

@layer base {
  :root {
    /* Palette */
    --background: #09090A;
    --foreground: #F4F4F4;
    --primary: #DDD1BB;
    --primary-foreground: #121213;
    --card: #151517;
    --card-foreground: #F4F4F4;
    --popover: #151517;
    --popover-foreground: #F4F4F4;
    --secondary: #1D1D20;
    --secondary-foreground: #F4F4F4;
    --muted: #18181B;
    --muted-foreground: rgba(244, 244, 244, 0.52);
    --accent: rgba(221, 209, 187, 0.1);
    --accent-foreground: #DDD1BB;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: rgba(255, 255, 255, 0.09);
    --input: rgba(255, 255, 255, 0.12);
    --ring: rgba(221, 209, 187, 0.4);
    --radius: 0.5rem;

    /* Extended Palette */
    --surface: #151517;
    --surface-alt: #1D1D20;
    --dim: rgba(244, 244, 244, 0.52);
    --blue: #0099FF;
    --flare: #C4B7A2;
    --error: #EF4444;
    --warning: #F59E0B;

    /* Font Stack */
    --font-sans: "${STARTER_FONT_FAMILIES.sans}", system-ui, sans-serif;
    --font-mono: "${STARTER_FONT_FAMILIES.mono}", "SFMono-Regular", ui-monospace, monospace;

    /* Motion */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);
  }
}`,
  },
  {
    id: "bronze",
    title: "Bronze",
    edition: "Starter Bronze Edition",
    description: "Deeper metallic palette with #BFA37A accent. Good for premium or editorial variants.",
    accentHex: "#BFA37A",
    surfaceHex: "#151517",
    textHex: "#F4F4F4",
    borderPreview: "#FFFFFF17",
    css: `/* AIOX Design Starter — Bronze */
/* Paste into index.css of your Tailwind + shadcn/ui project */

@layer base {
  :root {
    /* Palette */
    --background: #09090A;
    --foreground: #F4F4F4;
    --primary: #BFA37A;
    --primary-foreground: #121213;
    --card: #151517;
    --card-foreground: #F4F4F4;
    --popover: #151517;
    --popover-foreground: #F4F4F4;
    --secondary: #1D1D20;
    --secondary-foreground: #F4F4F4;
    --muted: #18181B;
    --muted-foreground: rgba(244, 244, 244, 0.52);
    --accent: rgba(191, 163, 122, 0.1);
    --accent-foreground: #BFA37A;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: rgba(255, 255, 255, 0.09);
    --input: rgba(255, 255, 255, 0.12);
    --ring: rgba(191, 163, 122, 0.4);
    --radius: 0.5rem;

    /* Extended Palette */
    --surface: #151517;
    --surface-alt: #1D1D20;
    --dim: rgba(244, 244, 244, 0.52);
    --blue: #0099FF;
    --flare: #A78B60;
    --error: #EF4444;
    --warning: #F59E0B;

    /* Font Stack */
    --font-sans: "${STARTER_FONT_FAMILIES.sans}", system-ui, sans-serif;
    --font-mono: "${STARTER_FONT_FAMILIES.mono}", "SFMono-Regular", ui-monospace, monospace;

    /* Motion */
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);
  }
}`,
  },
]
