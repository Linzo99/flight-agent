"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Brain, CheckCircle2Icon, ChevronDown } from "lucide-react";
import { useState } from "react";

export const models = [
  {
    id: "gemini-flash",
    label: "Gemini Flash",
    apiIdentifier: "Gemini-flash",
    description: "Fast google model",
  },
  {
    id: "gpt-4o",
    label: "GPT 4o",
    apiIdentifier: "gpt-4o",
    description: "For complex, multi-step tasks",
  },
] as const;

const DEFAULT_MODEL_NAME: string = "gemini-flash";

export function ModelSelect() {
  const { isMobile } = useSidebar();
  const [active, setActive] = useState(DEFAULT_MODEL_NAME);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Brain />
              <span>Select Model</span>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            {models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onSelect={() => {
                  setActive(model.id);
                }}
                className="gap-4 group/item flex flex-row justify-between items-center"
                data-active={model.id === active}
              >
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
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
