'use client';

/*As session provider requires client component and we want our other children components to be server components*/
import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {

    return (

        <SessionProvider>
            {children}
        </SessionProvider>
    );
}