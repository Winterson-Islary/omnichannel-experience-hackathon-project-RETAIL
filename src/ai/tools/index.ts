import { model } from "../model";
import {
    checkPrimaryInventoryTool,
    checkSecondaryInventoryTool,
} from "./inventory-check.tool";

export const toolsByName = {
    [checkPrimaryInventoryTool.name]: checkPrimaryInventoryTool,
    [checkSecondaryInventoryTool.name]: checkSecondaryInventoryTool,
};
export const tools = Object.values(toolsByName);
export const modelWithTools = model.bindTools(tools);
