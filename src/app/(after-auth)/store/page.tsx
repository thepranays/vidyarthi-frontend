
import { Product } from "@/app/models/Product";
import ProductComponent from "@/components/product/ProductComponent";

import { Suspense } from "react";




export default async function Store(params: { categoryFilterList: string[] }) {
    //Fetch all products
    const reqProducts = await fetch("http:localhost:3000/api/product/get/all", {
        method: "GET", headers: { "Content-Type": "application/json" },
        next: { revalidate: 1 } //revalidate to get latest product list from db, [every 1 seconds]
    });
    const products = (await reqProducts.json()).data; //format : { data:[{},{}.. ] }



    //Component
    return <div className="p-10 h-full">

        <div className="grid grid-cols-4 gap-4">
            <Suspense fallback={<div> <h1>Loading products.</h1></div>}>
                {products.map((e: Product) => {

                    return <ProductComponent key={e.product_id} product={e} />
                })}
            </Suspense>

        </div>

    </div>
}