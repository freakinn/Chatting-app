
import { useState, useEffect, useRef } from "react";
import { Conversation, Message } from "@/data/mockData";
import ConversationHeader from "./ConversationHeader";
import MessageBubble from "./MessageBubble";
import InputArea from "./InputArea";
import { useToast } from "@/hooks/use-toast";

interface ChatWindowProps {
  conversation: Conversation;
  onMenuToggle: () => void;
}

const ChatWindow = ({ conversation, onMenuToggle }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      content,
      sender: "Me",
      sentByMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate reply after 1-3 seconds if not a group chat
    if (!conversation.isGroup) {
      const replyDelay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        const replies = [
          "Sounds good!",
          "I'll get back to you on that.",
          "Thanks for letting me know.",
          "Got it! 👍",
          "Interesting! Tell me more.",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMessage: Message = {
          id: `reply-${Date.now()}`,
          content: randomReply,
          sender: conversation.name,
          sentByMe: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "delivered",
        };
        
        setMessages((prev) => [...prev, replyMessage]);
      }, replyDelay);
    }
  };

  const handleAddPeopleToGroup = (userIds: string[]) => {
    // In a real app, you would call an API to add these users to the group
    // For now, we'll just add a system message
    const userText = userIds.length === 1 ? "a new member" : `${userIds.length} new members`;
    
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      content: `You added ${userText} to the group`,
      sender: "System",
      sentByMe: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "read",
    };
    
    setMessages((prev) => [...prev, systemMessage]);
    
    toast({
      title: "People added to group",
      description: `Successfully added ${userText} to the group chat`,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader 
        conversation={conversation} 
        onMenuToggle={onMenuToggle} 
        onAddPeopleToGroup={handleAddPeopleToGroup}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
