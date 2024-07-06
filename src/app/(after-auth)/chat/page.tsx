'use client';
import ChatTile from "@/components/chat-room/ChatTile";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useSession } from "next-auth/react";
import { ws_chatServiceEndpoint } from "@/constants/api_endpoints";
import MessageTile from "@/components/chat-room/MessageTile";
import { useSearchParams } from "next/navigation";
import { Conversation } from "@/app/models/Conversation";
import { Message } from "@/app/models/Message";
import { User } from "@/app/models/User";
import { ConversationRoom } from "@/app/models/ConversationRoom";
import ConversationModeToggle from "@/components/chat-room/ConversationModeToggle";

//Get conversion using convo_id;
const getConversationByConvoIdWithUser = async (convo_id: string, isBuying: boolean) => {
    //Fetch Conversation by convo id from db
    const conversation = await fetch(`/api/conversation/get?convo_id=${convo_id}`, {
        method: "GET", headers: { "Content-Type": "application/json" }, cache: "no-store"

    });

    const convoData = (await conversation.json()).data;  //{data:{Conversation}}s
    // console.log(convData);

    //Fetch conversation recipient's user data (if current user is buyer then recipient is seller else opposite of this)
    const res = await fetch(`/api/user/get?uid=${isBuying ? convoData.seller_uid : convoData.buyer_uid}`, { method: "GET", cache: "no-store" });
    const recipientUser = (await res.json()).user;
    const convoWithuser = new Conversation(convoData.convo_id, convoData.buyer_uid, convoData.seller_uid, convoData.lastMsg,
        recipientUser, convoData.lastMsg_uid, convoData.product_id, convoData.createdAt);

    return convoWithuser;

}

//Get Conversation using buyer_uid,seller_uid,product_id
const getConversationWithUser = async (buyer_uid: string, seller_uid: string, product_id: string, isBuying: boolean) => {
    //Fetch Conversation from db
    const conversation = await fetch(`/api/conversation/get?product_id=${product_id}&buyer_uid=${buyer_uid}&seller_uid=${seller_uid}`, {
        method: "GET", headers: { "Content-Type": "application/json" }, cache: "no-store"

    });
    const convData = (await conversation.json()).data;  //{data:{Conversation}}
    // console.log(convData);

    //Fetch conversation recipient's user data (if current user is buyer then recipient is seller else opposite of this)
    const res = await fetch(`/api/user/get?uid=${isBuying ? seller_uid : buyer_uid}`, { method: "GET", cache: "no-store" });
    const recipientUser = (await res.json()).user;
    const convoWithuser = new Conversation(convData.convo_id, convData.buyer_uid, convData.seller_uid, convData.lastMsg,
        recipientUser, convData.lastMsg_uid, convData.product_id, convData.createdAt);
    //console.log(convoWithuser);
    return convoWithuser;

}

