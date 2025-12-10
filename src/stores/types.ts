export interface InventoryItem {
    upid: string; // Universal Product Identification Code
    id: string;
    sku: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    currency: string;
    location: string;
    tags: string[];
}
