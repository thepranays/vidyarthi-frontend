import { api_conversationServiceEndpoint } from "@/constants/api_endpoints";
import { NextRequest, NextResponse } from "next/server";

//Get conversation based on unique combination of product_id , seller_uid, buyer_uid
export async function GET(req: NextRequest) {
    const uid = req.nextUrl.searchParams.get("uid");

    const resBuyConv = await fetch(`${api_conversationServiceEndpoint}/get/selling/${uid}`,
        {
            method: "GET", cache: "no-store"
        }
    );
    const data = await resBuyConv.json();
    //console.log(data);
    return new NextResponse(JSON.stringify({ data }), { status: resBuyConv.status });


}