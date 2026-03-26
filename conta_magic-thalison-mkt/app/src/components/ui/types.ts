/**
 * Centralized type exports for the AIOX Design System UI components.
 * Import from here instead of individual files for convenience.
 *
 * @example
 * ```ts
 * import type { ButtonProps, BadgeProps } from "@/components/ui/types";
 * ```
 */

// --- Props interfaces ---
export type { ArticleCardProps } from "./article-card";
export type { AuthorCardProps } from "./author-card";
export type { AvatarProps } from "./avatar";
export type { BadgeProps } from "./badge";
export type { ButtonProps } from "./button";
export type { CtaButtonProps } from "./cta-button";
export type { DeviceMockupFrameProps, DeviceMockupVariant } from "./device-mockup-frame";
export type { FieldGroupProps, FieldLabelProps, FieldProps } from "./field";
export type { FAQItemProps } from "./faq-item";
export type { GrainOverlayProps } from "./grain-overlay";
export type { GridBordersProps } from "./grid-borders";
export type { IconButtonProps } from "./icon-button";
export type { JobListingCardProps, JobType } from "./job-listing-card";
export type { LogoProps } from "./logo";
export type { MonoLabelProps } from "./mono-label";
export type { OfficeCardProps } from "./office-card";
export type { PostBenefitProps } from "./post-benefit";
export type { PricingBenefitProps } from "./pricing-benefit";
export type { PrimaryLinkProps } from "./primary-link";
export type { SectionLabelProps } from "./section-label";
export type { SegmentedControlProps } from "./segmented-control";
export type { SiteCtaButtonProps, SiteCtaLinkProps } from "./site-cta";
export type { StackedAvatarsProps } from "./stacked-avatars";
export type { TeamCardHorizontalProps } from "./team-card-horizontal";

// --- CVA variant utilities (re-exported for programmatic access) ---
export { buttonVariants } from "./button";
export { avatarVariants } from "./avatar";
export { badgeVariants } from "./badge";
export { fieldControlVariants, fieldGroupVariants, fieldLabelVariants } from "./field";
export { iconButtonVariants } from "./icon-button";
export { logoVariants } from "./logo";
export { siteCtaVariants } from "./site-cta";
export { stackedAvatarsVariants } from "./stacked-avatars";
export { tabsListVariants } from "./tabs";
