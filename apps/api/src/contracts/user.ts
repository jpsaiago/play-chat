import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const userContract = c.router({
  getExample: {
    path: "/user",
    method: "GET",
    responses: {
      200: z.string(),
    },
  },
  // createUser: {
  //   method: "POST",
  //   path: "/users/signup",
  //   responses: {
  //     201: z.string(),
  //   },
  //   body: z.object({
  //     username: z.string(),
  //     email: z.string().email(),
  //     password: z.string(),
  //   }),
  //   summary: "Create a user",
  //   description:
  //     "Creates a new user in the database when provided with username, password and email",
  // },
});
