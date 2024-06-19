import { JSX } from "preact/jsx-runtime";
import { UserEntity } from "../domains/repositories/user.ts";
import {
    useEffect,
    useState,
} from "preact/hooks";

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

function PasswordForm({user}: {user: UserEntity}): JSX.Element{
    return (
        <form method="post" action="/home">
            <input type="hidden" name="userId" value={user.id} />
            <input type="password" name="password" />
            <button type="submit">Reauth</button>
        </form>
    )
}
