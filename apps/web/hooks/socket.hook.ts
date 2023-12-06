import { Socket, io } from "socket.io-client";
import { useAuth } from "./auth.hook";
import { useEffect, useRef } from "react";

export function useSocket() {
  //Extraído para um hook próprio para garantir somente uma conexão e usar os dados do usuário na autenticação
  const user = useAuth((s) => s.currentUser);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (user && !socketRef.current) {
      const URL = process.env.NEXT_PUBLIC_API_URL;

      socketRef.current = io(URL ?? "", {
        auth: {
          token: user.token,
        },
        reconnectionAttempts: 2,
      });
    }
  }, []);

  return socketRef.current;
}
