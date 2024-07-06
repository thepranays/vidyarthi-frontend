'use client';

import { Product } from "@/app/models/Product";
import { User } from "@/app/models/User";
import Link from "next/link";


export default function ContactNow(props: { uid: string, product: Product, productUser: User }) { //set product_img ="" to avoid overfilling the url with characters
    return (<div className="relative top-1/3">

        <Link href={{ pathname: "/chat", query: { ...props.product, product_img: "", ...props.productUser } }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            Contact Now!
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </Link>
    </div >);
}