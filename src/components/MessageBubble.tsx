
import { cn } from "@/lib/utils";
import { Message } from "@/data/mockData";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { content, sentByMe, timestamp, status, media } = message;

  const StatusIcon = () => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
      case 'read':
        return <CheckCheck className={cn("h-3 w-3", status === 'read' ? "text-blue-400" : "")} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "message-bubble",
        sentByMe ? "message-bubble-sent" : "message-bubble-received"
      )}
    >
      {media && media.type === 'image' && (
        <div className="mb-2 rounded-lg overflow-hidden">
          <img 
            src={media.url} 
            alt="Shared media" 
            className="w-full max-h-48 object-cover"
          />
        </div>
      )}
      <div>{content}</div>
      <div className="flex items-center gap-1 mt-1 text-xs opacity-70 justify-end">
        <span>{timestamp}</span>
        {sentByMe && <StatusIcon />}
      </div>
    </div>
  );
};

export default MessageBubble;
