import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatStoreProvider } from "@/components/providers/chat-provider";

export const metadata: Metadata = {
  title: "FyF",
  description: "Find your flight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatStoreProvider>
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <main className="w-full">
                <SidebarTrigger className="absolute top-2 left-2 md:hidden" />
                {children}
              </main>
            </SidebarProvider>
          </ChatStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
