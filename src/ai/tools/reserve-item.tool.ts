import { tool } from "@langchain/core/tools";
import z from "zod";

export const reserveItemTool = tool(
    async ({ userId, warehouseId, itemId }) => {
        return JSON.stringify({
            status: "reserved",
            reservationId: `res-${userId}_${Date.now()}`,
            warehouseId,
            itemId,
            userId,
            message: "The item has been successfully reserved for pickup!",
        });
    },
    {
        name: "reserve_item",
        description: "Reserve an item for customer pickup at a warehouse.",
        schema: z.object({
            userId: z.string(),
            warehouseId: z.string(),
            itemId: z.string(),
        }),
    },
);
