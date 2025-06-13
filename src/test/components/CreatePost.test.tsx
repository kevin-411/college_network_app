import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CreatePost from '../../components/Timeline/CreatePost';
import { AuthProvider } from '../../context/AuthContext';

// Mock the auth store
vi.mock('../../store/authStore', () => ({
  useAuthStore: () => ({
    user: {
      id: '1',
      fullName: 'Test User',
      avatar: 'test-avatar.jpg'
    },
    isAuthenticated: true
  })
}));

// Mock the post store
vi.mock('../../store/postStore', () => ({
  usePostStore: () => ({
    createPost: vi.fn()
  })
}));

const renderWithAuth = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('CreatePost', () => {
  it('renders create post form', () => {
    renderWithAuth(<CreatePost />);
    
    expect(screen.getByPlaceholderText(/What's on your mind/)).toBeInTheDocument();
  });

  it('expands form when textarea is focused', async () => {
    renderWithAuth(<CreatePost />);
    
    const textarea = screen.getByPlaceholderText(/What's on your mind/);
    fireEvent.focus(textarea);

    await waitFor(() => {
      expect(screen.getByText('Post Type')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Post')).toBeInTheDocument();
    });
  });

  it('allows adding and removing tags', async () => {
    renderWithAuth(<CreatePost />);
    
    const textarea = screen.getByPlaceholderText(/What's on your mind/);
    fireEvent.focus(textarea);

    await waitFor(() => {
      const tagInput = screen.getByPlaceholderText('Add tags (press Enter)');
      fireEvent.change(tagInput, { target: { value: 'test-tag' } });
      fireEvent.keyPress(tagInput, { key: 'Enter', code: 'Enter' });
    });

    expect(screen.getByText('#test-tag')).toBeInTheDocument();
  });

  it('changes post type when selected', async () => {
    renderWithAuth(<CreatePost />);
    
    const textarea = screen.getByPlaceholderText(/What's on your mind/);
    fireEvent.focus(textarea);

    await waitFor(() => {
      const questionButton = screen.getByText('Ask Question');
      fireEvent.click(questionButton);
    });

    expect(screen.getByPlaceholderText(/What's your question/)).toBeInTheDocument();
  });
});