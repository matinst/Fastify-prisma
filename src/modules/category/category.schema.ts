import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const categoryinput = {
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category: z.string(),
  counter: z.number().optional(),
};

const categoryGenerated = {
  id: z.number(),
  createdAt: z.string(),
};

const createCategorySchema = z.object({
  ...categoryinput,
});

const CategoryResponseSchema = z.object({
  ...categoryinput,
  ...categoryGenerated,
});

const paramSchema = z.object({
  id: z.number(),
});

const CategoriesResponseSchema = z.array(CategoryResponseSchema);

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type ParamInput = z.infer<typeof paramSchema>;

export const { schemas: categorySchemas, $ref } = buildJsonSchemas(
  {
    createCategorySchema,
    CategoryResponseSchema,
    CategoriesResponseSchema,
    paramSchema,
  },
  { $id: "categorySchema" }
);
