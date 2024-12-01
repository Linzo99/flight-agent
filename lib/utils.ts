import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string, options?: {}) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};
