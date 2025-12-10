import { chat_stream } from "./cli-chat.stream";

export const DEVICE_TYPE = { KIOSK: "kiosk", WEB: "web" } as const;

await chat_stream().catch(console.error);
