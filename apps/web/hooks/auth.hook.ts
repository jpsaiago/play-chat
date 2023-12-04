import { apiClient } from "@/pages/_app";
import { SignUpInputSchema } from "apps/api/src/auth/auth.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  currentUser: {
    username: string;
    id: string;
    token: string;
  } | null;
  signUp: (inputInfo: SignUpInputSchema) => Promise<"success" | "failure">;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,

      signUp: async (inputInfo) => {
        const userData = await apiClient.auth.createUser({
          body: {
            email: inputInfo.email,
            username: inputInfo.username,
            password: inputInfo.password,
          },
        });
        if (userData.status === 201) {
          set({ currentUser: userData.body });
          return "success";
        }
        return "failure";
      },
    }),
    {
      name: "playchat-storage",
      partialize: (state) => ({ user: state.currentUser }),
    }
  )
);
