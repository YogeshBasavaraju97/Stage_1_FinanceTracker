import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define the types for the function parameters
export function cn(...inputs: (string | object | undefined)[]): string {
  return twMerge(clsx(inputs));
}
