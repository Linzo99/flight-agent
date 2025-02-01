"use client";

import { ChatInput } from "@/components/chat-input";
import { PreviewMessage, ThinkingMessage } from "@/components/messages";
import { Overview } from "@/components/overview";
import { useChat } from "@/components/providers/chat-provider";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { ResultMessage } from "@/lib/types";
import { useShallow } from "zustand/shallow";

export function Chat() {
  const [getMessages, isLoading] = useChat(
    useShallow((state) => [state.getMessages, state.isLoading, state.sessions]),
  );

  const messages = getMessages();
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 mr-4"
        >
          {messages.length === 0 && <Overview />}

          {messages.map((message, idx) => (
            <PreviewMessage
              key={idx}
              message={message as ResultMessage}
              isLoading={isLoading && messages.length - 1 === idx}
            />
          ))}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <ThinkingMessage />
            )}

          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>
        <form className="flex mx-auto px-2 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <ChatInput />
        </form>
      </div>
    </>
  );
}
