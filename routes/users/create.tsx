import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import { Button, Input, Label } from "../../components/index.ts";
import { User } from "../../domains/repositories/index.ts";
import {
    UserEntityWithPassword,
    UserSchemaWithPassword,
} from "../../domains/types/user.ts";
import { JSX } from "preact/jsx-runtime";

type keys = keyof UserEntityWithPassword;

type Data = {
    form?: FormData,
    e?: { [key in keys]?: string }[];
};

export const handler: Handlers = {
    async POST(req, ctx) {
        const body = await req.formData();
        const [rawUsername, rawPassword] = body.values();

        try {
            const user = UserSchemaWithPassword.parse({
                id: crypto.randomUUID(),
                username: rawUsername,
                password: rawPassword,
            });

            await User.store(user);

            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const error = [
                    ...err.issues.map((issue) => ({
                        [issue.path.join(".")]: issue.message,
                    })),
                ];
                return ctx.render({form: body, e: error });
            }
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/error",
                },
            });
        }
    },
};

export default function CreateUser({ data }: PageProps<Data>): JSX.Element {
    return (
        <>
            <h2>Create User</h2>
            <form class="max-w-sm mx-auto" method="POST">
                {data?.e?.map((e) => e.username && <p>{e.username}</p>)}
                <Label for="username">
                    <div>username</div>
                </Label>
                <Input type="text" name="username" value={data.form?.get('username')} />

                {data?.e?.map((e) => e.password && <p>{e.password}</p>)}
                <Label for="password">
                    <div>password</div>
                </Label>
                <Input type="password" name="password" />
                <Button type="submit">Create</Button>
            </form>
        </>
    );
}
