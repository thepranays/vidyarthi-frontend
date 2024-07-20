import { Conversation } from "@/app/models/Conversation";
import { Suspense } from "react";

export default function ChatTile(props: { conv: Conversation }) {

    //console.log("hiii", props.conv);

    return (
        <div>
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {props.conv.recipient_user.first_name} {props.conv.recipient_user.last_name}
                        </p>
                        <p className="text-start text-sm text-gray-500 truncate dark:text-gray-400">
                            {props.conv.lastMsg}
                        </p>
                    </div>

                </div>
            </li>
        </div>
    );
}