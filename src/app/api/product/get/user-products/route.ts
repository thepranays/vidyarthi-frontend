import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { jwtDecode } from "jwt-decode";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const token = await getAccessToken();
    const uid = jwtDecode(token ?? "").sub;


    const res = await fetch(`${api_productServiceEndpoint}/get?uid=${uid}`, {
        method: "GET", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, cache: "no-store" //dont 
    });
    const products = await res.json();
    return new NextResponse(JSON.stringify({ data: products }), { status: res.status });;


}