import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  ShoppingCart, 
  Plus, 
  Minus,
  X,
  Clock,
  Flame
} from 'lucide-react';
import toast from 'react-hot-toast';

const MenuEnhanced = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample menu data - replace with API call
  const sampleMenuItems = [
    {
      id: 1,
      name: "Chicken Kottu",
      description: "Spicy stir-fried bread with chicken, vegetables, and aromatic spices",
      price: 950,
      category: "Rice & Noodles",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
      rating: 4.8,
      prepTime: "15-20 min",
      isVegetarian: false,
      isSpicy: true,
      ingredients: ["Chicken", "Roti", "Vegetables", "Spices", "Egg"],
      calories: 650,
      isPopular: true
    },
    {
      id: 2,
      name: "Fried Rice with Devilled Chicken",
      description: "Aromatic fried rice served with spicy devilled chicken in our special sauce",
      price: 1200,
      category: "Rice & Noodles",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      rating: 4.9,
      prepTime: "20-25 min",
      isVegetarian: false,
      isSpicy: true,
      ingredients: ["Rice", "Chicken", "Vegetables", "Soy Sauce", "Spices"],
      calories: 720,
      isPopular: true
    },
    {
      id: 3,
      name: "String Hoppers with Curry",
      description: "Traditional string hoppers with rich curry and coconut sambal",
      price: 800,
      category: "Traditional",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
      rating: 4.7,
      prepTime: "10-15 min",
      isVegetarian: true,
      isSpicy: true,
      ingredients: ["String Hoppers", "Curry", "Coconut", "Spices"],
      calories: 450,
      isPopular: false
    },
    {
      id: 4,
      name: "Egg Hoppers",
      description: "Crispy bowl-shaped pancakes with egg in the center - perfect for breakfast",
      price: 200,
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      rating: 4.6,
      prepTime: "5-10 min",
      isVegetarian: true,
      isSpicy: false,
      ingredients: ["Rice Flour", "Coconut Milk", "Egg"],
      calories: 320,
      isPopular: true
    },
    {
      id: 5,
      name: "Vegetable Rotti",
      description: "Mixed vegetable rotti with chili and coconut filling",
      price: 650,
      category: "Traditional",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.5,
      prepTime: "15-20 min",
      isVegetarian: true,
      isSpicy: true,
      ingredients: ["Flour", "Vegetables", "Coconut", "Chili"],
      calories: 480,
      isPopular: false
    },
    {
      id: 6,
      name: "Milk Rice with Chili Paste",
      description: "Creamy milk rice served with spicy chili paste and accompaniments",
      price: 700,
      category: "Traditional",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
      rating: 4.4,
      prepTime: "10-15 min",
      isVegetarian: true,
      isSpicy: true,
      ingredients: ["Rice", "Coconut Milk", "Chili Paste"],
      calories: 550,
      isPopular: false
    },
    {
      id: 7,
      name: "Chocolate Cherry Slice",
      description: "Rich chocolate cake with cherry filling and cream",
      price: 450,
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      rating: 4.7,
      prepTime: "5 min",
      isVegetarian: true,
      isSpicy: false,
      ingredients: ["Chocolate", "Cherry", "Cream", "Flour"],
      calories: 380,
      isPopular: true
    },
    {
      id: 8,
      name: "Fresh Fruit Juice",
      description: "Freshly squeezed seasonal fruit juice",
      price: 300,
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop",
      rating: 4.3,
      prepTime: "3-5 min",
      isVegetarian: true,
      isSpicy: false,
      ingredients: ["Fresh Fruits", "Water", "Sugar (optional)"],
      calories: 120,
      isPopular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: sampleMenuItems.length },
    { id: 'Rice & Noodles', name: 'Rice & Noodles', count: sampleMenuItems.filter(item => item.category === 'Rice & Noodles').length },
    { id: 'Traditional', name: 'Traditional', count: sampleMenuItems.filter(item => item.category === 'Traditional').length },
    { id: 'Breakfast', name: 'Breakfast', count: sampleMenuItems.filter(item => item.category === 'Breakfast').length },
    { id: 'Desserts', name: 'Desserts', count: sampleMenuItems.filter(item => item.category === 'Desserts').length },
    { id: 'Beverages', name: 'Beverages', count: sampleMenuItems.filter(item => item.category === 'Beverages').length }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMenuItems(sampleMenuItems);
      setFilteredItems(sampleMenuItems);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchTerm, selectedCategory, priceRange, sortBy, menuItems]);

  const filterItems = () => {
    let filtered = [...menuItems];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.isPopular - a.isPopular;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredItems(filtered);
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
      toast.success('Removed from favorites');
    } else {
      setFavorites([...favorites, itemId]);
      toast.success('Added to favorites');
    }
  };

  const getCartItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover authentic Sri Lankan flavors crafted with love and tradition
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for dishes, ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: LKR {priceRange[0]} - LKR {priceRange[1]}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quick Filters
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors">
                        Vegetarian
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors">
                        Spicy
                      </button>
                      <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors">
                        Popular
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <motion.div
            className="lg:w-64"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Menu Items */}
          <div className="flex-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    layout
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {item.isPopular && (
                          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Popular
                          </span>
                        )}
                        {item.isVegetarian && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Vegetarian
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            Spicy
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <Heart 
                          className={`w-5 h-5 transition-colors duration-300 ${
                            favorites.includes(item.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600 hover:text-red-500'
                          }`} 
                        />
                      </button>
                    </div>

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full ml-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-700 ml-1 font-medium">
                            {item.rating}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Details */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.prepTime}
                        </div>
                        <div>{item.calories} cal</div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-500">
                          LKR {item.price}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {getCartItemQuantity(item.id) > 0 ? (
                            <div className="flex items-center gap-2 bg-orange-100 rounded-full px-3 py-1">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-orange-500 hover:text-orange-600 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-orange-600 font-medium min-w-[20px] text-center">
                                {getCartItemQuantity(item.id)}
                              </span>
                              <button
                                onClick={() => addToCart(item)}
                                className="text-orange-500 hover:text-orange-600 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <motion.button
                              onClick={() => addToCart(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {filteredItems.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No dishes found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-4 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-orange-500" />
              <div>
                <div className="font-bold text-gray-800">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
                <div className="text-orange-500 font-bold">
                  LKR {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300">
                View Cart
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuEnhanced;
