import { JSX } from "preact/jsx-runtime";
import { UserEntity } from "../domains/repositories/user.ts";
import { useEffect, useState } from "preact/hooks";

export default function PublicKey({ user }: { user: UserEntity }): JSX.Element {
  const [uvpaa, setUvpaa] = useState(false);

  useEffect(() => {
    const publicKeyCredential = globalThis.PublicKeyCredential;
    if (!publicKeyCredential) {
      return;
    }
    publicKeyCredential
      .isUserVerifyingPlatformAuthenticatorAvailable()
      .then((uvpaa) => {
        setUvpaa(uvpaa);
      });
  }, []);

  const credId = localStorage.getItem("credId");

  if (!uvpaa) {
    return PasswordForm(user);
  }

  if (!credId) {
    return PasswordForm(user);
  }

  return (
    <>
      <p>Touch your security key to authenticate</p>
      <form method="post">
        <input name="credId" value={credId} type="hidden" />
      </form>
    </>
  );
}

const PasswordForm = (user: UserEntity) => {
  return (
    <>
      <p>Enter your password</p>
      <form method="post">
        <input name="userid" value={user.id} type="hidden" />
      </form>
    </>
  );
};
