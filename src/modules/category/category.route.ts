import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  decreaseHandler,
  getCategoriesHandler,
  increaseHandler,
} from "./category.controller";
import { $ref } from "./category.schema";

async function categoryRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createCategorySchema"),
        response: {
          201: $ref("CategoryResponseSchema"),
        },
      },
    },
    createCategoryHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("CategoriesResponseSchema"),
        },
      },
    },
    getCategoriesHandler
  );

  server.get(
    "/increase/:id",
    {
      schema: {
        params: $ref("paramSchema"),
        response: {
          200: $ref("CategoryResponseSchema"),
        },
      },
    },
    increaseHandler
  );

  server.get(
    "/decrease/:id",
    {
      schema: {
        params: $ref("paramSchema"),
        response: {
          200: $ref("CategoryResponseSchema"),
        },
      },
    },
    decreaseHandler
  );
}

export default categoryRoutes;
