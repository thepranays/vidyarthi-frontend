'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

import { MdOutlineLogin } from "react-icons/md";
import "../app/globals.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

import { refreshTokenError } from "@/constants/constants";
import { AiOutlineMessage } from "react-icons/ai";

import { useRouter } from "next/navigation";



//terminate keycloak logged in session
const keyCloakSessionLogOut = async () => {
    try {
        await fetch("/api/auth/logout", { method: "GET" });
    } catch (err) {
        console.log(err);
    }
}

//Check whether user exists in db or not, if Yes get any updated data from db, else store in db
const checkUserExistInDb = async (session: Session) => {
    const userData = await fetch(`/api/user/get?uid=${session.user?.uid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    });


    if (userData.status == 404) { //if no such uid user exists , means this is first time sign in after registration
        //store user data in db
        const response = await fetch(`/api/user/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(session.user),

        });
        const data = await response.json();
        // console.log(data);
        //checkUserExistInDb(session);
    } else if (userData.status == 500) {
        const data = await userData.json();
        console.log("Internal server error:", data);
    }
    else {
        const data = await userData.json();
        // console.log(data);
        if (session.user)
            session.user.profile_img_url = data.user.profile_img_url;

    }


}



const Navbar = () => {

    const { data: session, status } = useSession(); //fetch session and status from useSession react hook
    const [avatarDropDown, setAvatarDropDown] = useState(false);


    //call few functions whenever session and its status switches to intended conditions 
    useEffect(() => {
        if (status != "loading" && session && session?.error === refreshTokenError) {
            signOut({ callbackUrl: "/" });
        }

    }, [session, status]);

    useEffect(() => {
        // console.log('beforesession')
        if (status != "loading" && session && session.user) {//if session exist then check for user exist in db or not.
            // console.log('hi')
            checkUserExistInDb(session);
        }

    }, [session, status]); //runs once only when component mounts and renders 

    const links = [
        {

            id: 1,
            name: "HOME",
            link: "/",
        },
        {
            id: 2,
            name: "STORE",
            link: "/store",
        },
        {
            id: 3,
            name: "SELL/REQUEST",
            link: "/sell-request",
        },
        {
            id: 4,
            name: "ABOUT US",
            link: "/aboutus",
        },



    ];

    return (
        <div className="flex w-screen relative">
            <div className="flex justify-center items-centers mt-5 mb-5 w-full h-15 text-white bg-black ">


                <ul className="hidden md:flex">
                    {links.map(({ id, name, link }) => (
                        <li
                            key={id}
                            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
                        >
                            <Link href={link} replace>{name}</Link>
                        </li>
                    ))}
                </ul>



            </div>


            {status == "loading" ?
                <p className="md:flex nav-links pr-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">Loading</p>
                : session ? afterLoginNavIcons(session, avatarDropDown, setAvatarDropDown) : beforeLoginNavIcon()}




        </div >
    );
};




const beforeLoginNavIcon = () => {
    return (<div className="flex absolute right-5 text-white bg-black">
        <div className="mt-5 mb-5 h-5">
            <li
                key={5}
                className=" md:flex nav-links pr-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            >


                <a onClick={() => { signIn("keycloak") }}>LOGIN</a>


                <MdOutlineLogin size={25} />
            </li>
        </div>
    </div>);
}
const afterLoginNavIcons = (session: Session, avatarDropDown: boolean, setAvatarDropDown: Function) => {

    return (<div className="flex absolute right-5" onMouseLeave={() => { setAvatarDropDown(false); }}>

        <div className="mt-5 mb-5 cursor-pointer hover:scale-150 duration-200 ">
            <Link href="/chat"><AiOutlineMessage size={25} /></Link>

        </div>


        <div className="ml-5 mt-5 ml-5 mr-5"  >

            <button id="dropdownUserAvatarButton" onClick={() => { setAvatarDropDown(!avatarDropDown); }} className="flex text-sm rounded-full md:me-0 cursor-pointer hover:scale-150 focus:scale-150 duration-200 " type="button">
                <span className="sr-only">Open user menu</span>

                <FiUser size={25} />
                {/* <Link href="/profile"><FiUser size={25} /></Link> */}

            </button>

            {avatarDropDown ?
                (<div id="dropdownAvatar" className="z-10 absolute right-5 mt-2 bg-gray-700  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div> {`${session.user?.first_name} ${session.user?.last_name}`} </div>
                        <div className="font-medium truncate">{`${session.user?.email}`}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer" aria-labelledby="dropdownUserAvatarButton">

                        <li>
                            <a href="/editprofile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>

                    </ul>
                    <div className="py-2 cursor-pointer">
                        <a onClick={() => { keyCloakSessionLogOut().then(() => { signOut({ callbackUrl: "/" }); }) }} className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div>) :
                (<div></div>)

            }
        </div>


    </div>);

}

export default Navbar;