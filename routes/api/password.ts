import { Handlers } from "$fresh/server.ts";
import { User, verifyPassword } from "../../domains/repositories/user.ts";

export const handler: Handlers = {
  async POST(req) {
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
    return new Response(null, {
      status: 201,
    });
  },
};
