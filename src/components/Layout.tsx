
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { Conversation } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface LayoutProps {
  conversations: Conversation[];
}

const Layout = ({ conversations }: LayoutProps) => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(
    conversations.length > 0 ? conversations[0] : null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // Set initial sidebar state based on device and active conversation
  useEffect(() => {
    if (isMobile) {
      // On mobile, show the sidebar (conversation list) if no conversation is active
      setSidebarOpen(!activeConversation);
    } else {
      // On desktop, always show the sidebar by default
      setSidebarOpen(true);
    }
  }, [isMobile, activeConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile, this acts as a back button
      setActiveConversation(null);
      setSidebarOpen(true);
    } else {
      // Normal toggle behavior for desktop
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div 
        className={cn(
          "w-80 flex-shrink-0 transition-all duration-300 ease-in-out-back",
          isMobile && "absolute z-10 h-full",
          isMobile && !activeConversation && "w-full"
        )}
        style={{
          width: isMobile ? (sidebarOpen ? '100%' : '0') : (sidebarOpen ? '20rem' : '0'),
          opacity: (!isMobile || sidebarOpen) ? 1 : 0,
          visibility: (!isMobile || sidebarOpen) ? 'visible' : 'hidden',
        }}
      >
        <Sidebar
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={handleSelectConversation}
          isMobile={isMobile}
          isOpen={sidebarOpen}
        />
      </div>
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isMobile && !activeConversation && "hidden"
      )}>
        {activeConversation ? (
          <ChatWindow 
            conversation={activeConversation} 
            onMenuToggle={toggleSidebar} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full fade-in">
            <div className="text-5xl mb-4 animate-float">👋</div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-whisper-600 to-whisper-400 bg-clip-text text-transparent">Welcome to WhisperWoven</h2>
            <p className="text-muted-foreground mt-2 animate-slide-in-up">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
