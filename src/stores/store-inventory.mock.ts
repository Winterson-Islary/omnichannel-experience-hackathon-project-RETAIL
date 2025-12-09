import type { InventoryItem } from "./types";

export const MOCK_STORE_INVENTORY: InventoryItem[] = [
    {
        id: "loc-002",
        sku: "GAD-PRO-002",
        name: "Pro Gadget",
        description: "High-performance gadget with extended battery life.",
        quantity: 0, // Zero quantity to test out-of-stock logic
        price: 49.99,
        currency: "USD",
        location: "Stockroom",
        tags: ["gadget", "electronics"],
    },
    {
        id: "loc-003",
        sku: "TOOL-HAM-003",
        name: "Claw Hammer",
        description: "16oz steel claw hammer.",
        quantity: 12,
        price: 15.5,
        currency: "USD",
        location: "Tool Wall",
        tags: ["tools", "hardware"],
    },
];

export interface NearbyWarehouse {
    warehouseId: string;
    warehouseName: string;
    distanceKm: number; // sorted ascending for convenience
    items: InventoryItem[];
}
export type MatchedWarehouse = {
    warehouseId: string;
    warehouseName: string;
    distanceKm: number;
    items: InventoryItem[];
    match: InventoryItem;
};

export interface StoreSecondaryInventory {
    storeId: string;
    nearbyWarehouses: NearbyWarehouse[];
}

export const MOCK_STORE_SECONDARY_INVENTORY: StoreSecondaryInventory[] = [
    {
        storeId: "store-001",
        nearbyWarehouses: [
            {
                warehouseId: "wh-101",
                warehouseName: "Metro DC - West",
                distanceKm: 4.2,
                items: [
                    {
                        id: "wh101-001",
                        sku: "TOOL-HAM-003",
                        name: "Claw Hammer",
                        description: "16oz steel claw hammer.",
                        quantity: 100,
                        price: 14.99,
                        currency: "USD",
                        location: "Aisle B12",
                        tags: ["tools", "hardware"],
                    },
                    {
                        id: "wh101-002",
                        sku: "GAD-PRO-002",
                        name: "Pro Gadget",
                        description:
                            "High-performance gadget with extended battery life.",
                        quantity: 28,
                        price: 49.99,
                        currency: "USD",
                        location: "Electronics Bay",
                        tags: ["gadget", "electronics"],
                    },
                ],
            },
            {
                warehouseId: "wh-102",
                warehouseName: "Regional Hub North",
                distanceKm: 15.6,
                items: [
                    {
                        id: "wh102-001",
                        sku: "ELEC-WIRE-100",
                        name: "Wireless Headphones",
                        description: "High-quality Bluetooth headphones.",
                        quantity: 300,
                        price: 79.99,
                        currency: "USD",
                        location: "Electronics Area",
                        tags: ["electronics", "audio"],
                    },
                ],
            },
            {
                warehouseId: "wh-103",
                warehouseName: "Central Distribution Center",
                distanceKm: 49.8,
                items: [
                    {
                        id: "wh103-001",
                        sku: "CLOTH-BLUJEAN-101",
                        name: "Blue Jeans",
                        description: "Comfort-fit denim jeans.",
                        quantity: 1200,
                        price: 39.99,
                        currency: "USD",
                        location: "Apparel Storage Zone",
                        tags: ["clothing"],
                    },
                ],
            },
        ],
    },

    // You can always add more stores here
    {
        storeId: "store-002",
        nearbyWarehouses: [
            {
                warehouseId: "wh-104",
                warehouseName: "South Outlet Reserve",
                distanceKm: 7.1,
                items: [
                    {
                        id: "wh104-001",
                        sku: "GAD-PRO-002",
                        name: "Pro Gadget",
                        description:
                            "High-performance gadget with extended battery life.",
                        quantity: 12,
                        price: 49.99,
                        currency: "USD",
                        location: "Stock Room S2",
                        tags: ["gadget", "electronics"],
                    },
                ],
            },
        ],
    },
];
