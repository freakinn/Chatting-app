
import { useState } from "react";
import { Conversation } from "@/data/mockData";
import Avatar from "./Avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Phone, Video, UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AddPeopleModal from "./AddPeopleModal";
import { useToast } from "@/hooks/use-toast";

interface ConversationHeaderProps {
  conversation: Conversation;
  onMenuToggle: () => void;
  onAddPeopleToGroup?: (userIds: string[]) => void;
}

const ConversationHeader = ({ 
  conversation, 
  onMenuToggle,
  onAddPeopleToGroup
}: ConversationHeaderProps) => {
  const isMobile = useIsMobile();
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAddPeople = (userIds: string[]) => {
    if (onAddPeopleToGroup) {
      onAddPeopleToGroup(userIds);
    } else {
      // If no handler is provided, just show a toast notification
      toast({
        title: "Users added",
        description: `Added ${userIds.length} user(s) to the group`,
      });
    }
  };

  return (
    <>
      <div className="border-b p-3 flex items-center justify-between bg-card shadow-sm transition-all duration-300 glass-card">
        <div className="flex items-center gap-3 fade-in">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onMenuToggle}
              className="md:hidden transition-transform duration-200 hover:scale-105"
              aria-label="Back to conversations"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar 
            src={conversation.avatar} 
            name={conversation.name} 
            isGroup={conversation.isGroup} 
          />
          <div className="flex flex-col">
            <span className="font-medium">{conversation.name}</span>
            {conversation.isGroup && (
              <span className="text-xs text-muted-foreground">
                {conversation.members?.length} members
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 slide-in-right">
          {conversation.isGroup && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsAddPeopleModalOpen(true)}
              title="Add people to group"
              className="transition-all duration-200 hover:bg-secondary hover:scale-105"
            >
              <UserPlus className="h-5 w-5" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            className="transition-all duration-200 hover:bg-secondary hover:scale-105"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="transition-all duration-200 hover:bg-secondary hover:scale-105"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {conversation.isGroup && (
        <AddPeopleModal 
          isOpen={isAddPeopleModalOpen}
          onClose={() => setIsAddPeopleModalOpen(false)}
          conversationId={conversation.id}
          onAddPeople={handleAddPeople}
        />
      )}
    </>
  );
};

export default ConversationHeader;
