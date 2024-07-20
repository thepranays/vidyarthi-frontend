import { api_messageServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const convoId = req.nextUrl.searchParams.get("convo_id"); //request paramter
    const accessToken = await getAccessToken();
    const msgReq = await fetch(`${api_messageServiceEndpoint}/get?convo_id=${convoId}`, {
        method: "GET", headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (msgReq.status >= 400 && msgReq.status <= 599) { //if messages list does not exist or server side error then return empty list of messsages 
        return new NextResponse(JSON.stringify({ messages: [] }), { status: msgReq.status });
    }
    const messages = await msgReq.json();
    //   console.log(messages);
    return new NextResponse(JSON.stringify({ messages }), { status: msgReq.status });

}