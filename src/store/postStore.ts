import { create } from 'zustand';
import { Post } from '../types';
import { mockPosts } from '../data/mockData';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (postData: any) => Promise<void>;
  likePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: mockPosts,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ posts: mockPosts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },

  createPost: async (postData: any) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost: Post = {
        id: Date.now().toString(),
        authorId: postData.authorId,
        author: postData.author,
        content: postData.content,
        tags: postData.tags || [],
        likes: 0,
        comments: [],
        shares: 0,
        timestamp: new Date().toISOString(),
        college: postData.college,
        images: postData.images
      };

      set(state => ({
        posts: [newPost, ...state.posts],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create post', loading: false });
    }
  },

  likePost: (postId: string) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    }));
  },

  deletePost: (postId: string) => {
    set(state => ({
      posts: state.posts.filter(post => post.id !== postId)
    }));
  },

  updatePost: (postId: string, updates: Partial<Post>) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId
          ? { ...post, ...updates }
          : post
      )
    }));
  },
}));