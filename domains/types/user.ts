export type UserId = {
  value: string;
};

export type UserEntity = {
  id: UserId["value"];
  username: string;
};

export type UserPasswordEntity = {
  userId: UserId["value"];
  passwordHash: string;
};

export interface IUser {
  findById(id: UserId): UserEntity | null;
  findByUsername(username: string): UserEntity | null;
}
