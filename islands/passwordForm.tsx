import { JSX } from "preact/jsx-runtime";
import { UserEntity } from "../domains/repositories/user.ts";
import { useState } from "preact/hooks";
import { Button, Input, Label } from "../components/index.ts";

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

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const res = await fetch("/api/password", {
            method: "POST",
            body: new FormData(e.target as HTMLFormElement),
        });
        if (res.status >= 400) {
            switch(res.status) {
                case 400:
                    alert("Bad Request");
                    break;
                case 401:
                    alert("Unauthorized");
                    break;
                case 404:
                    alert("Not Found");
                    break;
                default:
                    alert("Error");
            }
            return;
        }
        globalThis.location.href = "/home";
    };

    return (
        <>
            <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <Label for="password">Password</Label>
                <Input type="hidden" name="userId" value={user.id} />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    onInput={handleInput}
                />
                <Button type="submit">Authenticate</Button>
            </form>
        </>
    );
}
