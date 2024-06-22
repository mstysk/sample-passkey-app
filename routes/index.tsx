import { Handlers, PageProps } from "$fresh/server.ts";
import { Input, Label, Button } from "../components/index.ts";
import { User } from "../domains/repositories/user.ts";
import { WithSession } from "@fresh-session";

type Error = {
  message: string;
};

type Errors = {
  [key: string]: Error;
};

interface Data {
  errors?: Errors;
}

export const handler: Handlers<Data, WithSession> = {
  async POST(req, ctx) {
    const fromData = await req.formData();
    const username = fromData.get("username");

    if (
      !username || typeof username != "string" ||
      !/[a-zA-Z0-9-_]+/.test(username)
    ) {
      return ctx.render({
        errors: { username: { message: "Invalid username" } },
      });
    }
    const user = User.findByUsername(username);
    if (!user) {
      return ctx.render({
        errors: { username: { message: "User not found" } },
      });
    }
    ctx.state.session.set("userId", user.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/reauth",
      },
    });
  },
};

export default function Index({ data }: PageProps<Data>) {
  return (
    <>
      <h2>Login with a username</h2>
      <form class="max-w-sm mx-auto" method="POST">
        <div class="mb-5">
          {data?.errors?.username && (
            <p class="text-red-500 text-sm font-medium">
              {data.errors.username.message}
            </p>
          )}
          <Label for="username"><div>username</div></Label>
          <Input
            id="username"
            type="text"
            name="username"
            required
          />
        </div>
        <Button type="submit">Next</Button>
      </form>
    </>
  );
}
