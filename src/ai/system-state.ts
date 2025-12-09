import type { BaseMessage } from "@langchain/core/messages";
import { MessagesZodMeta } from "@langchain/langgraph";
import { registry } from "@langchain/langgraph/zod";
import * as z from "zod/v4";

export const MessagesState = z.object({
    messages: z.custom<BaseMessage[]>().register(registry, MessagesZodMeta),
    llmCalls: z.number().optional(),
    userSource: z.enum(["kiosk", "web"]),
    storeId: z.string().default("store-001"), // prefilling store-id purely for development only
});
export type MessagesStateType = z.infer<typeof MessagesState>;
