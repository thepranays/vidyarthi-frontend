'use client'
import ProductCategory from "@/components/product/ProductCategory"
import React, { useState } from "react";
export const PageContext = React.createContext(null);

export default function StoreLayout({ children, }: { children: React.ReactNode }) {
    const [categoryFilterList, setCategoryFilterList] = useState([]);
    return <div className="flex">

        <ProductCategory setCategoryFilterList={setCategoryFilterList} categoryFilterList={categoryFilterList} />



        <div
            className="ml-5 w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>


        <div>{children}</div>

    </div>
}