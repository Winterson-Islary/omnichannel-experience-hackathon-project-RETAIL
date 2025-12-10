import { tool } from "@langchain/core/tools";
import z from "zod";

export const placeOrderTool = tool(
    async ({ userId, items }) => {
        return JSON.stringify({
            status: "order_placed",
            orderId: `ord-${userId}_${Date.now()}`,
            items,
            userId,
            etaDays: 1 + Math.floor(Math.random() * 3), // 1–3 day delivery
            message:
                "Your delivery is confirmed! You will receive tracking details shortly.",
        });
    },
    {
        name: "place_order",
        description: "Place a delivery order for the customer.",
        schema: z.object({
            userId: z.string(),
            items: z.array(
                z.object({
                    name: z.string().describe("item name"),
                    warehouseId: z
                        .string()
                        .describe(
                            "stores the ID of all the warehouse where item is sourced from",
                        ),
                    upid: z
                        .string()
                        .describe(
                            "stores universal product ID of all the item to be ordered",
                        ),
                    quantity: z
                        .number()
                        .describe("the quantity of item to be ordered"),
                }),
            ),
        }),
    },
);
