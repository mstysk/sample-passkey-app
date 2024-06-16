export type UserEntity = {
    id: string;
    username: string;
}

interface IUser{
    findById(id: string) : UserEntity | null;
    findByUsername(username: string): UserEntity | null;
}

const TempUsers: UserEntity[] = [
    {
        id: "1",
        username: "user1"
    },
    {
        id: "2",
        username: "user2"
    }
]

export const User: IUser = {
    findById(id: string) {
        return TempUsers.find(user => user.id === id) || null;
    },

    findByUsername(username: string) {
        return TempUsers.find(user => user.username === username) || null;
    }
}
