
import ContactNow from "@/components/product/ContactNow";
import { getAccessToken } from "@/utils/SessionTokenAccessor";
import { jwtDecode } from "jwt-decode";
import { Suspense } from "react";


export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {

    //TODO: here product and user data is again getting fetched after store screen {use state management in future}
    const productReq = await fetch(`http://localhost:3000/api/product/get?product_id=${params.productId}`, { method: "GET" });
    const productData = (await productReq.json()).data;
    // console.log(productData);
    const productUserReq = await fetch(`http://localhost:3000/api/user/get?uid=${productData.uid}`, { method: "GET" });
    const productUserData = (await productUserReq.json()).user;
    const decodedAccessToken = jwtDecode(await getAccessToken() ?? "");
    const uid = decodedAccessToken.sub ?? "";
    // console.log(productData);
    //used suspense for html streaming
    return <Suspense fallback={<div>Loading</div>}>

        <div className="w-full flex mt-10">
            <div className="w-full">
                <img className="h-full w-full" src={(productData.product_img === "" || productData.product_img === null || productData.product_img === undefined) ? "https://t3.ftcdn.net/jpg/04/21/88/02/360_F_421880296_IeHkMQblZwDGwPuWG2GuxWW4DAuAZA9h.jpg" : `data:image/*; base64,${productData.product_img}`} alt="404" />

            </div>

            <div className="ml-5 mr-10 w-1/2">
                <div className="group block mb-5">
                    <div className="flex items-center">
                        <img className="inline-block flex-shrink-0 size-[62px] rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                        <div className="ms-3">
                            <h3 className="font-semibold text-gray-800 dark:text-white">{productUserData.first_name} {productUserData.last_name}</h3>
                            <p className="text-sm font-medium text-gray-400 dark:text-neutral-500">{productUserData.email}</p>
                        </div>
                    </div>
                </div>
                <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{productData.title}</h1>
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-gray-300">{productData.description}</h5>
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"> ₹ {productData.price}</h5>
                <ContactNow uid={uid} product={productData} productUser={productUserData}></ContactNow>
            </div>

        </div>
    </Suspense>
}

