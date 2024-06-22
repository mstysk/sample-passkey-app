import { ClassValue, clsx } from "npm:clsx";
import { twMerge } from "npm:tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(
        inputs,
    ));
}
