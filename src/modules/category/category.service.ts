import prisma from "../../utils/prisma";
import { CreateCategoryInput } from "./category.schema";

export async function createCategory(input: CreateCategoryInput) {
  return prisma.category.create({ data: input });
}

export async function getCategories() {
  return prisma.category.findMany();
}

export async function FindOneCategory(id: number) {
  return prisma.category.findUnique({ where: { id } });
}

export async function increaseACategories(id: number, exCount: number) {
  return prisma.category.update({
    where: { id },
    data: { counter: exCount + 1 },
  });
}

export async function decreaseACategories(id: number, exCount: number) {
  const count = exCount == 0 ? 0 : exCount - 1;
  return prisma.category.update({ where: { id }, data: { counter: count } });
}
