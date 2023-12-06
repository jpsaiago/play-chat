import { ContactList } from "@/components/ContactList";
import { MessageList } from "@/components/MessageLIst";
import { useAuth } from "@/hooks/auth.hook";
import { useSocket } from "@/hooks/socket.hook";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const [user, logOut] = useAuth(
    useShallow((state) => [state.currentUser, state.logOut])
  );
  const [showContactList, setShowContactList] = useState(false);

  const router = useRouter();
  const socket = useSocket();

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticating(false);
      socket?.on("connect", () => console.log("conectou"));
    }
  }, [user]);

  if (isAuthenticating) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Play Chat - Login</title>
        <meta name="description" content="App de chat em grupo e individual" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-100 h-[100vh] flex justify-center items-center md:(px-14 py-10) ">
        <div className="bg-white w-full h-full flex flex-row md:(rounded-lg shadow-md) overflow-hidden">
          {showContactList ? (
            <ContactList setShowContactList={setShowContactList} />
          ) : (
            <MessageList setShowContactList={setShowContactList} />
          )}
        </div>
      </main>
    </>
  );
}
