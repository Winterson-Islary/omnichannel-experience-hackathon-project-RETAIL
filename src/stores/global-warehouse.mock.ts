import type { InventoryItem } from "./types";

export const MOCK_GLOBAL_WAREHOUSE: InventoryItem[] = [
    {
        upid: "pro-gadget-002",
        id: "glo-002",
        sku: "GAD-PRO-002",
        name: "Pro Gadget",
        description: "High-performance gadget with extended battery life.",
        quantity: 150, // Ran out in store-inventory
        price: 45.0,
        currency: "USD",
        location: "Regional Hub East",
        tags: ["gadget", "electronics"],
    },
    {
        upid: "macbook-air-m1",
        id: "glo-999",
        sku: "EXCL-XYZ-999",
        name: "Macbook Air M1",
        description: "Macbook Air M1 from Apple",
        quantity: 10,
        price: 999.99,
        currency: "USD",
        location: "Secure Vault",
        tags: ["exclusive"],
    },
];
