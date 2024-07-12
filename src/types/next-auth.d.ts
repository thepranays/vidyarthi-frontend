import NextAuth, { Account, DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        accessToken?: string,
        idToken: string,
        error?: string,
        roles: [],
        user?: {
            uid: string
            username: string
            first_name: string
            last_name: string
            branch: string
            email: string
            study_year: string
            profile_img_url: string
            created_at: string
            last_seen: string

        },

        expiresAt?: string,

    }
}


declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: Account.access_token
    }
}