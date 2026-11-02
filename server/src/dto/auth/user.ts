import { z } from "zod";

export const secretSchema = z.object({
  id: z.string(),
  password_hash: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  token:z.string().nullable(),
  lastSignIn: z.coerce.date().nullable(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  secret: secretSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export type UserWithSecret = z.infer<typeof userSchema>