import * as ReadLine from "node:readline";
import { HumanMessage } from "@langchain/core/messages";
import { agent } from "./ai/state-graph";
import type { MessagesStateType } from "./ai/system-state";
import { DEVICE_TYPE } from "./main";

export async function chat_stream() {
    const readline = ReadLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const state: MessagesStateType = {
        messages: [],
        userSource: DEVICE_TYPE.KIOSK,
        storeId: "store-001",
        userDetails: {
            username: "test_user_kokrajhar",
            id: "unique_id_for_user_kokrajhar",
            address: "05, Assam, Tea Garden Zone A",
        },
    };

    async function send_message(input: string) {
        state.messages.push(new HumanMessage(input));
        const stream = await agent.stream(state, { streamMode: "values" });
        let streamedContent = "";
        console.log("Assistant:\t");
        process.stdout.write("");
        for await (const chunk of stream) {
            const lastMessage = chunk.messages?.at(-1);
            if (lastMessage && lastMessage.type === "ai") {
                const text = extract_text(lastMessage.content);
                const newPart = text.slice(streamedContent.length);
                if (newPart.length > 0) {
                    process.stdout.write(newPart);
                    streamedContent = text;
                }
            }
            if (chunk.messages) state.messages = chunk.messages;
        }
        console.log("\n");
        await loop();
    }
    async function loop() {
        readline.question("You: \t", async (input) => {
            if (input.toLowerCase() === "exit") {
                console.log("Ending chat...");
                readline.close();
                return;
            }
            await send_message(input);
        });
    }

    console.log("Sales Agent Ready, lets chat!");
    await loop();
}

function extract_text(content: any): string {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return content
            .filter((c) => typeof c === "string" || c?.type === "text")
            .map((c) => (typeof c === "string" ? c : c.text))
            .join("");
    }
    return String(content);
}
