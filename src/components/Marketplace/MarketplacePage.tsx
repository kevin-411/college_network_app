import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Plus, Heart, MapPin, Calendar, User, Star, BookOpen, Laptop, Calculator, Microscope } from 'lucide-react';

const MarketplacePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items', icon: ShoppingBag },
    { id: 'textbooks', label: 'Textbooks', icon: BookOpen },
    { id: 'electronics', label: 'Electronics', icon: Laptop },
    { id: 'supplies', label: 'Supplies', icon: Calculator },
    { id: 'lab-equipment', label: 'Lab Equipment', icon: Microscope },
  ];

  const marketplaceItems = [
    {
      id: '1',
      title: 'Calculus: Early Transcendentals 8th Edition',
      description: 'Excellent condition, minimal highlighting. Perfect for Math 21A/21B.',
      price: 89.99,
      originalPrice: 299.99,
      category: 'textbooks',
      condition: 'Like New',
      seller: {
        name: 'Sarah Chen',
        rating: 4.9,
        college: 'Stanford University',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'],
      location: 'Stanford, CA',
      postedDate: '2024-01-18',
      views: 127,
      saves: 23,
      tags: ['Calculus', 'Mathematics', 'Stewart']
    },
    {
      id: '2',
      title: 'MacBook Pro 13" M1 (2020)',
      description: 'Barely used, perfect for computer science students. Includes charger and case.',
      price: 899.99,
      originalPrice: 1299.99,
      category: 'electronics',
      condition: 'Excellent',
      seller: {
        name: 'Miguel Rodriguez',
        rating: 4.8,
        college: 'MIT',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400'],
      location: 'Cambridge, MA',
      postedDate: '2024-01-16',
      views: 245,
      saves: 67,
      tags: ['Apple', 'MacBook', 'CS', 'Programming']
    },
    {
      id: '3',
      title: 'Organic Chemistry Lab Kit',
      description: 'Complete lab kit with glassware, chemicals, and safety equipment. Great for OChem labs.',
      price: 156.00,
      originalPrice: 280.00,
      category: 'lab-equipment',
      condition: 'Good',
      seller: {
        name: 'Alex Thompson',
        rating: 4.7,
        college: 'UC Berkeley',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      images: ['https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'],
      location: 'Berkeley, CA',
      postedDate: '2024-01-15',
      views: 89,
      saves: 34,
      tags: ['Chemistry', 'Lab', 'OChem', 'Equipment']
    },
    {
      id: '4',
      title: 'TI-84 Plus CE Graphing Calculator',
      description: 'Latest model, perfect condition. Essential for calculus and statistics courses.',
      price: 85.00,
      originalPrice: 150.00,
      category: 'supplies',
      condition: 'Like New',
      seller: {
        name: 'Emma Davis',
        rating: 5.0,
        college: 'Harvard University',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      images: ['https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400'],
      location: 'Cambridge, MA',
      postedDate: '2024-01-14',
      views: 156,
      saves: 45,
      tags: ['Calculator', 'TI-84', 'Math', 'Statistics']
    }
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-50', label: 'Under $50' },
    { id: '50-100', label: '$50 - $100' },
    { id: '100-200', label: '$100 - $200' },
    { id: 'over-200', label: 'Over $200' },
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-50':
          matchesPrice = item.price < 50;
          break;
        case '50-100':
          matchesPrice = item.price >= 50 && item.price <= 100;
          break;
        case '100-200':
          matchesPrice = item.price >= 100 && item.price <= 200;
          break;
        case 'over-200':
          matchesPrice = item.price > 200;
          break;
      }
    }
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <ShoppingBag className="w-8 h-8 mr-3 text-green-500" />
                Study Marketplace
              </h1>
              <p className="text-gray-600 mt-2">Buy and sell textbooks, electronics, and study materials</p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <Plus className="w-5 h-5" />
              <span>List Item</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for textbooks, electronics, supplies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 flex-shrink-0 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              {/* Image */}
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.condition === 'Like New' ? 'bg-green-100 text-green-700' :
                    item.condition === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.condition}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-green-600">${item.price}</span>
                  <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                  </span>
                </div>

                {/* Seller Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{item.seller.name}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{item.seller.rating}</span>
                  </div>
                </div>

                {/* Location and Date */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                    Contact Seller
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{item.views} views</span>
                  <span>{item.saves} saves</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;