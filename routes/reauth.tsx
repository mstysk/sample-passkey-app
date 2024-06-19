import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "@fresh-session";
import { User, UserEntity } from "../domains/repositories/user.ts";
import { JSX } from "preact/jsx-runtime";
import ReauthForm from "../islands/reauthForm.tsx";

type Data = {
    user: UserEntity;
};

export const handler: Handlers<Data, WithSession> = {
    GET(_, ctx) {
        const userId = ctx.state.session.get("userId");
        if (!userId) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }
        const user = User.findById(userId);
        if (!user) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }

        return ctx.render({ user });
    },
};

export default function Reauth({ data }: PageProps<Data>): JSX.Element {
    return (
        <>
            <h2>verify your Identity</h2>
            <p>Username: {data.user.username}</p>
            <ReauthForm user={data.user} />
        </>
    );
}
