import { api_userServiceEndpoint } from "@/constants/api_endpoints";

import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";


export async function POST(req: NextRequest) {


    try {
        const response = await fetch(api_userServiceEndpoint + "/create", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(await req.json()),

        });

        return new NextResponse(JSON.stringify({ success: "stored user data in db", result: await response.json() }), { status: response.status });

    } catch (e) {
        console.log("Error while storing user data in db:");
        return new NextResponse(JSON.stringify({ failed: "failed to store user data in db", error: e }), { status: 500 });

    }


}