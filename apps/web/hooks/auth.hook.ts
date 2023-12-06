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
    profilePicture: string;
    displayName: string;
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
        //Faz o pré hash da senha com o segredo do servidor
        const passwordHash = await preHashPassword(inputInfo.password);
        //Cria um FormData para evitar erros de parse no backend
        const form = new FormData();
        if (inputInfo.profilePicture) {
          form.append("profilePicture", inputInfo.profilePicture);
        }
        form.append("username", inputInfo.username);
        form.append("password", passwordHash);
        form.append("displayName", inputInfo.displayName);
        form.append("email", inputInfo.email);
        //Acessa o contrato da api e faz upload do usuário
        const userData = await apiClient.auth.createUser({
          body: form,
        });

        if (userData.status === 201) {
          set({
            currentUser: {
              ...userData.body,
              profilePicture: userData.body.profilePicture ?? "",
            },
          });
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
          set({
            currentUser: {
              ...userData.body,
              profilePicture: userData.body.profilePicture ?? "",
            },
          });
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
