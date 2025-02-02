import { Message } from "@/lib/types";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface StoreData {
  input: string;
  isLoading: boolean;
  total_session: number;
  sessions: Record<string, Message[]>;
  apiKey: string;
}

export interface StoreActions {
  handleSubmit: () => void;
  setInput: (text: string) => void;
  append: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  getMessages: () => Message[];
  setApiKey: (apiKey: string) => void;
}

export type StoreState = StoreData & StoreActions;
export const initialState = {
  input: "",
  apiKey: "",
  isLoading: false,
  total_session: 0,
  sessions: { 0: [] },
};

export const createChatStore = (initProps: StoreData = initialState) => {
  return createStore<StoreState>()(
    persist(
      (set, get) => ({
        ...initProps,
        // actions
        setInput: (text) => set({ input: text }),
        setApiKey: (apiKey) => set({ apiKey }),
        handleSubmit: () => {
          const { input, append } = get();
          append({ role: "user", content: input });
          set({ input: "" });
        },

        setMessages: (messages) =>
          set({ sessions: { 0: messages }, total_session: 0 }),

        getMessages: () => {
          const { total_session, sessions } = get();
          return Object.values(sessions)
            .slice(0, total_session + 1)
            .flat();
        },
        append: (message) => {
          // I know this is Lazy :(
          const apiKey = get().apiKey;
          const total = get().total_session;
          const old_msgs = () => get().sessions[total];
          set({
            isLoading: true,
            sessions: { ...get().sessions, [total]: [...old_msgs(), message] },
          });
          // call the workflow
          fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ messages: old_msgs(), apiKey }),
          })
            .then(async (content) => {
              const result = await content.json();
              console.log(result);
              set({
                sessions: {
                  ...get().sessions,
                  [total]: [...old_msgs(), result],
                },
              });

              if (result.isFinal)
                set({
                  total_session: total + 1,
                  sessions: {
                    ...get().sessions,
                    [total + 1]: [],
                  },
                });
            })
            .catch(console.log)
            .finally(() => set({ isLoading: false }));
        },
      }),
      { name: "fyf_chat" },
    ),
  );
};
