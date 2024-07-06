
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { getIdToken } from "../../../../utils/SessionTokenAccessor";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (session) {
        const idToken = await getIdToken();
        var url = `${process.env.AUTH_END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(`${process.env.NEXTAUTH_URL}`)}`
        try {
            const res = await fetch(url, { method: "GET" });

        } catch (err) {
            console.log(err);
            return new Response("error requesting session termination from keycloak", { status: 500 });
        }
        return new Response(`Session terminated on keycloak`, { status: 200 });
    }
}