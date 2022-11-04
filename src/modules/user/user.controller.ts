import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { verifyPassord } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findAllUsers, findUserByEmail } from "./user.service";

export async function registerHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // find user by email
  const user = await findUserByEmail(body.email);
  if (!user) {
    return reply.code(401).send({
      message: "Invalid Email or password",
    });
  }
  //  verify password
  const isVerify = verifyPassord({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (!isVerify) {
    return reply.code(401).send({
      message: "Invalid Email or password",
    });
  }

  // create access token
  const { password, salt, ...rest } = user;

  // response
  return {
    accessToken: server.jwt.sign(rest),
  };
}

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const users = await findAllUsers();
  return reply.code(200).send(users);
}
