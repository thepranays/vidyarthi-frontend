import { api_conversationServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextRequest, NextResponse } from "next/server";

//Fetch conversation based on unique combination of product_id,buyer and seller uid 
export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const accessToken = await getAccessToken();
    if (params.size == 1) {
        const convo_id = params.get("convo_id");

        const res = await fetch(`${api_conversationServiceEndpoint}/get/${convo_id}`,
            {
                method: "GET", cache: "no-store"
                , headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },

            }
        );
        try {
            const data = await res.json();
            // console.log(data);
            return new NextResponse(JSON.stringify({ data }), { status: res.status });
        } catch (e) {
            return new NextResponse(JSON.stringify({ msg: "Conversation by convo_id not found" }), { status: 404 });
        }

    } else {
        const product_id = params.get("product_id");
        const buyer_uid = params.get("buyer_uid");
        const seller_uid = params.get("seller_uid");

        const res = await fetch(`${api_conversationServiceEndpoint}/get?buyer_uid=${buyer_uid}&product_id=${product_id}&seller_uid=${seller_uid}`,
            { method: "GET", cache: "no-store", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` }, }
        );

        const data = await res.json();
        // console.log(data);
        return new NextResponse(JSON.stringify({ data }), { status: res.status });
    }

}   