/*not being used*/

// import { getAccessToken } from "@/utils/SessionTokenAccessor";
// import { NextApiRequest } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import { json } from "stream/consumers";

// export async function GET(req: NextRequest) {
//     const pathNameSplit = req.nextUrl.pathname.split("/");
//     const eventId = pathNameSplit[pathNameSplit.length - 1];

//     //get access token for jwt authorization at backend
//     const accessToken = await getAccessToken();
//     //subscribe To Product Created Event notification using Server-Sent Events (SSE)
//     const productCreatedSSE = await fetch(`http://localhost:8081/api/notification/${eventId}`
//         , { method: "GET", headers: { "Content-Type": "text/event-stream", "Authorization": `Bearer ${accessToken}` } });
//     const productCreatedNotification = await productCreatedSSE.text();  //as text/event-stream

//     while (productCreatedNotification.split(":")[0] !== "id") {
//         //wait for valid notification
//     }

//     /*payload form -> 
        
//         id:a258f171-77bb-4bbf-9c12-b756809194c0
//         data:g
//         event:product-created-event
//         retry:2000

//     */
//     const data = productCreatedNotification.split(":")[2].split("\n")[0];
//     //return only when valid notification, no heartbeat
//     return new NextResponse(data, { headers: { "Content-Type": "text/event-stream" }, status: 200 });
// }