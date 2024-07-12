import { api_conversationServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextRequest, NextResponse } from "next/server";

//Get conversations linked to buying products of the use
export async function GET(req: NextRequest) {
    const uid = req.nextUrl.searchParams.get("uid");
    const accessToken = await getAccessToken();
    const resBuyConv = await fetch(`${api_conversationServiceEndpoint}/get/buying/${uid}`,
        {
            method: "GET", cache: "no-store",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
        }
    );
    const data = await resBuyConv.json();
    //console.log(data);
    return new NextResponse(JSON.stringify({ data }), { status: resBuyConv.status });
}