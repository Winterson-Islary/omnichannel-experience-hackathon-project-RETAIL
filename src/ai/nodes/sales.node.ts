import { SystemMessage } from "@langchain/core/messages";
import { DEVICE_TYPE } from "@src/main";
import type { MessagesStateType } from "../system-state";
import { modelWithTools } from "../tools";

export async function sales_agent(state: MessagesStateType) {
    const WEB_GUIDELINES = `
        You have access to context:
        - Device: ${DEVICE_TYPE.WEB}
        Guidelines specific to "web" devices:
        - If check_inventory return "not_found" OR quantity == 0 -> then inform the user about it and suggest algernatives.
        - If check_inventory is successful as if the user wants to add it to card or have it delivered.
        - If user selects or chooses DELIVERY:{
            - first ask user the address for delivery, or if to be delivered to HOME address.
            - then call "place_order"}
        `;
    const KIOSK_GUIDELINES = `
        You have access to context:
        - Device: ${DEVICE_TYPE.KIOSK}
        - Store-ID: ${state.storeId}
        Guidelines specific to "kiosk" devices:
        - If check_inventory returns "not_found" OR quantity == 0: {
            - Inform about the unavailability of the item at current store.
            - then call "check_secondary_inventory" with itemName and storeId ="${state.storeId}".}
        - If secondary_inventory_check is successful and items are available. Ask the user whether they prefer PICKUP/RESERVATION or DELIVERY.
        - If user selects or chooses PICKUP/RESERVATION:{
            - first ask which warehouse location to select for reservation.
            - then call "reserve_item"}
        - If user selects or chooses DELIVERY:{
            - first ask user the address for delivery, or if to be delivered to HOME address.
            - then call "place_order"}
        `;
    const SYSTEM_GUIDELINES = `
        You are a premium retail assistant. Speak like a enthusiastic human. Do not use fancy emojis or formatting.
        You have access to context:
        - User-Details: ${state.userDetails}

        _GLOBAL_GUIDELINES_:
        - If question is conversational, respond normally.
        - If the request involves product information or availability or delivery,
          ALWAYS call "check_inventory" with correct userSource = "${state.userSource}".
         ${state.userSource === DEVICE_TYPE.KIOSK ? KIOSK_GUIDELINES : WEB_GUIDELINES}

        _TONE_:
        - Confident & sales oriented
        - Natural & conversational
        - Provide clear options
        - Guide the user to next best action
    `;

    const personaMessage = new SystemMessage(SYSTEM_GUIDELINES);

    return {
        messages: await modelWithTools.invoke([
            personaMessage,
            ...state.messages,
        ]),
        llmCalls: (state.llmCalls ?? 0) + 1,
    };
}
