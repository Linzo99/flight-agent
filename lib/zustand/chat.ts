import { create_task } from "@/actions";
import { Message } from "@/lib/types";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface StoreData {
  input: string;
  isLoading: boolean;
  total_session: number;
  sessions: Record<string, Message[]>;
}

export interface StoreActions {
  handleSubmit: () => void;
  setInput: (text: string) => void;
  append: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  getMessages: () => Message[];
}

export type StoreState = StoreData & StoreActions;
export const initialState = {
  input: "",
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
        handleSubmit: () => {
          const { input, append } = get();
          append({ role: "user", content: input });
          set({ input: "" });
        },

        setMessages: (messages) => set({ sessions: { 0: messages } }),

        getMessages: () => {
          const { total_session, sessions } = get();
          return Object.values(sessions)
            .slice(0, total_session + 1)
            .flat();
        },
        append: (message) => {
          const total = get().total_session;
          const old_msgs = () => get().sessions[total];
          set({
            isLoading: true,
            sessions: { ...get().sessions, [total]: [...old_msgs(), message] },
          });
          // create the workflow task
          create_task({
            chat_history: old_msgs(), // the history
          })
            .then((content) => {
              const result = JSON.parse(content);
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
