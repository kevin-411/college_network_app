import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  BarChart3,
  MessageSquare,
  Flag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers, mockPosts, colleges } from '../../data/mockData';
import RichTextEditor from './RichTextEditor';

const AdminPanel: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'colleges', label: 'Colleges', icon: Shield },
    { id: 'reports', label: 'Reports', icon: Flag },
  ];

  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', color: 'blue' },
    { label: 'Total Posts', value: '15,632', change: '+8%', color: 'green' },
    { label: 'Active Colleges', value: '127', change: '+3%', color: 'purple' },
    { label: 'Reports', value: '23', change: '-15%', color: 'red' },
  ];

  const handleVerifyUser = (userId: string) => {
    console.log('Verifying user:', userId);
  };

  const handleDeletePost = (postId: string) => {
    console.log('Deleting post:', postId);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {mockPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <img
                  src={post.author.avatar}
                  alt={post.author.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{post.author.fullName}</p>
                  <p className="text-sm text-gray-600 truncate">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Users</h3>
          <div className="space-y-4">
            {mockUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-xs text-gray-600">{user.college}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleVerifyUser(user.id)}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  Verify
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Post Management</h2>
        <button
          onClick={() => setShowPostEditor(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{post.author.fullName}</h4>
                      <p className="text-sm text-gray-600">{post.author.college}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments.length} comments</span>
                    <span>{post.shares} shares</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Colleges</option>
              {colleges.map(college => (
                <option key={college.id} value={college.name}>{college.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{user.fullName}</h4>
                      {user.isVerified && (
                        <CheckCircle className="w-4 h-4 text-blue-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">@{user.username}</p>
                    <p className="text-sm text-gray-500">{user.college} • {user.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right text-sm">
                    <p className="text-gray-900 font-medium">{user.followers}</p>
                    <p className="text-gray-500">followers</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!user.isVerified ? (
                      <button
                        onClick={() => handleVerifyUser(user.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs">Verify</span>
                      </button>
                    ) : (
                      <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors duration-200">
                        <XCircle className="w-3 h-3" />
                        <span className="text-xs">Unverify</span>
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-500" />
            Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">Manage users, posts, and platform settings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg m-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'posts' && renderPosts()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'colleges' && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">College Management</h3>
              <p className="text-gray-600">Manage college registrations and settings</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <Flag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Moderation</h3>
              <p className="text-gray-600">Review reported content and user violations</p>
            </div>
          )}
        </div>

        {/* Post Editor Modal */}
        {showPostEditor && (
          <RichTextEditor
            onClose={() => setShowPostEditor(false)}
            onSave={(content) => {
              console.log('Saving post:', content);
              setShowPostEditor(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;