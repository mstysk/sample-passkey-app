import { cn } from "../lib/utils.ts";

const style =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Input(
    props: React.HTMLAttributes<HTMLInputElement>,
) {
    return (
        <input
            {...props}
            class={cn(
                props.class,
                style,
            )}
        />
    );
}
