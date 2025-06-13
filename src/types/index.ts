export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  college: string;
  year: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isVerified: boolean;
  joinDate: string;
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  images?: string[];
  tags: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  college: string;
}

export interface Comment {
  id: string;
  authorId: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface College {
  id: string;
  name: string;
  logo: string;
  newsCount: number;
}