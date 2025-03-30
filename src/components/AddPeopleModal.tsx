
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Search, UserPlus, X } from "lucide-react";
import Avatar from "./Avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

// Mock users that can be added to the group
const MOCK_USERS = [
  {
    id: "u1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=14",
    selected: false
  },
  {
    id: "u2",
    name: "Jamie Williams",
    avatar: "https://i.pravatar.cc/150?img=15",
    selected: false
  },
  {
    id: "u3",
    name: "Taylor Smith",
    avatar: "https://i.pravatar.cc/150?img=16",
    selected: false
  },
  {
    id: "u4",
    name: "Morgan Lee",
    avatar: "https://i.pravatar.cc/150?img=17",
    selected: false
  },
  {
    id: "u5",
    name: "Riley Brown",
    avatar: "https://i.pravatar.cc/150?img=18",
    selected: false
  }
];

interface AddPeopleModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  onAddPeople: (userIds: string[]) => void;
}

const AddPeopleModal = ({ 
  isOpen, 
  onClose, 
  conversationId, 
  onAddPeople 
}: AddPeopleModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(MOCK_USERS);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, selected: !user.selected } : user
    ));
  };

  const handleAddPeople = () => {
    const selectedUserIds = users.filter(user => user.selected).map(user => user.id);
    
    if (selectedUserIds.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one user to add",
        variant: "destructive"
      });
      return;
    }
    
    onAddPeople(selectedUserIds);
    toast({
      title: "Users added",
      description: `Added ${selectedUserIds.length} user(s) to the group`,
    });
    
    // Reset selections
    setUsers(users.map(user => ({ ...user, selected: false })));
    onClose();
  };

  const ModalContent = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filteredUsers.map(user => (
          <div 
            key={user.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
            onClick={() => toggleUserSelection(user.id)}
          >
            <div className="flex items-center gap-3">
              <Avatar src={user.avatar} name={user.name} size="sm" />
              <span>{user.name}</span>
            </div>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${user.selected ? 'bg-whisper-500 border-whisper-500' : 'border-gray-300 dark:border-gray-600'}`}>
              {user.selected && <Check className="h-4 w-4 text-white" />}
            </div>
          </div>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No users found
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddPeople}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add to Group
        </Button>
      </div>
    </div>
  );

  // Use Sheet on mobile and Dialog on desktop
  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80%]">
        <SheetHeader className="mb-4">
          <SheetTitle>Add People to Group</SheetTitle>
        </SheetHeader>
        <ModalContent />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add People to Group</DialogTitle>
        </DialogHeader>
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
};

export default AddPeopleModal;
