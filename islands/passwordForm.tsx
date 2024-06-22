import { JSX } from "preact/jsx-runtime";
import { UserEntity } from "../domains/repositories/user.ts";
import { useState } from "preact/hooks";
import {Label, Input, Button} from "../components/index.ts";

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
    const location = res.headers.get("Location");
    if (res.status === 302 && location) {
      window.location.href = location;
      return;
    }
    if (res.status === 400) {
      alert("Invalid password");
      return;
    }
    if (res.status === 404) {
      alert("User not found");
      return;
    }
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label for="password">Password</Label>
        <Input type="hidden" name="userId" value={user.id} />
        <Input type="password" name="password" onInput={handleInput} />
        <Button type="submit">Authenticate</Button>
      </form>
    </>
  );
}
