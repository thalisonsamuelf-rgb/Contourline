import {
  BrandbookPageFooter as PrimitiveBrandbookPageFooter,
  type BrandbookPageFooterProps as PrimitiveBrandbookPageFooterProps,
} from "@brandbook-primitives"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"

export type BrandbookPageFooterProps =
  Partial<PrimitiveBrandbookPageFooterProps>

export function BrandbookPageFooter({
  logoLightSrc = STARTER_BRAND_ASSETS.logoLightSrc,
  logoLightAlt = STARTER_BRAND_ASSETS.logoAlt,
  metaLine = STARTER_BRAND_ASSETS.footerMetaLine,
  ...props
}: BrandbookPageFooterProps) {
  return (
    <PrimitiveBrandbookPageFooter
      logoLightSrc={logoLightSrc}
      logoLightAlt={logoLightAlt}
      metaLine={metaLine}
      {...props}
    />
  )
}
