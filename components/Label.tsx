import { HTMLAttributes } from "preact/compat";
import { cn } from "../lib/utils.ts";

const style = "block mb-2 text-sm font-mdeium text-gray-900 dark:text-white";

export default function Label(
    props: HTMLAttributes<HTMLLabelElement>,
) {
    return (
        <label
            {...props}
            class={cn(
                props.class,
                style,
            )}
        >
            {props.children}
        </label>
    );
}
