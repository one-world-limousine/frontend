// Shared Tailwind class strings for the form pages (book, contact, drive for us): page layout,
// cards, side panels, icon lists and the antd form pieces we style ourselves.

/** Page body under the nav, and the form + 360px side column grid (stacked below lg). */
export const formPageClass = "pt-16 pb-(--section-y)";
export const formGridClass = "mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_360px]";
export const asideClass = "flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]";

/** Bordered card holding a form. */
export const panelClass = "rounded-lg border border-line bg-surface-raised px-4 py-6 md:rounded-xl md:p-8";
/** Smaller card in the side column. */
export const sidePanelClass = "rounded-lg border border-line bg-surface-raised p-6 md:rounded-xl";
/** Charcoal side card: use with data-theme="dark". On the dark site it gets its own ground. */
export const darkSidePanelClass = "rounded-lg border border-line bg-surface p-6 site-dark:bg-surface-alt md:rounded-xl";
export const sideTitleClass = "mb-4 font-display text-[28px] leading-[34px] font-normal text-ink";

/** List with a bronze icon before each item; a <small> inside an item is a second, quieter line. */
export const iconListClass =
  "flex flex-col gap-3 *:flex *:items-start *:gap-3 *:text-[15px] *:leading-6 *:text-ink-muted [&_small]:block [&_small]:text-[13px] [&_small]:leading-[18px] [&>li>svg]:mt-0.5 [&>li>svg]:text-bronze";

/** A form section; each one after the first is set off by a rule. */
export const formSectionClass = "[section+&]:mt-8 [section+&]:border-t [section+&]:border-line [section+&]:pt-8";
export const formSectionTitleClass = "mb-6 text-xl leading-7 font-semibold text-ink";
/** Two-column field grid (one column below md); spanClass makes a field take the full row. */
export const fieldsClass = "grid grid-cols-1 gap-x-4 md:grid-cols-2";
export const spanClass = "md:col-span-2";
export const fieldLabelClass = "text-xs leading-4 font-bold tracking-[0.08em] text-ink uppercase";
export const prefixIconClass = "mr-1 text-bronze";
/** Bold contact link in side panels (phone numbers, email). */
export const contactLinkClass = "font-semibold text-ink no-underline transition-colors duration-180 hover:text-bronze-strong";
export const legalClass = "mt-4 text-[13px] leading-5 text-ink-muted";
export const formErrorClass = "mb-4 flex items-center gap-2 text-danger";

/** Spam trap field: kept off screen rather than display:none, which some bots skip. */
export const honeypotClass = "absolute -left-[10000px] size-px overflow-hidden";

/** Sent confirmation that replaces a form. */
export const successClass = "flex flex-col items-start gap-4";
export const successMarkClass = "grid size-14 place-items-center rounded-full bg-surface-alt text-success";
export const successTitleClass = "font-display text-4xl leading-[42px] font-normal text-ink";
export const successTextClass = "max-w-[52ch] text-ink-muted";
