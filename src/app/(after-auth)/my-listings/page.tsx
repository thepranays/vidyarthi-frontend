'use client'
import { Product } from "@/app/models/Product";
import MyListingProductCategory from "@/components/product/MyListingProductCategory";
import ProductComponent from "@/components/product/ProductComponent";
import { PRODUCT_CATEGORY_LIST, PRODUCT_TYPE_REQUEST, PRODUCT_TYPE_SELL } from "@/constants/constants";

import { Suspense, useEffect, useState } from "react";

//Fetch all products
const getProductsList = async (setProductList: Function) => {
    const req = await fetch("api/product/get/user-products", {
        method: "GET", headers: { "Content-Type": "application/json" },
        cache: "no-store" //dont 
    });
    const products: Product[] = (await req.json()).data;  //format : { data:[{},{}.. ] }
    setProductList(products); //set fetched products list to UI 
}


export default function MyListings(params: { categoryFilterList: string[] }) {


    const [productList, setProductList] = useState([]);

    //Run on mounting
    useEffect(() => {
        getProductsList(setProductList);
    }, []);

    const defaultCategoryFilter = new Set<String>();
    defaultCategoryFilter.add(PRODUCT_TYPE_SELL); // show selling products i.e. user wish to buy if true



    const [categoryFilterList, setCategoryFilterList] = useState<Set<String>>(defaultCategoryFilter); //by default show products to buy

    return <div className="flex">

        <div className="flex flex-col">
            <h1 className="mb-5 text-3xl font-bold">My Listings</h1>

            <MyListingProductCategory setCategoryFilterList={setCategoryFilterList} categoryFilterList={categoryFilterList} />
        </div>



        <div
            className="ml-5 w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>



        <div className="p-10 h-full">

            <div className="grid grid-cols-4 gap-4">
                <Suspense fallback={<div><h1>Loading products.</h1></div>}>
                    {/* Filter on basis of category and type selected ,if nothing selected then show all categories will be shown for the type Selected*/}
                    {productList.map((e: Product) => {
                        if (categoryFilterList.has(e.category) && categoryFilterList.has(e.type))
                            return <ProductComponent key={e.product_id} product={e} />
                        else if (categoryFilterList.size == 1 && categoryFilterList.has(e.type)) {
                            return <ProductComponent key={e.product_id} product={e} />
                        } else if (categoryFilterList.size == 0) {
                            return <ProductComponent key={e.product_id} product={e} />
                        }
                    })}
                </Suspense>

            </div>

        </div>

    </div>







}