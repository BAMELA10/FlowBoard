import { z } from "zod";

export const payloadCreateColumnSchema = z.object({
  boardId: z.string().min(1),
  name: z.string().trim().min(1).max(100),
});

export const payloadUpdateColumnSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export const columnBoardIdParamsSchema = z.object({
  boardId: z.string().min(1),
});

export const columnIdParamsSchema = z.object({
  id: z.string().min(1),
});

export type PayloadCreateColumn = z.infer<typeof payloadCreateColumnSchema>;
export type PayloadUpdateColumn = z.infer<typeof payloadUpdateColumnSchema>;
