import { UserEntity, UserEntityWithPassword, UserPasswordEntity } from "../types/user.ts";

const kv = await Deno.openKv();

const tmpUser: UserEntity = {
  id: "1",
  username: "user1",
} as const;

const tmpUserPassword: UserPasswordEntity = {
  userId: tmpUser.id,
  passwordHash: "password1",
} as const;

await kv.set(["users", tmpUser.username], tmpUser);
await kv.set(["users.password", tmpUserPassword.userId], tmpUserPassword);

export const User = {
  async findByUsername(username: string) {
    const user = await kv.get(["users", username]);
    console.log(user);
    if (user.value) {
      return user.value as UserEntity;
    }
    return null;
  },

  async findById(id: string) {
    const user = await kv.get<UserEntity>(["users", id]);
    if (user.value) {
      return user.value as UserEntity;
    }
    return null;
  },

  async store(user: UserEntityWithPassword) {
    await kv.set(["users", user.username], user);
  },
};

export async function verifyPassword(
  user: UserEntity,
  password: string,
): Promise<boolean> {
  const p = await kv.get<UserPasswordEntity>(["users.password", user.id]);
  console.log(p);

  if (!p.value) {
    return false;
  }

  return password === p.value.passwordHash;
}
