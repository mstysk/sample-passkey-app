import { JSX } from "preact/jsx-runtime";
import { UserEntity } from "../domains/repositories/user.ts";
import { useState } from "preact/hooks";

type Props = {
    user: UserEntity;
};

export default function PasswordForm({ user }: Props): JSX.Element {
    const [password, setPassword] = useState("");

    const handleInput = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        setPassword(value);
        return;
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        // @TODO
        return;
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="password">Password</label>
                <input type="hidden" name="userId" value={user.id} />
                <input type="password" name={password} onInput={handleInput} />
                <button type="submit">Authenticate</button>
            </form>
        </>
    );
}
