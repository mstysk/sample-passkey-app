import { Handlers } from "$fresh/server.ts";
import { WithSession } from "@fresh-session";
import { User, verifyPassword } from "../../domains/repositories/user.ts";

export const handler: Handlers<undefined, WithSession> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const { password, userId } = Object.fromEntries(form);

    if (typeof password !== "string" || typeof userId !== "string") {
      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }
    const user = User.findById(userId);
    if (!user) {
      return new Response(null, {
        status: 404,
        statusText: "Not Found",
      });
    }
    if (!verifyPassword(user, password)) {
      return new Response(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }
    ctx.state.session.set("user", user);
    return new Response(null, {
      status: 201,
    });
  },
};
