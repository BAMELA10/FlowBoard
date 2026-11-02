import { z } from 'zod' 


export const payloadRegisterSchema = z.object({
    name: z.string().min(1).max(10),
    email: z.email(),
    password: z.string().min(6)
})

export type PayloadRegister = z.infer<typeof payloadRegisterSchema>;