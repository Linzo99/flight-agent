import { Chat } from "@/components/chat";
import { ChatStoreProvider } from "@/components/providers/chat-provider";

export default async function Home() {
  return (
    <ChatStoreProvider>
      <Chat />
    </ChatStoreProvider>
  );
}
