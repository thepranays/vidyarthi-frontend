import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { decryptToken } from "./Encryption";


/*Used to decode and get access and id token which are stored encrypted in browser session storage*/
export async function getAccessToken() {
    const session = await getServerSession(authOptions);

    if (session) {
        const decryptedAccessToken = decryptToken(session.access_token);
        return decryptedAccessToken;
    }
    return null;
}

export async function getIdToken() {
    const session = await getServerSession(authOptions);
    if (session) {
        const decryptedIdToken = decryptToken(session.id_token);
        return decryptedIdToken;
    }
    return null;
}