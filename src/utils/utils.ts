import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Only allow frontend JSP-related files
export const ALLOWED_EXTENSIONS = [
  ".jsp",
  ".jspx",
  ".jspf",
  ".html",
  ".htm",
  ".css",
  ".js",
  ".xml",
  ".properties",
];

export const hasAllowedExtension = (filename: string): boolean => {
  return ALLOWED_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));
};
