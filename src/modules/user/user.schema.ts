import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),

  name: z.string(),
};

const createUserSchema = z.object({
  ...userCore,

  password: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be string",
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

const loginRequestSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email(),
  password: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be string",
  }),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginRequestSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginRequestSchema,
  loginResponseSchema,
});