//Create and return new conversation
const createAndGetConversation = async (buyer_uid: string, seller_uid: string, product_id: string, isBuying: boolean) => {
    const convCreateRes = await fetch(`/api/conversation/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyer_uid, seller_uid, product_id }),
        cache: "no-store"
    });
    //console.log(convCreateRes.status);
    if (convCreateRes.status === 201) { // conversation created successfully
        //Get newly created conversation from db
        return await getConversationWithUser(buyer_uid, seller_uid, product_id, isBuying);
    }

}

//Get conversations of user where current user is buyer along with selling user'data (recipient for current user)
const getBuyConversationRoomsMap = async (uid: string): Promise<Map<String, ConversationRoom>> => {

    const buyConvListReq = await fetch(`/api/conversation/get/buying?uid=${uid}`, {
        method: "GET", cache: "no-store"
    });
    const buyConvList = (await buyConvListReq.json()).data; //{data:[obj1,obj2,...]}
    if (!buyConvList) return new Map<String, ConversationRoom>(); // if no buying conversations list found on db

    //If buying conversations list from db is found
    //then Fetch each conversation's recipient user's data and store for further use in conversation object
    const buyConvoListWithUser = await Promise.all(

        buyConvList.map(async (convo: any) => {
            const res = await fetch(`/api/user/get?uid=${convo.seller_uid}`, { method: "GET", cache: "no-store" });
            const recipientUser = (await res.json()).user;
            const conv = new Conversation(convo.convo_id, convo.buyer_uid, convo.seller_uid, convo.lastMsg, recipientUser, convo.lastMsg_uid, convo.product_id, convo.createdAt);
            return conv;
        })
    );
    //TODO:Fetch messages belonging to each conversation from db

    //Create map of convo_id->ConversationRoom
    const buyConvoRoomsMap = new Map<String, ConversationRoom>();
    buyConvoListWithUser.forEach((convo: Conversation) => buyConvoRoomsMap.set(convo.convo_id, new ConversationRoom(convo, [])));
    //console.log(buyConvoRoomsMap);
    return buyConvoRoomsMap;

}

//Get conversations of current user where current user is seller along with buying user'data (recipient for current user)
const getSellConversationRoomsMap = async (uid: string): Promise<Map<String, ConversationRoom>> => {

    const sellConvListReq = await fetch(`/api/conversation/get/selling?uid=${uid}`,
        { method: "GET", cache: "no-store" }
    );

    const sellConvList = (await sellConvListReq.json()).data; //{data:[obj1,obj2,...]}
    if (!sellConvList) return new Map<String, ConversationRoom>(); // if no selling conversations list found on db

    //If selling conversations list from db is found
    //then Fetch each conversation's recipient user's data and store for further use in conversation object
    const sellConvoListWithUser = await Promise.all(
        sellConvList.map(async (convo: any) => {
            const res = await fetch(`/api/user/get?uid=${convo.buyer_uid}`, { method: "GET", cache: "no-store" });
            const recipientUser = (await res.json()).user;
            const conv = new Conversation(convo.convo_id, convo.buyer_uid, convo.seller_uid, convo.lastMsg, recipientUser, convo.lastMsg_uid, convo.product_id, convo.createdAt);
            return conv;
        })
    );
    //TODO:Fetch messages belonging to each conversation from db

    //Create map of convo_id->ConversationRoom
    const sellConvoRoomsMap = new Map<String, ConversationRoom>();
    sellConvoListWithUser.forEach((convo: Conversation) => sellConvoRoomsMap.set(convo.convo_id, new ConversationRoom(convo, [])));
    //console.log(sellConvoRoomsMap);
    return sellConvoRoomsMap;



}

export default function Chat() {
    //Websocket connnection client
    const stompClient = useRef(new Client({ brokerURL: ws_chatServiceEndpoint, })); //import to use useRef to avoid
    //receive message queue url of current user (unique:uid)
    let msgQueue: string;

    //Defines current open conversation
    const [conversationRoom, setConversationRoom] = useState<ConversationRoom>(new ConversationRoom(new Conversation("", "", "", "", new User("", "", "", "", "", "", "", "", "", ""), "", "", ""), []));
    //ConversationRoom reference to avoid losing reference to conversationRoom inside stomp subscribe callback function
    const conversationRoomRef = useRef(conversationRoom); //to avoid losing reference to current conversation Room object
    useEffect(() => {
        conversationRoomRef.current = conversationRoom;
    }, [conversationRoom]);//when conversationRoom is changed then update conversationRoomReference also



    //user buying conversation_id to its Conversation room map
    const [buyConvoRoomsMap, setBuyConvoRoomsMap] = useState(new Map<String, ConversationRoom>())//convo_Id->{convo,msgs[]} mapping
    //user selling conversation_id to its Conversation room map
    const [sellConvoRoomsMap, setSellConvoRoomsMap] = useState(new Map<String, ConversationRoom>()) //convo_Id->{convo,msgs[]} mapping

    //For session management and session data
    const { data: session, status } = useSession();
    //For message to be sent
    const [msgInput, setMsgInput] = useState("");
    //For user who got redirected from selling product list page or from requested product list page
    const searchParams = useSearchParams();

    //if current user redirected from listed product for sell then user is buying 
    //else if redirected from requested product screen then user is selling
    const [isBuying, setIsBuying] = useState(searchParams.get("type") == "sell");




    //OnConncted to chat-websocket on backend , subscribe to current user's message queue    
    const subscribeToMyMessageQueue = (msgQueue: string) => {

        //Connect to chat-websocket on backend
        stompClient.current.onConnect = (frame) => {
            console.log('Connected to chat websocket: ' + frame);
            //subscribe to curent User's message queue {unique=uid}, to receive incoming messages (setting up hook/callback function)
            stompClient.current.subscribe(msgQueue, async (msg) => {

                const msgObj = JSON.parse(msg.body);
                const msgReceivedOnConvo_id = msgObj.convo_id;
                //console.log(msgObj);

                // console.log(msgObj.convo_id, " ", conversationRoomRef.current.convo.convo_id);

                //If msg belongs to current opened conversation then add received message to its message list and update UI using setState
                if (msgObj.convo_id == conversationRoomRef.current.convo.convo_id) {
                    conversationRoomRef.current.msgs.push(new Message(msgObj.msg_id, msgObj.convo_id, msgObj.msg, msgObj.sender_uid, msgObj.recipient_uid, msgObj.createdAt));
                    setConversationRoom({ ...conversationRoomRef.current });
                    // return;
                }
                //If received message's conversation doesn't exist in conversation-room map,then fetch the conversation details and add it.
                if (isBuying) {
                    if (!buyConvoRoomsMap.has(msgReceivedOnConvo_id)) {
                        //Get Conversation data from db using msgReceivedOnConvo_id
                        const fetchedConvo = await getConversationByConvoIdWithUser(msgReceivedOnConvo_id, isBuying);
                        //add to buy convo rooms
                        buyConvoRoomsMap.set(msgReceivedOnConvo_id, new ConversationRoom(fetchedConvo, []));

                        buyConvoRoomsMap.get(msgReceivedOnConvo_id)?.msgs.push(new Message(msgObj.msg_id, msgObj.convo_id, msgObj.msg, msgObj.sender_uid, msgObj.recipient_uid, msgObj.createdAt));
                        setBuyConvoRoomsMap(new Map(buyConvoRoomsMap));
                    }



                } else {
                    if (!sellConvoRoomsMap.has(msgReceivedOnConvo_id)) {
                        //Get Conversation data from db using msgReceivedOnConvo_id
                        const fetchedConvo = await getConversationByConvoIdWithUser(msgReceivedOnConvo_id, isBuying);
                        sellConvoRoomsMap.set(msgReceivedOnConvo_id, new ConversationRoom(fetchedConvo, []));
                        sellConvoRoomsMap.get(msgReceivedOnConvo_id)?.msgs.push(new Message(msgObj.msg_id, msgObj.convo_id, msgObj.msg, msgObj.sender_uid, msgObj.recipient_uid, msgObj.createdAt));
                        setSellConvoRoomsMap(new Map(sellConvoRoomsMap));
                    }

                }




            });


        }
    }

    //send message through websocket to intended conversation and recipient 
    const sendMessage = async (isBuying: boolean, conversationRoom: ConversationRoom, setConversationRoom: Function, conversationRoomsMap: Map<String, ConversationRoom>, setConversationRoomsMap: Function, msg: Message) => {
        //conversationRoom : current conversation room
        //If below true, means the conversation was not started thus create new conversation and get convo_id from server
        if (conversationRoomRef.current.convo.convo_id == null || conversationRoomRef.current.convo.convo_id == "") { //{} empty object
            const createdConvo = await createAndGetConversation(conversationRoomRef.current.convo.buyer_uid, conversationRoomRef.current.convo.seller_uid, conversationRoomRef.current.convo.product_id, isBuying);

            //replacing convo argument with newly created conversation for further use ,if newly created is null then keep old convo
            conversationRoom.convo = createdConvo ?? conversationRoom.convo;

            //set newly created conversation room to current conversation room in UI
            setConversationRoom(conversationRoom);

            //add created conversation room to conversation rooms map (buy/sell depends on provided setState function)
            setConversationRoomsMap((map: Map<String, ConversationRoom>) => {
                map.set(conversationRoom.convo.convo_id, conversationRoom);
                return new Map(map);
            });



        }
        // console.log("convo:", convo);

        //Set msg convo details to above fetched convo details for db storing 
        msg.convo_id = conversationRoom.convo.convo_id;
        //console.log(msg.convo_id);
        try {
            stompClient.current.publish({
                destination: "/app/chat",
                body: JSON.stringify(msg)
            });
            conversationRoom.msgs.push(msg);

            //below two lines are unnecessary as conversationRoom is same object as returned by (buy/sell)ConvoRoomsMap.get(msg.convo_id) (i.e. same reference)
            //thus pushing msgs to both means adding the msg twice. //reason: click on conversations list sets conversationRoom to clicked conversation from
            // the list thus then conversationRoom contains value=memory reference to the clicked conversation from the list
            // buyConvoRoomsMap.get(msg.convo_id)?.msgs.push(msg);
            // sellConvoRoomsMap.get(msg.convo_id)?.msgs.push(msg);



        } catch (e) {
            console.log("Error while publishing message message:", e);
        }
    }

    //connect to WebSocket on first render and mount of chat screen
    useEffect(() => {

        if (!stompClient.current.connected) { //if not connected then connect to websocket connection on backend server
            stompClient.current.activate();
        }
        if (status != "loading" && session && session.user && session.user.uid) {
            msgQueue = `/user/${session.user.uid}/queue/messages`; //setting up current user's message queue url
            //Subscribe to current user's message queue          
            subscribeToMyMessageQueue(msgQueue);


        }

        //when unmounted if stompclient is connected then unsubscribe to msg current user's message queue to avoid bandwidth wastage
        return () => { if (stompClient.current.connected) { stompClient.current.unsubscribe(msgQueue); } }
    }, [session, status, stompClient.current.connected]);

    //execute following api calls on first render/mounting:[getBuyConversationList,getSellConversationList along with recipients user's data corresponding to each conversation]
    useEffect(() => {
        if (status != "loading" && session && session.user && session.user.uid) {
            const apiCalls = async (uid: string) => {
                //Fetch user's buying and selling conversations list with recipient user data and messages as map
                const resBuy = await getBuyConversationRoomsMap(uid);
                const resSell = await getSellConversationRoomsMap(uid);

                setBuyConvoRoomsMap(resBuy);
                setSellConvoRoomsMap(resSell);

                //if user is redirected from product detail page (type:sell) 
                if (conversationRoomRef.current.convo.convo_id == "" && searchParams.get("type") == "sell") {
                    //Current user is buyer as buying product       
                    setConversationRoom(new ConversationRoom(new Conversation("",
                        uid, searchParams.get("uid") ?? "", "", new User(searchParams.get("uid") ?? "",
                            searchParams.get("username") ?? "", searchParams.get("first_name") ?? "",
                            searchParams.get("last_name") ?? "", searchParams.get("branch") ?? "", searchParams.get("email") ?? "", searchParams.get("study_year") ?? "",
                            searchParams.get("profile_img_url") ?? "", searchParams.get("created_at") ?? "",
                            searchParams.get("last_seen") ?? "",), "", searchParams.get("product_id") ?? "",
                        searchParams.get("createdAt") ?? "",), []));

                    //if user is redirected from product detail page (type:req) 
                } else if (conversationRoomRef.current.convo.convo_id == "" && searchParams.get("type") == "req") {
                    //Current user is seller as fullfilling product request           
                    setConversationRoom(new ConversationRoom(new Conversation("",
                        searchParams.get("uid") ?? "", uid, "", new User(searchParams.get("uid") ?? "",
                            searchParams.get("username") ?? "", searchParams.get("first_name") ?? "",
                            searchParams.get("last_name") ?? "", searchParams.get("branch") ?? "", searchParams.get("email") ?? "", searchParams.get("study_year") ?? "",
                            searchParams.get("profile_img_url") ?? "", searchParams.get("created_at") ?? "",
                            searchParams.get("last_seen") ?? "",), "", searchParams.get("product_id") ?? "",
                        searchParams.get("createdAt") ?? "",), []));

                }



                //Keep resBuy and resSell instead of buyConvoMap and sellConvoMap as setState does not update state right away thus buyConvoMap and sellConvoMap returns old value (here empty as just got set to fetched buy/sell convo list) 
                //For the user who got redirected from product detail's page by [contact-now] button(type:sell), (opens conversation with product's user)
                resBuy.forEach((convoRoom: ConversationRoom, convo_id: String) => {
                    if (convoRoom.convo.product_id == searchParams.get("product_id") && convoRoom.convo.buyer_uid == uid //uid= current user id
                        && convoRoom.convo.seller_uid == searchParams.get("uid")) {
                        //if previous conversation exists then set current conversation to it 
                        setConversationRoom(convoRoom);


                    }
                });


                //For the user who got redirected from product detail's page by [contact-now] button(type:req), (opens conversation with product's user)
                resSell.forEach((convoRoom: ConversationRoom, convo_id: String) => {
                    if (convoRoom.convo.product_id == searchParams.get("product_id") && convoRoom.convo.seller_uid == uid //uid= current user id
                        && convoRoom.convo.buyer_uid == searchParams.get("uid")) {
                        //if previous conversation exists then set current conversation to it 
                        setConversationRoom(convoRoom);


                    }
                });


                // console.log("buying list:", buyConversationList);
                // console.log("selling list:", sellConversationList);
            };
            apiCalls(session.user.uid);

        }
    }, []);



    //Send message on send button click
    const submitMsg = () => {
        if (session && session.user && session.user.uid) {
            // console.log("curre convoRoom:", conversationRoom)
            if (isBuying) //if current user is buying side of the product
                sendMessage(isBuying, conversationRoom, setConversationRoom, buyConvoRoomsMap, setBuyConvoRoomsMap, new Message(crypto.randomUUID(), conversationRoom.convo.convo_id ?? "", msgInput, session.user.uid, conversationRoom.convo.seller_uid ?? "", Date.now().toString()));
            else //if current user is selling side of the product
                sendMessage(isBuying, conversationRoom, setConversationRoom, buyConvoRoomsMap, setSellConvoRoomsMap, new Message(crypto.randomUUID(), conversationRoom.convo.convo_id ?? "", msgInput, session.user.uid, conversationRoom.convo.buyer_uid ?? "", Date.now().toString()));

            setMsgInput("");

        }
    };



    return (



        <div className="flex h-full max-h-screen h-full">
            <div className="flex border dark:border-gray-700 px-5 py-5">
                <ul className="overflow-y-auto">
                    <li>
                        <div className='max-w-md mx-auto'>
                            <div className="relative flex items-center w-full h-8 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                                <div className="grid place-items-center h-full w-12 text-gray-300 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    id="search"
                                    placeholder="Search person.." />
                            </div>
                        </div>
                        <ConversationModeToggle setMode={setIsBuying} isBuying={isBuying} />

                    </li>


                    <div className="">
                        <ul>

                            {isBuying ? //display buying conversations of user if user toggled to his buying conversations else show selling conversation
                                buyConvoRoomsMap != null ? [...Array.from(buyConvoRoomsMap).map((value: [convo_id: String, convoRoom: ConversationRoom], index, array) => <li key={value[1].convo.convo_id}><button onClick={() => setConversationRoom(value[1])}><ChatTile conv={value[1].convo} /></button></li>)] : [] :
                                sellConvoRoomsMap != null ? [...Array.from(sellConvoRoomsMap).map((value: [convo_id: String, convoRoom: ConversationRoom], index, array) => <li key={value[1].convo.convo_id}><button onClick={() => setConversationRoom(value[1])}><ChatTile conv={value[1].convo} /></button></li>)] : []

                            }
                        </ul>
                    </div>



                </ul>

            </div>


            <div className="flex flex-col ml-5 w-full">
                <div className="flex">
                    <img className="w-10 h-10 rounded-full" src="https://img.freepik.com/premium-photo/golden-retriever-puppy-portrait-background_1102-4650.jpg"
                        alt="404 image" />
                    <h1 className="ml-5 text-1x1 font-medium text-gray-900 truncate dark:text-white">
                        {conversationRoom.convo.recipient_user.first_name} {conversationRoom.convo.recipient_user.last_name}
                    </h1>

                </div>


                <div className="flex flex-col mt-5 mb-5 h-1/2">
                    <ul className="flex flex-col-reverse h-full overflow-y-scroll">
                        {
                            conversationRoom.msgs.map((msg) => {
                                //render only those messages which are belonging to current conversation_id
                                if (session && session.user && conversationRoom.convo.convo_id != "" && msg.convo_id == conversationRoom.convo.convo_id) //session exists and msg Convo belongs to current convo then render messages
                                    return (<li className="w-full" key={msg.createdAt}><MessageTile msg={msg} conv={conversationRoom.convo} user={session.user} /></li>);

                            }).reverse()
                        }

                    </ul>
                </div>

                <div className="flex items-end mb-5">

                    <div className="relative w-full mr-30">
                        <input id="input-sendmsg"
                            type="text" onChange={(e) => setMsgInput(e.target.value)}
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {
                                    submitMsg();
                                }
                            }}
                            placeholder="Write you message here.."
                            value={msgInput}
                            className="flex w-full border dark:text-black rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button
                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div className="ml-4 flex h-full">
                        <button onClick={() => {
                            submitMsg();

                        }}
                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                            <span>Send</span>
                            <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

            </div>


        </div >
    );
}