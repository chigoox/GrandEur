import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]