import { JSX } from "preact/jsx-runtime";
import { UserEntity } from "../domains/repositories/user.ts";
import {
    useEffect,
    useState,
} from "preact/hooks";
import PasswordForm from "./passwordForm.tsx";

type Props = {
    user: UserEntity;
};

const CRED_ID = "credId";

export default function ReauthForm({ user }: Props): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [uvpaa, setUvpaa] = useState(false);

    useEffect(() => {
        const publicKey = globalThis.PublicKeyCredential;

        if (!publicKey) {
            setUvpaa(true);
            setLoading(false);
            return;
        }
        publicKey.isUserVerifyingPlatformAuthenticatorAvailable()
            .then((uvpaa) => {
                setUvpaa(uvpaa);
                setLoading(false);
            });
    }, []);

    if (loading) <Loading />;

    const credId = localStorage.getItem(CRED_ID);

    return (
        <>
            <h2>Reauth</h2>
            <p>Username: {user.username}</p>
            {uvpaa && credId && typeof credId === "string"
                ? <AuthenticatorForm credId={credId} />
                : <PasswordForm user={user} />}
        </>
    );
}

function Loading() {
    return <p>Loading...</p>;
}

function AuthenticatorForm({ credId }: { credId: string }): JSX.Element {
    return (
        <form>
            {/** @TODO **/}
            <input type="hidden" name="credId" value={credId} />
            <button type="submit">Reauth</button>
        </form>
    );
}
