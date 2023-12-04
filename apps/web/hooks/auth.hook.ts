import { apiClient } from "@/pages/_app";
import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { preHashPassword } from "@/utils/hash";

interface AuthState {
  currentUser: {
    username: string;
    id: string;
    token: string;
  } | null;
  signUp: (inputInfo: SignUpSchema) => Promise<"success" | "failure">;
  signIn: (inputInfo: SignInSchema) => Promise<"success" | "failure">;
  logOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,

      signUp: async (inputInfo) => {
        const passwordHash = await preHashPassword(inputInfo.password);
        const userData = await apiClient.auth.createUser({
          body: {
            email: inputInfo.email,
            username: inputInfo.username,
            password: passwordHash,
          },
        });
        if (userData.status === 201) {
          set({ currentUser: userData.body });
          return "success";
        }
        return "failure";
      },

      signIn: async (inputInfo) => {
        const passwordHash = await preHashPassword(inputInfo.password);

        const userData = await apiClient.auth.authenticateUser({
          body: {
            username: inputInfo.username,
            password: passwordHash,
          },
        });
        if (userData.status === 200) {
          set({ currentUser: userData.body });
          return "success";
        }
        return "failure";
      },
      logOut: () => {
        set({ currentUser: null });
      },
    }),

    {
      name: "playchat-storage",
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
