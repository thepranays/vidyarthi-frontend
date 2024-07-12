import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextRequest, NextResponse } from "next/server";

//Get product detail by id 
export async function GET(req: NextRequest) {
    const productId = req.nextUrl.searchParams.get('product_id');
    const accessToken = await getAccessToken();
    const res = await fetch(`${api_productServiceEndpoint}/get/${productId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },

    });
    const data = await res.json();
    // console.log(data);
    return new NextResponse(JSON.stringify({ data: data }), { status: res.status });
}