import type { BaseMessage } from "@langchain/core/messages";
import { MessagesZodMeta } from "@langchain/langgraph";
import { registry } from "@langchain/langgraph/zod";
import * as z from "zod/v4";

export const MessagesState = z.object({
    messages: z
        .array(z.custom<BaseMessage>())
        .default([])
        .register(registry, MessagesZodMeta),
    llmCalls: z.number().optional(),
    userSource: z.enum(["kiosk", "web"]),
    storeId: z.string().optional(),
    userDetails: z.object({
        username: z.string(),
        id: z.string(),
        address: z.string(),
    }),
});
export type MessagesStateType = z.infer<typeof MessagesState>;
