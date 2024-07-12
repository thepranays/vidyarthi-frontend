import { api_userServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const uid = searchParams.get("uid");
    const accessToken = await getAccessToken();
    try {
        const userData = await fetch(`${api_userServiceEndpoint}/get/${uid}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },


        });

        try {
            const data = await userData.json();
            return new NextResponse(JSON.stringify({ user: data }), { status: userData.status });
            //  return NextResponse.json({ res: data }, { status: userData.status });
        } catch (e) {
            return new NextResponse(JSON.stringify({ msg: "user not found in db", error: e }), { status: 404 });
            //  return NextResponse.json({ msg: "user not found in db", error: e }, { status: 404 });
        }








    } catch (e) {
        console.log("error while fetching user by id:", e);
        return new NextResponse(JSON.stringify({ failed: "failed to fetch user by id", error: e }), { status: 500 });

    }

}