
import { useState } from "react";
import { Conversation, getCurrentUser } from "@/data/mockData";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, Users, Plus, Settings, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  isMobile: boolean;
  isOpen: boolean;
}

const Sidebar = ({ 
  conversations, 
  activeConversation, 
  onSelectConversation,
  isMobile,
  isOpen
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const filteredConversations = conversations.filter(convo => 
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div 
      className={cn(
        "flex flex-col bg-card border-r h-full transition-all duration-300 ease-in-out",
        isMobile && (isOpen ? "w-full" : "w-0 opacity-0 invisible")
      )}
    >
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar 
            src={user?.avatar || ""} 
            name={user?.name || "User"} 
            size="sm"
          />
          <h1 className="font-semibold text-lg">Whisper</h1>
        </div>
        <div className="flex gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950/20"
          >
            <LogOut className="h-5 w-5" />
          </Button>
          <Button size="icon" className="bg-whisper-500 hover:bg-whisper-600 rounded-full h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-secondary border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex px-3 py-2 gap-1 border-b">
        <Button 
          variant="ghost" 
          className="flex-1 justify-start gap-2 rounded-full"
        >
          <MessageSquare className="h-4 w-4" />
          All Chats
        </Button>
        <Button 
          variant="ghost" 
          className="flex-1 justify-start gap-2 rounded-full"
        >
          <Users className="h-4 w-4" />
          Groups
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto conversations-list">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "conversation-item",
              activeConversation?.id === conversation.id && "conversation-item-active"
            )}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex gap-3 items-center">
              <Avatar 
                src={conversation.avatar} 
                name={conversation.name} 
                isGroup={conversation.isGroup}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium truncate">{conversation.name}</span>
                  <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-whisper-500 text-white rounded-full h-5 min-w-5 text-xs flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
