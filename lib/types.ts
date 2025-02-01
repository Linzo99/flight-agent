import { z } from "zod";
import { FlightData } from "@/flight/kiwi/types";
import { ChatMessage } from "llamaindex";

export type Flight = z.infer<typeof FlightData>;

export interface Message extends ChatMessage {
  isFinal?: boolean;
}

export interface ResultMessage {
  role: "assistant" | "user";
  content: string | Flight;
  isFinal: boolean;
}
