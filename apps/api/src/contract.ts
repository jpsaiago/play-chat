import { initContract } from "@ts-rest/core";
import {
  loginInputSchema,
  signUpInputSchema,
  userResponseSchema,
} from "./auth/auth.schema";
import { z } from "zod";

//Esse arquivo precisa viver na src para ser importado pelo frontend

const c = initContract();

export const authContract = c.router({
  createUser: {
    method: "POST",
    path: "/auth/signup",
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

export const apiContract = c.router({
  auth: authContract,
});