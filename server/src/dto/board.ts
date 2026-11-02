import { z } from "zod";

export const payloadCreateBoardSchema = z.object({
  name: z.string().trim().min(1).max(100),
  ownerId: z.string().min(1),
});

export const payloadUpdateBoardSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export const boardIdParamsSchema = z.object({
  id: z.string().min(1),
});

export const boardOwnerParamsSchema = z.object({
  ownerId: z.string().min(1),
});

export type PayloadCreateBoard = z.infer<typeof payloadCreateBoardSchema>;
export type PayloadUpdateBoard = z.infer<typeof payloadUpdateBoardSchema>;
