import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Plus } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('2');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '2',
      user: mockUsers[1],
      lastMessage: 'Hey! Are we still on for the study group tomorrow?',
      timestamp: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: '3',
      user: mockUsers[2],
      lastMessage: 'Thanks for sharing those research papers!',
      timestamp: '1h ago',
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: "Hey! I saw your post about the neural networks project. That's impressive work!",
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: '1',
      content: "Thanks! It took weeks to get the accuracy that high. Are you working on something similar?",
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      content: "Yes! I'm working on a computer vision project for my thesis. Maybe we could collaborate sometime?",
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: '4',
      senderId: '1',
      content: "That sounds great! I'd love to learn more about your approach. Want to meet up this week?",
      timestamp: '10:37 AM',
      isOwn: true
    },
    {
      id: '5',
      senderId: '2',
      content: "Perfect! How about Thursday at 3 PM in the CS building?",
      timestamp: '10:40 AM',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${
                      selectedChat === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={conversation.user.avatar}
                        alt={conversation.user.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {conversation.user.fullName}
                        </p>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{conversation.unread}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.user.avatar}
                          alt={selectedConversation.user.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {selectedConversation.user.fullName}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.online ? 'Online' : 'Last seen 2h ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isOwn
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isOwn ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;