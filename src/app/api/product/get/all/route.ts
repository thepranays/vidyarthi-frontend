import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { NextResponse } from "next/server";


//Get all products from db
export async function GET() {
    const res = await fetch(`${api_productServiceEndpoint}/get/all`, { method: "GET", next: { revalidate: 5 } }); //revalidate to get latest product list from db [every 60 seconds]
    const data = await res.json();
    // console.log(data);
    return new NextResponse(JSON.stringify({ data: data }), { status: res.status });

}