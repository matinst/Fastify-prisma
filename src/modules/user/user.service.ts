import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);
  const user = await prisma.users.create({
    data: { ...rest, password: hash, salt },
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } });
}

export async function findAllUsers() {
  return prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
