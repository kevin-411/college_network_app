import React, { useState } from 'react';
import { Search, Bell, MessageCircle, User, Menu, Home, Users, BookOpen, Settings, LogOut, ShoppingBag, Newspaper } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GlobalSearch from '../Search/GlobalSearch';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout, isAdmin } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('timeline')}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    College Network
                  </span>
                </div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search students, posts, colleges..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                  onClick={() => setShowGlobalSearch(true)}
                  readOnly
                />
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('timeline')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    currentPage === 'timeline' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('news')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    currentPage === 'news' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Newspaper className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('messages')}
                  className={`p-2 rounded-lg transition-colors duration-200 relative ${
                    currentPage === 'messages' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <button
                  onClick={() => onNavigate('resources')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    currentPage === 'resources' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    currentPage === 'marketplace' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">{user?.fullName}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </button>
                    )}
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setShowGlobalSearch(true)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('timeline');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <Home className="w-5 h-5" />
                  <span>Timeline</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('news');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <Newspaper className="w-5 h-5" />
                  <span>College News</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('messages');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Messages</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('resources');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Resources</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('marketplace');
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Marketplace</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={showGlobalSearch}
        onClose={() => setShowGlobalSearch(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Header;