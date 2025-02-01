"use client";

import { RefreshCw } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useChat } from "@/components/providers/chat-provider";
import { useShallow } from "zustand/shallow";

const ResetButton = () => {
  const [setMessages] = useChat(useShallow((state) => [state.setMessages]));
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="cursor-pointer"
        asChild
        onClick={() => setMessages([])}
      >
        <div>
          <RefreshCw />
          <span>Delete Chat</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ResetButton;
