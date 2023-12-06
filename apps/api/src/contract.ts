import { initContract } from "@ts-rest/core";
import {
  loginInputSchema,
  signUpInputSchema,
  userResponseSchema,
} from "./auth/auth.schema";
import { z } from "zod";
import { addUserSchema } from "./users/users.schema";

//Esse arquivo precisa viver na src para ser importado pelo frontend

const c = initContract();

export const authContract = c.router({
  createUser: {
    method: "POST",
    path: "/auth/signup",
    contentType: "multipart/form-data",
    responses: {
      201: userResponseSchema,
      400: z.string(),
      500: z.string(),
    },
    body: signUpInputSchema,
    summary: "Create a user",
    description:
      "Creates a new user in the database when provided with username, password and email",
  },

  authenticateUser: {
    method: "POST",
    path: "/auth/login",
    body: loginInputSchema,
    responses: {
      200: userResponseSchema,
    },
    summary: "Authenticate a user",
    description:
      "Verifies the user's login credentials and returns an auth token",
  },
});

export const usersContract = c.router({
  addFriend: {
    method: "POST",
    path: "users/add-friend",
    body: addUserSchema,
    responses: {
      201: z.literal("OK"),
      404: z.literal("Usuário não encontrado"),
    },
  },
});

export const testAuthContract = c.router({
  testGuard: {
    method: "POST",
    path: "/files/test",
    body: z.object({
      username: z.string(),
    }),
    responses: {
      200: z.any(),
    },
  },
});

export const apiContract = c.router({
  auth: authContract,
  users: usersContract,
});
