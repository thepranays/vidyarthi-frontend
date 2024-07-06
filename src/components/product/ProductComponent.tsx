import { Product } from "@/app/models/Product";

export default function ProductComponent(props: { product: Product }) {
    //src={props.product.img_url} 


    return (<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">


        <img className="rounded-t-lg" src={(props.product.product_img === "" || props.product.product_img === null || props.product.product_img === undefined) ? "https://t3.ftcdn.net/jpg/04/21/88/02/360_F_421880296_IeHkMQblZwDGwPuWG2GuxWW4DAuAZA9h.jpg" : `data:image/*; base64,${props.product.product_img}`} alt="404" />

        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.product.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.product.description}</p>
            <a href={`/products/${props.product.product_id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                ₹ {props.product.price}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>
    </div >);


}