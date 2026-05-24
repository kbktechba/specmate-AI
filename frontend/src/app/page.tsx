import { ChatInterface } from "@/components/ChatInterface";
import { RightSidebar } from "@/components/RightSidebar";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <main className="flex-1 min-w-0 flex flex-col relative">
        <ChatInterface />
      </main>
      <RightSidebar />
    </div>
  );
}
