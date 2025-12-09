import { HumanMessage } from "@langchain/core/messages";
import { agent } from "./ai/state-graph";

const result = await agent.invoke({
    messages: [new HumanMessage("Can you tell me more about pro gadget?")],
    userSource: "kiosk",
});

for (const message of result.messages) {
    console.log(`[${message.getType()}]: ${message.text}`);
}
