"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import { type StoreState, createChatStore } from "@/lib/zustand/chat";

export const ChatStoreContext = createContext<StoreApi<StoreState> | null>(
  null,
);

export const ChatStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<StoreState>>();
  if (!storeRef.current) storeRef.current = createChatStore();

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

export const useChat = <T,>(selector: (store: StoreState) => T): T => {
  const context = useContext(ChatStoreContext);
  if (!context)
    throw new Error("useFilter must be used inside a FilterStoreProvider");

  return useStore(context, selector);
};
