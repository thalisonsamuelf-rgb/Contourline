#!/usr/bin/env python3
"""
Gerador de Capas PartnerZone - Contourline
Composição batch: foto PNG do equipamento sobre fundo gradiente azul escuro.
Saída: 1920x1080 (16:9 @ 1K)
"""

import sys
from pathlib import Path
from PIL import Image, ImageDraw

# === CONFIGURAÇÃO ===
OUTPUT_WIDTH = 1920
OUTPUT_HEIGHT = 1080
GRADIENT_TOP = (8, 32, 72)
GRADIENT_BOTTOM = (4, 18, 48)
EQUIPMENT_PADDING_PERCENT = 0.08

DRIVE_BASE = Path.home() / "Library/CloudStorage/GoogleDrive-backupservidorehr@gmail.com/My Drive/1. MARKETING/01. Equipamentos"

# Mapeamento: nome da capa → caminho relativo da foto no Drive
COVERS = {
    # === UNYQUE ===
    "Unyque Pro": "01. UNYQUE/UNYQUE PRO/09. FOTOS/Equipamento/0G6A9353.png",
    "Unyque Pro Enygma": "01. UNYQUE/UNYQUE PRO - ENYGMA/09. FOTOS/Equipamento/UNYQUE-ENYGMA.png",

    # === CRYSTAL 3D ===
    "Crystal 3D": "02. CRYSTAL 3D/02. Crystal 3D/FOTOS/0G6A4399.png",

    # === MULTISHAPE ===
    "Multishape": "03. MULTISHAPE/09. Fotos/Multishape Logo.png",

    # === HIPRO's ===
    "HIPRO": "04. HIPRO's/01. HIPRO/09. Fotos/Hipro.png",
    "HIPRO HOF": "04. HIPRO's/03. HIPRO HOF/09. Fotos/FOTO equipamento/hipro hof.png",
    "Hipro Med": "04. HIPRO's/02. HIPRO MED/09. Fotos/hipromed0067.png",
    "Hipro Prime Edition": "04. HIPRO's/04. HIPRO PRIME/03. Apresentacao/Elementos/hipronovo12MB-3.png",

    # === ICONYC ===
    "Iconyc": "05. ICONYC/09. Fotos/Fotos recortadas/ICONYC.png",

    # === ENYGMA ===
    "Enygma": "06. ENYGMA/09. Fotos/ENYGMA COM SOMBRA.png",

    # === RAYTRACE ===
    "Raytrace": "07. RAYTRACE/09. Fotos/raytrace-png.png",

    # === X-TONUS ===
    "X-Tonus": "13. XTONUS/09. Fotos/xtonus-lado-logo.png",

    # === ULTRALIFT ===
    "UltraLift": "16. ULTRALIFT/02. Ultralift Duo/09. Fotos/Equipamento - ultraliftduo.png",

    # === VISBODY ===
    "Visbody": "17. VISBODY/S30/09. Fotos/S30- Black 1.png",

    # === FOCUSKIN ===
    "Focuskin": "19. FOCUSKIN/09. Fotos/FOCUSKIN2.png",

    # === HIVE PRO ===
    # Nota: só tem ponteiras, sem foto do equipamento completo

    # === SUPREME PRO ===
    "Supreme Pro": "22. SUPREMEPRO/09. Fotos/FOTOS ESTUDIO/SUPREME-PNG.png",

    # === LUMENIS ===
    "Lumenis": "24. LUMENIS/02. STELLAR/09. Fotos/Machine.png",
}


def create_gradient_background(width: int, height: int) -> Image.Image:
    """Cria fundo com gradiente vertical azul escuro."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / height
        r = int(GRADIENT_TOP[0] + (GRADIENT_BOTTOM[0] - GRADIENT_TOP[0]) * ratio)
        g = int(GRADIENT_TOP[1] + (GRADIENT_BOTTOM[1] - GRADIENT_TOP[1]) * ratio)
        b = int(GRADIENT_TOP[2] + (GRADIENT_BOTTOM[2] - GRADIENT_TOP[2]) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img


def composite_equipment(background: Image.Image, equipment_path: str) -> Image.Image:
    """Centraliza a foto do equipamento sobre o fundo."""
    bg = background.copy()
    equip = Image.open(equipment_path)

    if equip.mode != 'RGBA':
        equip = equip.convert('RGBA')

    padding = int(OUTPUT_HEIGHT * EQUIPMENT_PADDING_PERCENT)
    max_w = OUTPUT_WIDTH - (padding * 2)
    max_h = OUTPUT_HEIGHT - (padding * 2)

    ratio = min(max_w / equip.width, max_h / equip.height)
    new_w = int(equip.width * ratio)
    new_h = int(equip.height * ratio)
    equip_resized = equip.resize((new_w, new_h), Image.LANCZOS)

    x = (OUTPUT_WIDTH - new_w) // 2
    y = (OUTPUT_HEIGHT - new_h) // 2

    bg.paste(equip_resized, (x, y), equip_resized)
    return bg


def main():
    output_dir = Path.home() / "Desktop" / "capas-partnerzone"
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Drive:   {DRIVE_BASE}")
    print(f"Output:  {output_dir}")
    print(f"Formato: {OUTPUT_WIDTH}x{OUTPUT_HEIGHT} (16:9 @ 1K)")
    print(f"Capas:   {len(COVERS)}")
    print()

    if not DRIVE_BASE.exists():
        print(f"ERRO: Pasta do Drive nao encontrada: {DRIVE_BASE}")
        sys.exit(1)

    print("Gerando fundo gradiente azul...")
    background = create_gradient_background(OUTPUT_WIDTH, OUTPUT_HEIGHT)

    processed = 0
    errors = []

    for name, rel_path in sorted(COVERS.items()):
        img_path = DRIVE_BASE / rel_path
        if not img_path.exists():
            errors.append((name, f"Arquivo nao encontrado: {rel_path}"))
            print(f"  SKIP  {name}: arquivo nao encontrado")
            continue

        try:
            result = composite_equipment(background, str(img_path))
            out_file = output_dir / f"{name}.png"
            result.save(str(out_file), 'PNG')
            print(f"  OK    {name}")
            processed += 1
        except Exception as e:
            errors.append((name, str(e)))
            print(f"  ERRO  {name}: {e}")

    print(f"\n{'='*60}")
    print(f"Geradas: {processed}/{len(COVERS)}")
    if errors:
        print(f"\nErros ({len(errors)}):")
        for name, err in errors:
            print(f"  - {name}: {err}")
    print(f"\nCapas salvas em: {output_dir}")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
