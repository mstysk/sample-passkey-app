import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export interface IUser {
  findById(id: UserId): UserEntity | null;
  findByUsername(username: string): UserEntity | null;
}

export const isUserEntity = (u: unknown): u is UserEntity => {
  if (typeof u !== "object" || u === null) {
    return false;
  }

  return "id" in u && "username" in u;
};

export const UserSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(3),
})

export const PasswordSchema = z.string().min(8);

export const UserSchemaWithPassword = UserSchema.extend({
    password: PasswordSchema
}).required()

export type UserEntity = z.infer<typeof UserSchema>
export type UserEntityWithPassword = z.infer<typeof UserSchemaWithPassword>
export type PasswordEntity = z.infer<typeof PasswordSchema>
export type UserId = UserEntity["id"];
