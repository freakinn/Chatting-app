
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  isGroup?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar = ({ src, name, isGroup = false, size = 'md', className }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center overflow-hidden',
        sizeClasses[size],
        isGroup ? 'bg-whisper-200' : 'bg-whisper-300',
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : isGroup ? (
        <Users className="text-whisper-600" size={size === 'lg' ? 24 : size === 'md' ? 18 : 16} />
      ) : (
        <span className="font-medium text-whisper-700">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
