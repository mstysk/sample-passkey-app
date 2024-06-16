type User = {
    id: string;
    username: string;
}

interface IUser{
    findById(id: string) : User | null;
    findByUsername(username: string): User | null;
}

const TempUsers: User[] = [
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
