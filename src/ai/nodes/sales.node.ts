import { SystemMessage } from "@langchain/core/messages";
import type { MessagesStateType } from "../system-state";
import { modelWithTools } from "../tools";

export async function sales_agent(state: MessagesStateType) {
    const personaMessage = new SystemMessage(
        `You are a retail assistant.
        You have access to context:
        - Device: ${state.userSource}
        - Store-ID: ${state.storeId}

        Guidelines:
        - If question is conversational, respond normally.
        - If the request involves product information or availability or delivery,
          ALWAYS call "check_inventory" with correct userSource = "${state.userSource}".
        - If check_inventory returns "not_found" OR quantity == 0 →
           then call "check_secondary_inventory" with itemName and storeId ="${state.storeId}".
        `,
    );

    return {
        messages: await modelWithTools.invoke([
            personaMessage,
            ...state.messages,
        ]),
        llmCalls: (state.llmCalls ?? 0) + 1,
    };
}
