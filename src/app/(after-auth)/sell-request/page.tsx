'use client'

import { PRODUCT_TYPE_REQUEST, PRODUCT_TYPE_SELLING } from "@/constants/constants";
import { useState } from "react";

//Create new product listing in db
const submitForm = async (form: { title: string, description: string, price: string, category: string, product_img?: File, type: string }) => {
    // console.log(form);
    if (form.title == "" || form.description == "" || form.price == "" || form.category == "" || form.type == "") {
        alert("Incorrect input, please correct and try again");
        return;
    }

    //Multipart form 
    const formData = new FormData();
    const productFormData = { title: form.title, description: form.description, price: form.price, category: form.category, type: form.type };
    formData.append("product", JSON.stringify(productFormData)); //send data to nextjs server in stringify form
    if (form.product_img) { //if user uploads image then only add product_img request part
        formData.append("product_img", form.product_img);
    }
    const res = await fetch("/api/product/create", {
        method: "POST",
        //Let browser decide contenttype in headers
        body: formData,

    });

}

export default function SellItem() {
    const [isSelling, setIsSelling] = useState(true);// true-selling , false-requesting 
    const [form, setForm] =
        useState<{ title: string, description: string, price: string, category: string, product_img?: File, type: string }>
            ({ title: "", description: "", price: "", category: "", type: isSelling ? PRODUCT_TYPE_SELLING : PRODUCT_TYPE_REQUEST });

    return <div className="flex w-full flex-col justify-center items-center">

        <h1 className=" text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Create {isSelling ? "Sell" : "Request"} Post</h1>
        <div className="flex flex-row mt-5 ">
            <button onClick={() => { setIsSelling(true); setForm({ ...form, type: isSelling ? PRODUCT_TYPE_SELLING : PRODUCT_TYPE_REQUEST }); }}><div className={`rounded-l-lg flex items-center justify-center  ${isSelling ? "dark:bg-indigo-700" : "dark:border dark:border-indigo-900"} w-44 h-16 dark:hover:bg-indigo-900`}>Sell</div></button>

            <button onClick={() => { setIsSelling(false); setForm({ ...form, type: isSelling ? PRODUCT_TYPE_SELLING : PRODUCT_TYPE_REQUEST }); }}><div className={`rounded-r-lg flex items-center justify-center shadow-md w-44 h-16 ${isSelling ? "dark:border dark:border-indigo-900" : "dark:bg-indigo-700"} dark:hover:bg-indigo-900`}>Request</div></button>
        </div>
        <div className="mt-10 w-1/4">
            <label htmlFor="product-title"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white hover:text-10">Product</label>
            <input type="text" id="product-title" onChange={(e) => { setForm({ ...form, title: e.target.value }) }}
                className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                placeholder={`What are you ${isSelling ? "selling" : "requesting"}`} required />
        </div>

        <div className="mt-5 w-1/4">
            <label htmlFor="product-desc"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Describe the product</label>
            <textarea id="product-desc" rows={4} onChange={(e) => { setForm({ ...form, description: e.target.value }) }}
                className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                placeholder="eg.xyz product 2 years old ,used for this, z is broken,x is still good etc.."></textarea>
        </div>

        <div className="mt-5 w-1/4">
            <label htmlFor="product-price"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white hover:text-10">{isSelling ? "" : "Expected "}Price (in ₹)</label>
            <input type="number" id="product-price" onChange={(e) => { setForm({ ...form, price: e.target.value }) }}
                className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                placeholder="69.69" required />



        </div>
        <div className="mt-5 w-1/4">
            <label htmlFor="product-category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select onChange={(e) => { setForm({ ...form, category: e.target.value }) }} id="product-category" className="bg-black border border-indigo-900 text-white text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 ">
                <option defaultValue="">Select Category</option>
                <option defaultValue="books">Books</option>
                <option defaultValue="notes">Notes</option>
                <option defaultValue="academic_tools">Academic Tools</option>
                <option defaultValue="digital_devices">Digital Devices</option>
                <option defaultValue="others">Others</option>
            </select>
            <label htmlFor="product-title"
                className="mt-5 block text-sm font-medium text-indigo-900 dark:text-white hover:text-10">Add a photo</label>
        </div>


        <div className="flex mt-3 items-center justify-center w-1/4">

            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-4 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className=" text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input id="dropzone-file" onChange={(e) => { setForm({ ...form, product_img: e.target.files?.[0] }) }} type="file" accept="image/*" className="hidden" />
            </label>
        </div>

        <div className="mt-10 w-1/4">
            <button type="submit" onClick={() => submitForm(form)} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Place Order</button>

        </div>



    </div >

}