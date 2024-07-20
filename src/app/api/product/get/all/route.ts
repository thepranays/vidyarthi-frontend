import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { NextResponse } from "next/server";


//Get all products from db
export async function GET() {
    //const accessToken = await getAccessToken(); not required as free to visit route
    const res = await fetch(`${api_productServiceEndpoint}/get/all`, {
        method: "GET", cache: "no-store" //dont store in cache always make new request to fetch fresh data
        , headers: { "Content-Type": "application/json" },
    }).catch((e) => {
        //If backend down or any network issue connecting with backend then return empty list of products
        return new NextResponse(JSON.stringify({ data: [] }), { status: 500 });

    });
    const data = await res.json();

    if (res.status >= 500) { //if server side error then return empty list of products
        return new NextResponse(JSON.stringify({ data: [] }), { status: res.status });
    }
    return new NextResponse(JSON.stringify({ data: data }), { status: res.status });

}