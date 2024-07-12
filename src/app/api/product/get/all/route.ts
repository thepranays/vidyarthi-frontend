import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextResponse } from "next/server";


//Get all products from db
export async function GET() {
    const accessToken = await getAccessToken();
    const res = await fetch(`${api_productServiceEndpoint}/get/all`, {
        method: "GET", next: { revalidate: 5 }
        , headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
    }); //revalidate to get latest product list from db [every 60 seconds]
    const data = await res.json();
    // console.log(data);
    return new NextResponse(JSON.stringify({ data: data }), { status: res.status });

}