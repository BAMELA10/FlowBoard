import { z } from "zod";

const cardFields = {
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().nullable(),
  labelColor: z.string().trim().min(1),
  assigneeId: z.string().min(1).nullable(),
  dueDate: z.iso.datetime().transform((value) => new Date(value)).nullable(),
};

export const payloadCreateCardSchema = z.object({
  columnId: z.string().min(1),
  title: cardFields.title,
  description: cardFields.description.optional(),
  labelColor: cardFields.labelColor.default("#60a5fa"),
  assigneeId: cardFields.assigneeId.optional(),
  dueDate: cardFields.dueDate.optional(),
});

export const payloadUpdateCardSchema = z
  .object({
    columnId: z.string().min(1).optional(),
    title: cardFields.title.optional(),
    description: cardFields.description.optional(),
    labelColor: cardFields.labelColor.optional(),
    assigneeId: cardFields.assigneeId.optional(),
    dueDate: cardFields.dueDate.optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one card field must be provided",
  });

export const cardColumnIdParamsSchema = z.object({
  columnId: z.string().min(1),
});

export const cardIdParamsSchema = z.object({
  id: z.string().min(1),
});

export type PayloadCreateCard = z.infer<typeof payloadCreateCardSchema>;
export type PayloadUpdateCard = z.infer<typeof payloadUpdateCardSchema>;
