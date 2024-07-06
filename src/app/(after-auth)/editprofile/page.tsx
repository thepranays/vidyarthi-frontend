export default function Profile() {
    return (

        <div className="w-full">

            <main className="w-full flex justify-center items-center">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-3 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Edit Profile</h2>

                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                    alt="Bordered avatar" />

                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button type="button"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                        Change picture
                                    </button>
                                    <button type="button"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-indigo-300 rounded-lg border border-indigo-200 hover:bg-indigo-200 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                        Delete picture
                                    </button>
                                </div>
                            </div>

                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                                <div
                                    className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="first_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white hover:text-10">Your
                                            first name</label>
                                        <input type="text" id="first_name"
                                            className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                                            placeholder="Your first name" required />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="last_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                            last name</label>
                                        <input type="text" id="last_name"
                                            className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                                            placeholder="Your last name" required />
                                    </div>

                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Year Of Studying</label>
                                    <select id="year" className="bg-black border border-indigo-900 text-white text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 ">
                                        <option selected>Select Year</option>
                                        <option defaultValue="1">1</option>
                                        <option defaultValue="2">2</option>
                                        <option defaultValue="3">3</option>
                                        <option defaultValue="4">4</option>
                                    </select>

                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="branch"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        branch</label>
                                    <input type="text" id="branch"
                                        className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                                        placeholder="eg. ECE" required />
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" id="email"
                                        className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                                        placeholder="eg. your.email@mail.com" required />
                                </div>


                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="contact-number"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                        Contact Number</label>
                                    <input type="text" id="contact-number"
                                        className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                                        placeholder="eg. +91234567890" required />
                                </div>



                                <div className="mb-6">
                                    <label htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                    <textarea id="message" rows={4}
                                        className="bg-black dark:bg-black dark:border dark:border-indigo-900 text-white text-sm dark:rounded-lg dark:focus:ring-indigo-700 dark:focus:border-indigo-700 block w-full p-2.5 "
                                        placeholder="Write your bio here..."></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit"
                                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}