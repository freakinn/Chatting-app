
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Image, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputAreaProps {
  onSendMessage: (content: string) => void;
}

const InputArea = ({ onSendMessage }: InputAreaProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t p-3 flex items-end gap-2"
    >
      <div className="flex gap-2">
        <Button 
          type="button" 
          size="icon" 
          variant="ghost"
          className="h-10 w-10 rounded-full"
        >
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost"
          className="h-10 w-10 rounded-full"
        >
          <Image className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center bg-secondary rounded-full pl-4 pr-2 overflow-hidden">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button 
          type="button" 
          size="icon" 
          variant="ghost"
          className="h-9 w-9 rounded-full"
        >
          <Smile className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim()}
        className={cn(
          "h-10 w-10 rounded-full", 
          message.trim() ? "bg-whisper-500 hover:bg-whisper-600" : "bg-muted"
        )}
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default InputArea;
