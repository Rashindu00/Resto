import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { 
  ChefHat, 
  Star, 
  Clock, 
  Truck,
  Heart,
  ShoppingCart,
  Award,
  Users
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomeEnhanced = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2 });
  const [dishesRef, dishesInView] = useInView({ threshold: 0.2 });

  const heroSlides = [
    {
      id: 1,
      title: "Authentic Sri Lankan Cuisine",
      subtitle: "Experience the rich flavors of traditional dishes made with love and authentic spices",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&h=1080&fit=crop",
      cta: "Order Now"
    },
    {
      id: 2,
      title: "Fresh Ingredients Daily",
      subtitle: "Made with love using the finest local ingredients sourced fresh every morning",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop", 
      cta: "View Menu"
    },
    {
      id: 3,
      title: "Fast Delivery Service",
      subtitle: "Hot, delicious meals delivered to your doorstep within 30 minutes",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1920&h=1080&fit=crop",
      cta: "Order Online"
    }
  ];

  const features = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Expert Chefs",
      description: "Our skilled chefs bring authentic flavors to every dish with years of experience"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Service",
      description: "Fast preparation and delivery without compromising quality - 30 min guarantee"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Delivery",
      description: "Free delivery for orders over LKR 2,500 within Colombo district"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "5 Star Rating",
      description: "Highly rated by customers for taste and service - 4.8/5 average rating"
    }
  ];

  const popularDishes = [
    {
      id: 1,
      name: "Chicken Kottu",
      price: "LKR 950",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
      rating: 4.8,
      description: "Spicy stir-fried bread with chicken and vegetables - a Sri Lankan favorite",
      isVegetarian: false,
      isSpicy: true
    },
    {
      id: 2,
      name: "Fried Rice with Devilled Chicken",
      price: "LKR 1200",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      rating: 4.9,
      description: "Aromatic fried rice served with spicy devilled chicken in our special sauce",
      isVegetarian: false,
      isSpicy: true
    },
    {
      id: 3,
      name: "String Hoppers with Curry",
      price: "LKR 800",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
      rating: 4.7,
      description: "Traditional string hoppers with rich curry and coconut sambal",
      isVegetarian: true,
      isSpicy: true
    },
    {
      id: 4,
      name: "Egg Hoppers",
      price: "LKR 200",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      rating: 4.6,
      description: "Crispy bowl-shaped pancakes with egg in the center - perfect for breakfast",
      isVegetarian: true,
      isSpicy: false
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "50+", label: "Dishes Available" },
    { number: "4.8", label: "Average Rating" },
    { number: "30min", label: "Delivery Time" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-4 !h-4'
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
          className="h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full flex items-center justify-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${slide.image}')`
                  }}
                />
                <motion.div 
                  className="relative z-10 text-center text-white max-w-5xl mx-auto px-4"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.h1 
                    className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    className="text-lg md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <Link to="/menu">
                      <motion.button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-orange-500/25"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slide.cta}
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-white !text-2xl !font-bold"></div>
        <div className="swiper-button-next !text-white !text-2xl !font-bold"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-20 z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl p-8 mx-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Why Choose Resto?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We are committed to providing you with the best dining experience in town
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section ref={dishesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={dishesInView ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Popular Dishes
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Taste the authentic flavors of Sri Lankan cuisine crafted by our expert chefs
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={dishesInView ? "visible" : "hidden"}
          >
            {popularDishes.map((dish) => (
              <motion.div
                key={dish.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {dish.isVegetarian && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Vegetarian
                      </span>
                    )}
                    {dish.isSpicy && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        🌶️ Spicy
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button 
                      className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-300 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </motion.button>
                    <motion.button 
                      className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-300 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-orange-500" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {dish.name}
                    </h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-700 ml-1 font-medium">
                        {dish.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {dish.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-500">
                      {dish.price}
                    </span>
                    <motion.button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 shadow-lg hover:shadow-orange-500/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
            initial="hidden"
            animate={dishesInView ? "visible" : "hidden"}
          >
            <Link to="/menu">
              <motion.button
                className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Menu
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-orange-500/30',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-orange-500'
            }}
            className="pb-12"
          >
            {[
              {
                name: "Amara Perera",
                role: "Food Enthusiast",
                comment: "Best Sri Lankan food I've had outside of my grandmother's kitchen! The flavors are authentic and the service is exceptional.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Kasun Silva",
                role: "Regular Customer",
                comment: "I order from Resto at least twice a week. The quality is consistent and the delivery is always on time. Highly recommended!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Nimali Fernando",
                role: "Local Resident",
                comment: "The egg hoppers here are incredible! Perfect for breakfast or any time of day. The staff is also very friendly.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Order?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the authentic taste of Sri Lankan cuisine delivered fresh to your door in just 30 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <motion.button
                  className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Online
                </motion.button>
              </Link>
              <Link to="/menu">
                <motion.button
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Menu
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeEnhanced;
