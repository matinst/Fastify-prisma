import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import userRouter from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { categorySchemas } from "./modules/category/category.schema";
import categoryRoutes from "./modules/category/category.route";
import { version } from "../package.json";
import { withRefResolver } from "fastify-zod";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
}

server.register(fjwt, {
  secret: "supersecret",
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.code(404).send(e);
    }
  }
);

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...categorySchemas]) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "test RestAPI with typescript, fastify, prisma(MySQL)",
          version: version,
        },
      },
    })
  );

  server.register(userRouter, { prefix: "api/users" });
  server.register(categoryRoutes, { prefix: "api/category" });

  try {
    await server.listen({ port: 3000 }, (_, address) => {
      console.log("app runing on: ", address);
      console.log("document runing on: ", address + "/docs");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
