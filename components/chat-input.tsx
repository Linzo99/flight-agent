"use client";

import { useChat } from "@/components/providers/chat-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const suggestedActions = [
  {
    title: "Cheapest flight to dakar",
    label: "Flight to dakar",
    action: "Help me find the cheapest flight to Dakar",
  },
  {
    title: "Fastest round-trip to Paris",
    label: "Find round trip",
    action: "Help me find the fastest round-trip from Dakar to Paris",
  },
];

export function ChatInput({ className }: { className?: string }) {
  const chat = useChat((state) => state);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      {chat.getMessages().length === 0 && (
        <div className="grid sm:grid-cols-2 gap-2 w-full">
          {suggestedActions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={`suggested-action-${suggestedAction.title}-${index}`}
              className={index > 1 ? "hidden sm:block" : "block"}
            >
              <Button
                variant="ghost"
                className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
                onClick={() =>
                  chat.append({
                    role: "user",
                    content: suggestedAction.action,
                  })
                }
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-muted-foreground">
                  {suggestedAction.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <Textarea
        ref={textareaRef}
        placeholder="Describe your flight ..."
        value={chat.input}
        onChange={({ target }) => chat.setInput(target.value)}
        className={cn(
          "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-lg bg-muted",
          className,
        )}
        rows={3}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (chat.isLoading) {
              toast({
                description:
                  "Please wait for the model to finish its response!",
                variant: "destructive",
              });
            } else {
              chat.handleSubmit();
            }
          }
        }}
      />

      <Button
        className="rounded-full p-1.5 h-fit bg-blue-600 absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
        onClick={(event) => {
          event.preventDefault();
          chat.handleSubmit();
        }}
        disabled={chat.input.length == 0}
      >
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
