import { isAIMessage, type ToolMessage } from "@langchain/core/messages";
import type { MessagesStateType } from "../system-state";
import { toolsByName } from "../tools";

export async function toolNode(state: MessagesStateType) {
    const lastMessage = state.messages.at(-1);

    if (lastMessage == null || !isAIMessage(lastMessage)) {
        return { messages: [] };
    }

    const result: ToolMessage[] = [];
    for (const toolCall of lastMessage.tool_calls ?? []) {
        const tool = toolsByName[toolCall.name];
        if (!tool) continue; // incase tool is missing
        const observation = await tool.invoke(toolCall);
        result.push(observation);
    }

    return { messages: result };
}
