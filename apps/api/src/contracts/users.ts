import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  loginInputSchema,
  signUpInputSchema,
  userResponseSchema,
} from "../users/users.schemas";

const c = initContract();

export const usersContract = c.router({
  createUser: {
    method: "POST",
    path: "/users/create",
    responses: {
      201: z.object({ id: z.string() }),
      400: z.string(),
    },
    body: signUpInputSchema,
    summary: "Create a user",
    description:
      "Creates a new user in the database when provided with username, password and email",
  },

  authenticateUser: {
    method: "POST",
    path: "/users/authenticate",
    body: loginInputSchema,
    responses: {
      200: userResponseSchema,
    },
  },
  getUsers: {
    method: "GET",
    path: "/users",
    responses: {
      200: z.array(z.object({ id: z.string() })),
    },
  },
});
