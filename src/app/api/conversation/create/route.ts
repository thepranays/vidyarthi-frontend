import { api_conversationServiceEndpoint } from "@/constants/api_endpoints";
import { NextRequest, NextResponse } from "next/server";

//Create conversation b/w given seller_uid and buyer_uid for given product_id
export async function POST(req: NextRequest) {

    const resCreateConversation = await fetch(`${api_conversationServiceEndpoint}/create`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(await req.json()),
            cache: "no-store"
        }
    );
    // console.log(resCreateConversation.status);
    // const data = await resCreateConversation.json();
    return new NextResponse(JSON.stringify({ msg: "created conversation in db" }), { status: resCreateConversation.status });
}