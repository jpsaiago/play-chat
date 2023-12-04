import { useAuth } from "@/hooks/auth.hook";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const [user, logOut] = useAuth(
    useShallow((state) => [state.currentUser, state.logOut])
  );
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <p>Olá {user?.username}</p>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          logOut();
        }}
      >
        sair
      </button>
    </>
  );
}
