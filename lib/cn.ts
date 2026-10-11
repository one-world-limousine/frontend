import { twMerge, type ClassNameValue } from "tailwind-merge";

/** Joins class names, letting later Tailwind classes override earlier ones (e.g. a `className` prop). */
export function cn(...classes: ClassNameValue[]) {
  return twMerge(classes);
}
