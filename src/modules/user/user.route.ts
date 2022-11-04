import { FastifyInstance } from "fastify";
import {
  registerHandler,
  loginHandler,
  getUsersHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRouter(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginRequestSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getUsersHandler
  );
}

export default userRouter;
