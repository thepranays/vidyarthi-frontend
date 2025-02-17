// export default function Home() {


//   return <div>
//     Homepage
//   </div>
// }




'use client'
import '@/app/globals.css';
import NotificationToast from '@/components/toast/NotificationToast';

import { useEffect, useRef, useState } from 'react';





export default function Home() {
  const productCreatedSSE = useRef<EventSource>();
  const reconnectInterval = useRef<NodeJS.Timeout>();
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const notificationToastData = useRef("");

  const connectSSE = () => {
    if (productCreatedSSE.current && productCreatedSSE.current.OPEN == 1) {
      productCreatedSSE.current.close();
    }
    productCreatedSSE.current = new EventSource("http://localhost:8081/api/notification/event-product-created");

    productCreatedSSE.current.onopen = () => {
      console.log("ProductCreated SSE connection opened");
      clearInterval(reconnectInterval.current); //end and clear the interval when connection opens

    };

    productCreatedSSE.current.onerror = (error) => {
      console.log("ProductCreated SSE connection error:", error);

      //clearInterval(reconnectInterval.current); //end and clear interval, to start new interval in order to avoid connection not being made after error 

      if (productCreatedSSE.current) { //close current connection that being and try again
        productCreatedSSE.current.close();
      }
      reconnectInterval.current = setInterval(connectSSE, 5000); // Try to reconnect every 5 seconds when an error occurs, done to avoid disconnection of client due to inactivity from sse emitter
    };

    productCreatedSSE.current.addEventListener("event-product-created", (event) => {
      //console.log("Received event:", event);
      notificationToastData.current = event.data; //set notification toast message
      setShowNotificationToast(true); //display notification toast
    });
  };

  useEffect(() => {
    connectSSE();

    return () => { //when unmounting component, cleanup function
      if (productCreatedSSE.current) {
        productCreatedSSE.current.close();
      }
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
      }
    };
  }, []);
  return (<div>

    <div className='fixed right-10 bottom-10'>
      <NotificationToast show={showNotificationToast} setShow={setShowNotificationToast} data={notificationToastData.current} />
    </div>

  </div>);

}


// 'use client'
// import '@/app/globals.css';
// import { api_notificationServiceEndpoint } from '@/constants/api_endpoints';
// import { decryptToken } from '@/utils/Encryption';
// import { getToken } from 'next-auth/jwt';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';





// export default function Home() {
//   const [productCreatedNotification, setProductCreatedNotification] = useState("");
//   const { data: session, status } = useSession();
//   //Subscribe to product created events (Server Sent events)
//   const subscribeToProductCreatedSSE = async () => {
//     // const res = await fetch("api/notification/event-product-created"
//     //   , { method: "GET", headers: { "Content-Type": "text/event-stream", } });
//     // const receivedNotifcation = await res.text();

//     const eventId = "event-product-created";
//     //subscribe To Product Created Event notification using Server-Sent Events (SSE)
//     const productCreatedSSE = await fetch(`${api_notificationServiceEndpoint}/${eventId}`
//       , { method: "GET", headers: { "Content-Type": "text/event-stream" }, mode: "no-cors" });
//     const productCreatedNotification = await productCreatedSSE.text();  //as text/event-stream
//     console.log(productCreatedNotification);
//     // setProductCreatedNotification(receivedNotifcation);
//     // setProductCreatedNotification(receivedNotifcation);
//   }

//   useEffect(() => {

//     subscribeToProductCreatedSSE();
//   }
//     , []);

//   return
//   <div>

//     {/* <h1>{productCreatedNotification}</h1> */}

//   </div>

// }