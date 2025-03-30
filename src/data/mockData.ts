
import { MessageSquare, Users } from "lucide-react";

export type Message = {
  id: string;
  content: string;
  sender: string;
  sentByMe: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  media?: {
    type: 'image' | 'file';
    url: string;
  };
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isGroup: boolean;
  members?: {
    id: string;
    name: string;
    avatar: string;
  }[];
  messages: Message[];
};

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Are we still meeting tomorrow?',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    isGroup: false,
    messages: [
      {
        id: '101',
        content: 'Hey, how are you doing?',
        sender: 'Sarah Johnson',
        sentByMe: false,
        timestamp: '10:30 AM',
        status: 'read'
      },
      {
        id: '102',
        content: 'I\'m good! Just working on that project we discussed.',
        sender: 'Me',
        sentByMe: true,
        timestamp: '10:32 AM',
        status: 'read'
      },
      {
        id: '103',
        content: 'That sounds great! Can you send me an update when you\'re done?',
        sender: 'Sarah Johnson',
        sentByMe: false,
        timestamp: '10:35 AM',
        status: 'read'
      },
      {
        id: '104',
        content: 'Sure thing, I should be finished by tomorrow.',
        sender: 'Me',
        sentByMe: true,
        timestamp: '10:36 AM',
        status: 'read'
      },
      {
        id: '105',
        content: 'Are we still meeting tomorrow?',
        sender: 'Sarah Johnson',
        sentByMe: false,
        timestamp: '10:42 AM',
        status: 'delivered'
      }
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    avatar: '',
    lastMessage: 'Alex: I\'ve uploaded the latest mockups',
    lastMessageTime: '9:30 AM',
    unreadCount: 0,
    isGroup: true,
    members: [
      {
        id: '201',
        name: 'Alex Chen',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      {
        id: '202',
        name: 'Jamie Smith',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      {
        id: '203',
        name: 'Taylor Wong',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    ],
    messages: [
      {
        id: '201',
        content: 'Hey everyone, we need to finalize the homepage design by Friday',
        sender: 'Jamie Smith',
        sentByMe: false,
        timestamp: '9:15 AM',
        status: 'read'
      },
      {
        id: '202',
        content: 'I\'ve been working on some concepts. Let me share them',
        sender: 'Me',
        sentByMe: true,
        timestamp: '9:20 AM',
        status: 'read'
      },
      {
        id: '203',
        content: 'I\'ve uploaded the latest mockups',
        sender: 'Alex Chen',
        sentByMe: false,
        timestamp: '9:30 AM',
        status: 'read',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Thanks for the recommendation!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isGroup: false,
    messages: [
      {
        id: '301',
        content: 'Have you tried that new restaurant downtown?',
        sender: 'Michael Rodriguez',
        sentByMe: false,
        timestamp: 'Yesterday, 7:15 PM',
        status: 'read'
      },
      {
        id: '302',
        content: 'Yes! The pasta there is amazing.',
        sender: 'Me',
        sentByMe: true,
        timestamp: 'Yesterday, 7:20 PM',
        status: 'read'
      },
      {
        id: '303',
        content: 'Thanks for the recommendation!',
        sender: 'Michael Rodriguez',
        sentByMe: false,
        timestamp: 'Yesterday, 7:30 PM',
        status: 'read'
      }
    ]
  },
  {
    id: '4',
    name: 'Weekend Hiking',
    avatar: '',
    lastMessage: 'Emma: Don\'t forget to bring water bottles!',
    lastMessageTime: 'Wednesday',
    unreadCount: 0,
    isGroup: true,
    members: [
      {
        id: '401',
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=9'
      },
      {
        id: '402',
        name: 'Noah Martinez',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      {
        id: '403',
        name: 'Olivia Lee',
        avatar: 'https://i.pravatar.cc/150?img=11'
      }
    ],
    messages: [
      {
        id: '401',
        content: 'So excited for our hike this weekend!',
        sender: 'Noah Martinez',
        sentByMe: false,
        timestamp: 'Wednesday, 4:30 PM',
        status: 'read'
      },
      {
        id: '402',
        content: 'Me too! The weather forecast looks great.',
        sender: 'Me',
        sentByMe: true,
        timestamp: 'Wednesday, 4:35 PM',
        status: 'read'
      },
      {
        id: '403',
        content: 'Don\'t forget to bring water bottles!',
        sender: 'Emma Wilson',
        sentByMe: false,
        timestamp: 'Wednesday, 4:45 PM',
        status: 'read'
      }
    ]
  },
  {
    id: '5',
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Can you send me the presentation?',
    lastMessageTime: 'Tuesday',
    unreadCount: 0,
    isGroup: false,
    messages: [
      {
        id: '501',
        content: 'Hey, how did the meeting go?',
        sender: 'Emily Davis',
        sentByMe: false,
        timestamp: 'Tuesday, 2:00 PM',
        status: 'read'
      },
      {
        id: '502',
        content: 'It went well! We got approval for the project.',
        sender: 'Me',
        sentByMe: true,
        timestamp: 'Tuesday, 2:05 PM',
        status: 'read'
      },
      {
        id: '503',
        content: 'That\'s great news! Can you send me the presentation?',
        sender: 'Emily Davis',
        sentByMe: false,
        timestamp: 'Tuesday, 2:10 PM',
        status: 'read'
      }
    ]
  }
];

export const getCurrentUser = () => {
  return {
    id: 'current-user',
    name: 'Me',
    avatar: 'https://i.pravatar.cc/150?img=13',
    status: 'online'
  };
};
