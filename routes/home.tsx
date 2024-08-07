import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "@fresh-session";
import { isUserEntity, UserEntity } from "../domains/types/user.ts";

type Data = {
    user: UserEntity;
};

export const handler: Handlers<Data, WithSession> = {
    GET(_req, ctx) {
        const user = ctx.state.session.get("user");
        if (!user || !isUserEntity(user)) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }
        return ctx.render({ uesr })
    },
};

export default function Home({ data }: PageProps<Data>) {
    return (
        <>
            <h2>Home {data.user.username}</h2>
        </>
    );
}
