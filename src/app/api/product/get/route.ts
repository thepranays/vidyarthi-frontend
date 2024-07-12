import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextRequest, NextResponse } from "next/server";

//Get product detail by id 
export async function GET(req: NextRequest) {
    const productId = req.nextUrl.searchParams.get('product_id');
    // const accessToken = await getAccessToken(); not required as free to visit route
    const res = await fetch(`${api_productServiceEndpoint}/get/${productId}`, {
        method: "GET", cache: "no-store", //dont store in cache always make new request to fetch fresh data
        headers: { "Content-Type": "application/json", },

    });
    const data = await res.json();
    // console.log(data);
    return new NextResponse(JSON.stringify({ data: data }), { status: res.status });
}