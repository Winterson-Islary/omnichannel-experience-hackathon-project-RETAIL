import { tool } from "@langchain/core/tools";
import { MOCK_GLOBAL_WAREHOUSE } from "@src/stores/global-warehouse.mock";
import {
    type MatchedWarehouse,
    MOCK_STORE_INVENTORY,
    MOCK_STORE_SECONDARY_INVENTORY,
} from "@src/stores/store-inventory.mock";
import { z } from "zod";

export const checkPrimaryInventoryTool = tool(
    async ({ itemName, userSource }) => {
        const source =
            userSource === "kiosk"
                ? MOCK_STORE_INVENTORY
                : MOCK_GLOBAL_WAREHOUSE;
        const normalizedItemName = itemName.toLowerCase();
        const result = source.find((item) =>
            item.name.toLowerCase().includes(normalizedItemName),
        );
        if (!result)
            return JSON.stringify({
                status: "not_found",
                source: userSource,
                message: `Item ${itemName} is currently unavailable`,
            });
        return JSON.stringify({
            status: "success",
            source: userSource,
            data: result,
        });
    },
    {
        name: "check_inventory",
        description: "Check the stock level of a specific item.",
        schema: z.object({
            itemName: z.string().describe("The name of the product to check"),
            userSource: z
                .enum(["kiosk", "web"])
                .describe("The type of device the request is from"),
        }),
    },
);

export const checkSecondaryInventoryTool = tool(
    async ({ itemName, storeId }) => {
        const normalizedItemName = itemName.toLowerCase();
        const hasStoreDetails = MOCK_STORE_SECONDARY_INVENTORY.find(
            (store) => store.storeId === storeId,
        );
        if (!hasStoreDetails)
            return JSON.stringify({
                status: "not_found",
                message: `Store ID: ${storeId} passed is invalid`,
            });
        const nearbyWarehouses = hasStoreDetails.nearbyWarehouses
            .map((warehouse) => {
                const stock = warehouse.items.find((item) =>
                    item.name.toLowerCase().includes(normalizedItemName),
                );
                return stock ? { ...warehouse, match: stock } : null;
            })
            .filter(
                (warehouse): warehouse is MatchedWarehouse =>
                    warehouse !== null,
            )
            .sort((a, b) => {
                return a.distanceKm - b.distanceKm;
            });
        return JSON.stringify(
            nearbyWarehouses.length > 0
                ? {
                      status: "avaliable",
                      closest: nearbyWarehouses[0],
                      all: nearbyWarehouses,
                  }
                : {
                      status: "unavailable",
                      message: `Item ${itemName} unavailable nearby`,
                  },
        );
    },
    {
        name: "check_secondary_inventory",
        description:
            "Search nearby warehouses sorted by distance in case in-store inventory is out",
        schema: z.object({
            itemName: z.string().describe("The name of the product to check"),
            storeId: z
                .string()
                .describe(
                    "The id of the store from which customer is making the request",
                ),
        }),
    },
);
