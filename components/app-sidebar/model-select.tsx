"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Brain, CheckCircle2Icon } from "lucide-react";
import { useChat } from "../providers/chat-provider";
import { useShallow } from "zustand/shallow";

export const models = [
  {
    id: "gemini-flash",
    label: "Gemini Flash",
    apiIdentifier: "Gemini-flash",
    description: "Gemini 1.5 flash",
  },
] as const;

export function ModelSelect() {
  const [setApiKey] = useChat(useShallow((state) => [state.setApiKey]));

  const handleClick = () => {
    const key = prompt("Please enter your GOOGLE API KEY");
    key && setApiKey(key);
  };

  return (
    <SidebarMenu>
      {models.map((model) => (
        <SidebarMenuItem>
          <SidebarMenuButton
            key={model.id}
            className="gap-4 group/item flex flex-row justify-between items-center h-full"
            data-active
            onClick={handleClick}
          >
            <Brain />
            <div className="flex flex-col gap-1 items-start">
              {model.label}
              {model.description && (
                <div className="text-xs text-muted-foreground">
                  {model.description}
                </div>
              )}
            </div>
            <div className="text-primary dark:text-primary-foreground opacity-0 group-data-[active=true]/item:opacity-100">
              <CheckCircle2Icon />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
