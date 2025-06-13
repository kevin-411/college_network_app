import React, { useState } from 'react';
import { X, Bold, Italic, List, Link, Image, Tag } from 'lucide-react';

interface RichTextEditorProps {
  onClose: () => void;
  onSave: (content: any) => void;
  initialContent?: string;
  title?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  onClose, 
  onSave, 
  initialContent = '',
  title = 'Create New Post'
}) => {
  const [content, setContent] = useState(initialContent);
  const [postTitle, setPostTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [college, setCollege] = useState('');
  const [isOfficial, setIsOfficial] = useState(false);

  const colleges = [
    'Stanford University',
    'MIT',
    'Harvard University',
    'UC Berkeley',
    'Caltech'
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

  const handleSave = () => {
    const postData = {
      title: postTitle,
      content,
      tags,
      college,
      isOfficial,
      timestamp: new Date().toISOString()
    };
    onSave(postData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Post Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* College and Official Post */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College
              </label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select College</option>
                {colleges.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                id="official"
                checked={isOfficial}
                onChange={(e) => setIsOfficial(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="official" className="text-sm font-medium text-gray-700">
                Official College Post
              </label>
            </div>
          </div>

          {/* Rich Text Toolbar */}
          <div className="border border-gray-300 rounded-lg">
            <div className="flex items-center space-x-2 p-3 border-b border-gray-200 bg-gray-50">
              <button className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                <Italic className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                <List className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                <Link className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                <Image className="w-4 h-4" />
              </button>
            </div>

            {/* Text Area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full p-4 border-none focus:ring-0 resize-none"
              rows={12}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:text-blue-900 transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add tags (press Enter)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;