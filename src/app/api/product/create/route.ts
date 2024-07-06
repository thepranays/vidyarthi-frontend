import { api_productServiceEndpoint } from "@/constants/api_endpoints";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";


//create new product order
export async function POST(req: NextRequest) {

    const accessToken = await getAccessToken();
    const decodedToken = jwtDecode(accessToken ?? "");
    const userId = decodedToken.sub;//uid of user placing order
    const form = await req.formData();

    const productDataForm
        = { ...(JSON.parse(form.get("product")?.toString() ?? "")), uid: userId }; //Json parse is required as data is coming in json.stringify form from client

    //Multipart form
    const formData = new FormData();
    const productDataBlob = new Blob([JSON.stringify(productDataForm)], { //BLOB is required to define content-type (as per backend api endpoint requirement)
        type: 'application/json'
    });
    formData.append("product", productDataBlob);
    if (form.has("product_img")) {

        formData.append("product_img", form.get("product_img") ?? "");
    }

    const res = await fetch(`${api_productServiceEndpoint}/create`, {
        method: "POST",
        //Let browser decide contenttype in headers
        body: formData,



    });


    if (res.status != 201) {
        const data = await res.json();
        return new NextResponse(JSON.stringify({ msg: "Error placing order", error: data }), { status: res.status });
    }
    return new NextResponse(JSON.stringify({ msg: "Successfully placed order" }), { status: res.status });
}