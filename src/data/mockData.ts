import { User, Post, College } from '../types';

export const colleges: College[] = [
  { id: '1', name: 'Stanford University', logo: '🎓', newsCount: 12 },
  { id: '2', name: 'MIT', logo: '🔬', newsCount: 8 },
  { id: '3', name: 'Harvard University', logo: '📚', newsCount: 15 },
  { id: '4', name: 'UC Berkeley', logo: '🐻', newsCount: 10 },
  { id: '5', name: 'Caltech', logo: '🔭', newsCount: 6 },
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'sarah_chen',
    email: 'sarah.chen@stanford.edu',
    fullName: 'Sarah Chen',
    college: 'Stanford University',
    year: 'Senior',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Computer Science major passionate about AI and machine learning. Always ready to help fellow students!',
    followers: 342,
    following: 189,
    isVerified: true,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    username: 'mike_rodriguez',
    email: 'mike.r@mit.edu',
    fullName: 'Miguel Rodriguez',
    college: 'MIT',
    year: 'Junior',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Mechanical Engineering student. Love building things and solving complex problems.',
    followers: 275,
    following: 156,
    isVerified: false,
    joinDate: '2024-02-20'
  },
  {
    id: '3',
    username: 'emma_davis',
    email: 'emma.davis@harvard.edu',
    fullName: 'Emma Davis',
    college: 'Harvard University',
    year: 'Senior',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Pre-med student interested in neuroscience research. Coffee enthusiast ☕',
    followers: 428,
    following: 203,
    isVerified: true,
    joinDate: '2024-01-08'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    author: mockUsers[0],
    content: 'Just finished my final project on neural networks! The model achieved 94% accuracy on the test dataset. Excited to share my findings with the research community. #MachineLearning #AI #Stanford',
    images: ['https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600'],
    tags: ['MachineLearning', 'AI', 'Stanford'],
    likes: 47,
    comments: [],
    shares: 12,
    timestamp: '2024-01-20T10:30:00Z',
    college: 'Stanford University'
  },
  {
    id: '2',
    authorId: '2',
    author: mockUsers[1],
    content: 'Looking for study partners for thermodynamics exam next week. Anyone interested in forming a study group? We can meet at the library. #StudyGroup #MIT #MechE',
    tags: ['StudyGroup', 'MIT', 'MechE'],
    likes: 23,
    comments: [],
    shares: 8,
    timestamp: '2024-01-19T15:45:00Z',
    college: 'MIT'
  },
  {
    id: '3',
    authorId: '3',
    author: mockUsers[2],
    content: 'Amazing lecture today on neurodegenerative diseases! Dr. Smith\'s research on Alzheimer\'s prevention is groundbreaking. Grateful to be learning from the best. #Neuroscience #Harvard #PreMed',
    images: ['https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600'],
    tags: ['Neuroscience', 'Harvard', 'PreMed'],
    likes: 65,
    comments: [],
    shares: 15,
    timestamp: '2024-01-18T14:20:00Z',
    college: 'Harvard University'
  }
];

export const currentUser: User = mockUsers[0];