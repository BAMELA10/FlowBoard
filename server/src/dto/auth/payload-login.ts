import { z } from "zod";

export const payloadLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export type PayloadLogin = z.infer<typeof payloadLoginSchema>