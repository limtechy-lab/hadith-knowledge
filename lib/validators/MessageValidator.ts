import {z} from "zod"

export const MessageValidator = z.object({
    message: z.string()
})