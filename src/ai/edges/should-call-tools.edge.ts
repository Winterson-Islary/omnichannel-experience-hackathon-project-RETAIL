import { isAIMessage } from "@langchain/core/messages";
import { END } from "@langchain/langgraph";
import type { MessagesStateType } from "../system-state";

export async function shouldContinue(state: MessagesStateType) {
    const lastMessage = state.messages.at(-1);
    if (lastMessage == null || !isAIMessage(lastMessage)) return END;

    // If the LLM makes a tool call, then perform an action
    if (lastMessage.tool_calls?.length) {
        return "toolNode";
    }

    // Otherwise, we stop (reply to the user)
    return END;
}
