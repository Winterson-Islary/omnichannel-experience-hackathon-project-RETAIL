import { END, START, StateGraph } from "@langchain/langgraph";
import { shouldContinue } from "./edges/should-call-tools.edge";
import { sales_agent } from "./nodes/sales.node";
import { toolNode } from "./nodes/tools.node";
import { MessagesState } from "./system-state";

export const agent = new StateGraph(MessagesState)
    .addNode("salesAgent", sales_agent)
    .addNode("toolNode", toolNode)
    .addEdge(START, "salesAgent")
    .addConditionalEdges("salesAgent", shouldContinue, ["toolNode", END])
    .addEdge("toolNode", "salesAgent")
    .compile();
