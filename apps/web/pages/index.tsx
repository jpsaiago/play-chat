import { useAuth } from "@/hooks/auth.hook";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const user = useAuth((state) => state.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) {
    return <></>;
  }

  return <p>Olá {user?.username}</p>;
}
