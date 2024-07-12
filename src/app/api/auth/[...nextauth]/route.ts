import NextAuth, { Session, Account, DefaultSession, User } from "next-auth"
import Keycloak from "next-auth/providers/keycloak"


import { jwtDecode } from "jwt-decode";
import { encryptToken } from "../../../../utils/Encryption";
import { refreshTokenError } from "@/constants/constants";

//Refresh token when access token expires
async function refreshAccessToken(token: any) {
    const res = await fetch(`${process.env.AUTH_REFRESH_TOKEN_URL}`, {
        method: "POST",

        headers: { "Content-Type": "application/x-www-form-urlencoded" },


        body: new URLSearchParams({
            client_id: `${process.env.AUTH_CLIENT_ID}`,
            client_secret: `${process.env.AUTH_CLIENT_SECRET}`,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,


        }),
    });

    const refreshTokenResult = await res.json();
    if (!res.ok) throw refreshTokenResult;

    return {
        ...token, access_token: refreshTokenResult.access_token, decoded: jwtDecode(refreshTokenResult.access_token),
        id_token: refreshTokenResult.id_token, expires_at: Math.floor(Date.now() / 1000) + refreshTokenResult.expires_in,
        refresh_token: refreshTokenResult.refresh_token
    }

}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Keycloak({
            clientId: `${process.env.AUTH_CLIENT_ID}`,
            clientSecret: `${process.env.AUTH_CLIENT_SECRET}`,
            issuer: `${process.env.AUTH_ISSUER}`

        }),
        // ...add more providers here
    ],



    callbacks: {

        //everything defined in token will stored encrypted in browser thus accesstoken is stored encrypted (thus encrypted secured cookie)
        //first time sign in will give account not null and later till refresh token expires we will get account null and only jwt in return
        async jwt({ token, account }: { //used any to as nextauth was built using strict mode false still undergoing developer for typescript
            token: any,
            account: any,
        }) {

            const nowTimeStamp = Math.floor(Date.now() / 1000);
            // Persist the OAuth access_token to the token right after signin
            if (account) {

                token.decoded = jwtDecode(account.access_token);
                token.id_token = account.id_token;
                // console.log(token.decoded);
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                token.access_token = account.access_token
            } else if (nowTimeStamp >= token.expires_at) {
                try {
                    console.log("token is expired. Refreshing..");
                    //Gain new access-token using refresh token
                    const refreshedAccessToken = await refreshAccessToken(token);
                    return refreshedAccessToken;
                } catch (err) {
                    console.log("error while refreshing token: ", err);
                    return { ...token, error: refreshTokenError };
                }


            }
            //console.log(token.access_token);
            //if access-token hasn't expired yet
            return token
        },

        //called whenever session is requested either from server or client component
        //session data is kept not encrypted 
        async session({ session, token, user }: { session: Session, token: any, user: any }) {

            //send properties to clienst (eg browser) without any encryption ,DO NOT STORE ACCESS TOKEN DIRECTLY WITHOUT ENCRYPTING

            session.accessToken = encryptToken(token.access_token); //TODO:fix issue of decrypting when sending through websocket in chat room 

            session.expiresAt = token.expires_at;
            session.idToken = encryptToken(token.id_token);
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;

            session.user = {
                uid: token.decoded.sub,
                first_name: token.decoded.given_name,
                last_name: token.decoded.family_name,
                branch: token.decoded.branch,
                study_year: token.decoded.study_year,
                email: token.decoded.email,
                username: token.decoded.preferred_username,
                profile_img_url: "",
                created_at: "",
                last_seen: "",
                //TODO:add created_at attribute
            }

            return session;
        }
    }

}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; //requires export naming as HTTP methods that are going to be used during route handling 