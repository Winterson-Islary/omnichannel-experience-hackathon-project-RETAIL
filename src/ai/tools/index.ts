import { model } from "../model";
import {
    checkFallbackInventoryTool,
    checkPrimaryInventoryTool,
    checkSecondaryInventoryTool,
} from "./inventory-check.tool";
import { placeOrderTool } from "./place-order.too";
import { reserveItemTool } from "./reserve-item.tool";

export const toolsByName = {
    [checkPrimaryInventoryTool.name]: checkPrimaryInventoryTool,
    [checkSecondaryInventoryTool.name]: checkSecondaryInventoryTool,
    [checkFallbackInventoryTool.name]: checkFallbackInventoryTool,
    [reserveItemTool.name]: reserveItemTool,
    [placeOrderTool.name]: placeOrderTool,
};
export const tools = Object.values(toolsByName);
export const modelWithTools = model.bindTools(tools);
