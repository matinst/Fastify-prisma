import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCategoryInput, ParamInput } from "./category.schema";
import {
  createCategory,
  getCategories,
  FindOneCategory,
  increaseACategories,
  decreaseACategories,
} from "./category.service";

export async function createCategoryHandler(
  request: FastifyRequest<{
    Body: CreateCategoryInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const category = await createCategory(body);
    return reply.code(201).send(category);
  } catch (e) {
    console.log(e);
    return reply.code(501).send(e);
  }
}

export async function getCategoriesHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categories = await getCategories();
    return reply.code(200).send(categories);
  } catch (e) {
    console.log(e);
    return reply.code(501).send(e);
  }
}

export async function increaseHandler(
  request: FastifyRequest<{
    Params: ParamInput;
  }>,
  reply: FastifyReply
) {
  const id = !request.params.id ? 1 : request.params.id;
  try {
    const exState = await FindOneCategory(id);
    if (!exState) {
      return reply.status(400).send({
        message: "please select valid category",
      });
    }
    const count = !exState.counter ? 0 : exState.counter;
    const newState = await increaseACategories(id, count);
    return reply.code(200).send(newState);
  } catch (e) {
    console.log(e);
    return reply.code(501).send(e);
  }
}

export async function decreaseHandler(
  request: FastifyRequest<{
    Params: ParamInput;
  }>,
  reply: FastifyReply
) {
  const id = !request.params.id ? 1 : request.params.id;
  try {
    const exState = await FindOneCategory(id);
    if (!exState) {
      return reply.status(400).send({
        message: "please select valid category",
      });
    }

    const count = !exState.counter ? 0 : exState.counter;
    if (count == 0) {
      return reply.code(400).send({
        message: "current counter is zero",
      });
    }
    const newState = await decreaseACategories(id, count);
    return reply.code(200).send(newState);
  } catch (e) {
    console.log(e);
    return reply.code(501).send(e);
  }
}
