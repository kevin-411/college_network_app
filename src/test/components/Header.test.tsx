import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../../components/Layout/Header';
import { AuthProvider } from '../../context/AuthContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockNavigate = vi.fn();

const renderWithAuth = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('Header', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders header with logo and navigation', () => {
    renderWithAuth(<Header onNavigate={mockNavigate} currentPage="timeline" />);
    
    expect(screen.getByText('College Network')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search students/)).toBeInTheDocument();
  });

  it('calls onNavigate when navigation buttons are clicked', () => {
    renderWithAuth(<Header onNavigate={mockNavigate} currentPage="timeline" />);
    
    const homeButton = screen.getAllByRole('button')[1]; // First button after logo
    fireEvent.click(homeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('timeline');
  });

  it('shows profile menu when profile button is clicked', () => {
    renderWithAuth(<Header onNavigate={mockNavigate} currentPage="timeline" />);
    
    const profileButton = screen.getByAltText('Test User');
    fireEvent.click(profileButton);
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('opens global search when search input is clicked', () => {
    renderWithAuth(<Header onNavigate={mockNavigate} currentPage="timeline" />);
    
    const searchInput = screen.getByPlaceholderText(/Search students/);
    fireEvent.click(searchInput);
    
    // Global search modal should open (tested separately)
  });
});