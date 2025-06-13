import React, { useState } from 'react';
import { Image, Tag, MapPin, Smile, X, Bold, Italic, Link, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usePostStore } from '../../store/postStore';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [postType, setPostType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { createPost } = usePostStore();

  const postTypes = [
    { id: 'general', label: 'General Post', color: 'blue' },
    { id: 'question', label: 'Ask Question', color: 'blue' },
    { id: 'study-group', label: 'Study Group', color: 'green' },
    { id: 'event', label: 'Event', color: 'purple' },
    { id: 'resource', label: 'Resource Share', color: 'orange' },
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (content.trim() && user) {
      setIsSubmitting(true);
      try {
        await createPost({
          content,
          tags,
          postType,
          authorId: user.id,
          author: user,
          college: user.college
        });
        
        setContent('');
        setTags([]);
        setIsExpanded(false);
        setPostType('general');
      } catch (error) {
        console.error('Failed to create post:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getPostTypeColor = (type: string) => {
    const typeConfig = postTypes.find(t => t.id === type);
    return typeConfig?.color || 'blue';
  };

  return (
    <motion.div 
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
      layout
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img
            src={user?.avatar}
            alt={user?.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                  <div className="flex flex-wrap gap-2">
                    {postTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setPostType(type.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                          postType === type.id
                            ? `bg-${type.color}-100 text-${type.color}-700 border-2 border-${type.color}-300`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rich Text Area */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center space-x-2 p-2 bg-gray-50 border-b border-gray-200"
                  >
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors duration-200">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors duration-200">
                      <Italic className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors duration-200">
                      <Link className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder={
                  postType === 'question' ? "What's your question? Be specific to get better answers..." :
                  postType === 'study-group' ? "Looking for study partners? Describe what you're studying..." :
                  postType === 'event' ? "What's happening? Share event details..." :
                  postType === 'resource' ? "Share a helpful resource with your peers..." :
                  "What's on your mind? Share with your college network..."
                }
                className="w-full p-3 border-none resize-none focus:ring-0 focus:outline-none"
                rows={isExpanded ? 4 : 2}
              />
            </div>
            
            {/* Tags */}
            <AnimatePresence>
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mt-3"
                >
                  {tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-blue-900 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tag Input */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center space-x-2 mt-3"
                >
                  <Tag className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded hover:bg-blue-200 transition-colors duration-200"
                  >
                    Add
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Image className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Location</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Smile className="w-5 h-5" />
                  <span className="text-sm font-medium">Feeling</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setContent('');
                    setTags([]);
                    setPostType('general');
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim() || isSubmitting}
                  className={`flex items-center space-x-2 px-6 py-2 font-medium rounded-lg transition-colors duration-200 ${
                    getPostTypeColor(postType) === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    getPostTypeColor(postType) === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                    getPostTypeColor(postType) === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                    'bg-blue-600 hover:bg-blue-700'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>
                    {postType === 'question' ? 'Ask Question' :
                     postType === 'study-group' ? 'Create Group' :
                     postType === 'event' ? 'Share Event' :
                     postType === 'resource' ? 'Share Resource' :
                     'Post'}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CreatePost;