import { User } from "../domains/repositories/index.ts";
import { UserEntity } from "../domains/types/user.ts";
import { JSX } from "preact/jsx-runtime";
import ReauthForm from "../islands/reauthForm.tsx";
import { WithSession } from "@fresh-session";
import { Handlers } from "$fresh/server.ts";

type Data = {
  user: UserEntity;
};

export const handler: Handlers<Data, WithSession> = {
  async GET(_, ctx) {
    const userId = ctx.state.session.get("userId");
    if (!userId) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
    const user = await User.findById(userId);
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
