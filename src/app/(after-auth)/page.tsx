// export default function Home() {


//   return <div>
//     Homepage
//   </div>
// }




'use client'
import '@/app/globals.css';
import { getAccessToken } from '@/utils/SessionTokenAccessor';
import { Suspense, useEffect, useRef } from 'react';





export default function Home() {
  const productCreatedSSE = useRef<EventSource>();
  const reconnectInterval = useRef<NodeJS.Timeout>();

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
      if (productCreatedSSE.current) {
        productCreatedSSE.current.close();
      }
      if (!reconnectInterval.current) //if interval is not settedup up previously then only create/set a new interval, to avoid multiple intervals running in program
        reconnectInterval.current = setInterval(connectSSE, 5000); // Try to reconnect every 5 seconds when an error occurs, done to avoid disconnection of client due to inactivity from sse emitter
    };

    productCreatedSSE.current.addEventListener("event-product-created", (event) => {
      console.log("Received event:", event);
    });
  };

  useEffect(() => {
    connectSSE();

    return () => {
      if (productCreatedSSE.current) {
        productCreatedSSE.current.close();
      }
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
      }
    };
  }, []);
  return
  <div>

    {/* <h1>{productCreatedNotification}</h1> */}

  </div>

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