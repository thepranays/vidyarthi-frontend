import { PRODUCT_CATEGORY_LIST, PRODUCT_TYPE_REQUEST, PRODUCT_TYPE_SELL } from "@/constants/constants";


export default function MyListingProductCategory(props: { setCategoryFilterList: Function, categoryFilterList: Set<String> }) {

    const handleCategoryFilterChange = (e: any, category: string) => {
        //e-> onChange event
        if (e.target.checked) { //add checked category to category list
            props.setCategoryFilterList((set: Set<String>) => {
                set.add(category);
                return new Set(set); //return new map to avoid mutation rule of setState
            });
        } else {
            props.setCategoryFilterList((set: Set<String>) => {
                set.delete(category);
                return new Set(set);  //return new map to avoid mutation rule of setState
            });
        }
    }
    return (
        <div className="h-full">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Type</h3>
            <div className="flex flex-row mt-5 ">
                <button onClick={() => {
                    props.setCategoryFilterList((set: Set<String>) => {
                        //set store to see products to buy 
                        if (set.has(PRODUCT_TYPE_REQUEST))
                            set.delete(PRODUCT_TYPE_REQUEST);
                        set.add(PRODUCT_TYPE_SELL);
                        return new Set(set);
                    });
                }}><div className={`rounded-l-lg flex items-center justify-center  w-24 h-16 ${props.categoryFilterList.has(PRODUCT_TYPE_SELL) ? "dark:bg-indigo-700" : "dark:border dark:border-indigo-900"} dark:hover:bg-indigo-900`}>Selling</div></button>

                <button onClick={() => {
                    props.setCategoryFilterList((set: Set<String>) => {
                        //set store to see product requests 
                        if (set.has(PRODUCT_TYPE_SELL))
                            set.delete(PRODUCT_TYPE_SELL);
                        set.add(PRODUCT_TYPE_REQUEST);
                        return new Set(set);
                    })
                }}><div className={`rounded-r-lg flex items-center justify-center shadow-md w-24 h-16 ${props.categoryFilterList.has(PRODUCT_TYPE_REQUEST) ? "dark:bg-indigo-700" : "dark:border dark:border-indigo-900"} dark:hover:bg-indigo-900`}>Requested</div></button>
            </div>

            <h3 className="mt-5 mb-4 font-semibold text-gray-900 dark:text-white">Categories</h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800 dark:text-white">

                {PRODUCT_CATEGORY_LIST.map((category) => {
                    return (<li key={category} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id={`${category}-checkbox`} type="checkbox" value={category} onChange={(e) => handleCategoryFilterChange(e, category)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor={`${category}-checkbox`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category}</label>
                        </div>
                    </li>);
                })}

            </ul>

        </div>
    );
}
