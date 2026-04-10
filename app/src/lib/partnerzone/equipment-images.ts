// PartnerZone — equipment image mapping (shared between dashboard and customer area)

export const equipmentImages: Record<string, string> = {
  // Crystal / Enygma
  "crystal 3d": "/equipamentos/Crystal 3D.png",
  "enygma": "/equipamentos/enygma.png",
  // Focuskin / Folix
  "focuskin": "/equipamentos/Focuskin.png",
  "folix": "/equipamentos/Folix.png",
  // Hipro variants
  "hipro": "/equipamentos/Hipro.png",
  "hipro med": "/equipamentos/Hipro med.png",
  "hipro hof": "/equipamentos/HIPRO HOF.png",
  "hipro prime": "/equipamentos/Hipro Prime Edition.png",
  "hipro prime edition": "/equipamentos/Hipro Prime Edition.png",
  // Hive / Iconyc
  "hive pro": "/equipamentos/Hive pro.png",
  "iconyc": "/equipamentos/Iconyc.png",
  // Inkie
  "inkie laser": "/equipamentos/Inkie Laser.png",
  "inkie light": "/equipamentos/inkie light.png",
  // Multishape
  "multishape": "/equipamentos/multishape.png",
  // S30 / M30
  "s30": "/equipamentos/S30.png",
  "s -30": "/equipamentos/S30.png",
  "s-30": "/equipamentos/S30.png",
  "m30": "/equipamentos/m30.png",
  "m - 30": "/equipamentos/m30.png",
  "m-30": "/equipamentos/m30.png",
  // Supreme Pro
  "supreme pro": "/equipamentos/Supreme Pro.png",
  // BHS 156
  "bhs 156 full": "/equipamentos/bhs 156full.png",
  "bhs 156full": "/equipamentos/bhs 156full.png",
  // Fusion / Raytrace / Reverso
  "fusion 3": "/equipamentos/fusion 3.png",
  "laser fusion": "/equipamentos/fusion 3.png",
  "raytrace": "/equipamentos/raytrace.png",
  "reverso": "/equipamentos/Reverso.png",
  // Creator 600
  "creator 600": "/equipamentos/Creator 600.png",
  // UltraLift / Unyque
  "ultralift": "/equipamentos/UltraLift.png",
  "unyque pro": "/equipamentos/Unyque Pro.png",
  "unyque pro enygma": "/equipamentos/Unyque Pro Enygma.png",
  // X-Tonus
  "x-tonus": "/equipamentos/X-Tonus.png",
  "xtonus": "/equipamentos/xtonus.png",
  "x tonus": "/equipamentos/X-Tonus.png",
  // Others
  "visbody": "/equipamentos/Visbody.png",
  "lumenis": "/equipamentos/Lumenis.png",
  "alpha": "/equipamentos/Alplha.png",
  "alplha": "/equipamentos/Alplha.png",
  "nuera tight": "/equipamentos/Nuera tight.png",
  "splendor x": "/equipamentos/splendor x.png",
  "stellar": "/equipamentos/stellar.png",
  "trilift": "/equipamentos/trilift.png",
  // Adella
  "adella laser": "/equipamentos/Inkie Laser.png",
  "adella led": "/equipamentos/inkie light.png",
}

export function getEquipmentImage(name: string): string | null {
  const lower = name.toLowerCase().trim()
  if (equipmentImages[lower]) return equipmentImages[lower]
  for (const [key, val] of Object.entries(equipmentImages)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return null
}
