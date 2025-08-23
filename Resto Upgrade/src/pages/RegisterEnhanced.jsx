import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin,
  ChefHat,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const RegisterEnhanced = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      // Remove confirmPassword from data before sending to API
      const { confirmPassword, acceptTerms, ...registrationData } = data;
      
      await registerUser(registrationData);
      
      toast.success('🎉 Account created successfully! Welcome to Resto!', {
        duration: 4000,
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.', {
        duration: 4000,
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['name', 'email', 'phone', 'address']);
      if (isValid) {
        setCurrentStep(2);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    icon: Icon, 
    placeholder, 
    validation, 
    showPasswordToggle = false,
    description = null
  }) => (
    <motion.div variants={itemVariants} className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-gray-800 flex items-center space-x-2">
          <div className="p-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-md">
            <Icon className="h-4 w-4 text-orange-600" />
          </div>
          <span>{label}</span>
          {validation?.required && <span className="text-red-500 text-lg animate-pulse">*</span>}
        </label>
        {watch(name) && !errors[name] && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-green-500"
          >
            <CheckCircle className="h-5 w-5" />
          </motion.div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 italic">{description}</p>
      )}
      
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-all duration-300" />
        </div>
        <input
          {...register(name, validation)}
          type={showPasswordToggle ? 
            (name === 'password' ? (showPassword ? 'text' : 'password') : 
             name === 'confirmPassword' ? (showConfirmPassword ? 'text' : 'password') : type) 
            : type}
          className={`block w-full pl-12 pr-12 py-4 text-lg border-2 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 transform hover:scale-[1.02] ${
            errors[name] 
              ? 'border-red-400 bg-red-50 shadow-red-200' 
              : watch(name) 
                ? 'border-green-400 bg-green-50 shadow-green-200'
                : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg'
          } group-hover:shadow-xl`}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(name, e.target.value);
            if (errors[name]) {
              clearErrors(name);
            }
          }}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-orange-50 rounded-r-2xl transition-all duration-200 z-10"
            onClick={() => {
              if (name === 'password') {
                setShowPassword(!showPassword);
              } else {
                setShowConfirmPassword(!showConfirmPassword);
              }
            }}
          >
            {(name === 'password' ? showPassword : showConfirmPassword) ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-orange-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-orange-600" />
            )}
          </button>
        )}
        
        {/* Success indicator */}
        {!errors[name] && watch(name) && !showPasswordToggle && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <CheckCircle className="h-5 w-5 text-green-500" />
          </motion.div>
        )}
        
        {/* Input border glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
          watch(name) && !errors[name] 
            ? 'shadow-lg shadow-green-200' 
            : errors[name] 
              ? 'shadow-lg shadow-red-200'
              : 'group-hover:shadow-lg group-hover:shadow-orange-200'
        }`} />
      </div>
      
      <AnimatePresence>
        {errors[name] && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200 shadow-sm"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 animate-pulse" />
            <span className="font-medium">{errors[name].message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-red-300 to-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative max-w-4xl w-full space-y-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <motion.div 
            className="mx-auto h-24 w-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-2xl relative"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <ChefHat className="h-12 w-12 text-white drop-shadow-lg" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-400 opacity-50 animate-ping"></div>
          </motion.div>
          <motion.h2 
            className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join Resto Family
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-2xl max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create your account to start ordering delicious Sri Lankan food
          </motion.p>
          
          {/* Step Indicator */}
          <motion.div 
            className="flex justify-center space-x-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </motion.div>
                {step < 2 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-8 mt-4 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className={currentStep >= 1 ? 'text-orange-600' : 'text-gray-500'}>Personal Info</span>
            <span className={currentStep >= 2 ? 'text-orange-600' : 'text-gray-500'}>Security & Terms</span>
          </motion.div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden"
        >
          {/* Form decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 to-red-50/70 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
          
          <div className="relative z-10 p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={currentStep}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={currentStep}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center">
                        <User className="h-8 w-8 mr-3 text-orange-500" />
                        Personal Information
                      </h3>
                      <p className="text-gray-600 text-lg">Tell us about yourself to get started</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Full Name */}
                      <InputField
                        label="Full Name"
                        name="name"
                        icon={User}
                        placeholder="Enter your full name"
                        description="This will be used for your orders and delivery"
                        validation={{
                          required: 'Full name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        }}
                      />

                      {/* Email */}
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={Mail}
                        placeholder="Enter your email address"
                        description="We'll send order confirmations to this email"
                        validation={{
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                          }
                        }}
                      />

                      {/* Phone Number */}
                      <InputField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        icon={Phone}
                        placeholder="Enter your phone number"
                        description="For delivery coordination and updates"
                        validation={{
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Please enter a valid 10-digit phone number'
                          }
                        }}
                      />

                      {/* Address */}
                      <InputField
                        label="Delivery Address"
                        name="address"
                        icon={MapPin}
                        placeholder="Enter your delivery address"
                        description="Where should we deliver your delicious food?"
                        validation={{
                          required: 'Address is required',
                          minLength: {
                            value: 10,
                            message: 'Please provide a complete address'
                          }
                        }}
                      />
                    </div>

                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Continue to Security</span>
                      <ArrowRight className="h-6 w-6" />
                    </motion.button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={currentStep}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center">
                        <Shield className="h-8 w-8 mr-3 text-orange-500" />
                        Security & Terms
                      </h3>
                      <p className="text-gray-600 text-lg">Secure your account and accept our terms</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Password */}
                      <InputField
                        label="Password"
                        name="password"
                        icon={Lock}
                        placeholder="Create a strong password"
                        description="Minimum 6 characters with uppercase, lowercase, and number"
                        showPasswordToggle={true}
                        validation={{
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: 'Password must contain uppercase, lowercase, and number'
                          }
                        }}
                      />

                      {/* Confirm Password */}
                      <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        icon={Lock}
                        placeholder="Confirm your password"
                        description="Re-enter your password to confirm"
                        showPasswordToggle={true}
                        validation={{
                          required: 'Please confirm your password',
                          validate: value =>
                            value === password || 'Passwords do not match'
                        }}
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <motion.div 
                      variants={itemVariants} 
                      className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative mt-1">
                          <input
                            {...register('acceptTerms', {
                              required: 'You must accept the terms and conditions'
                            })}
                            type="checkbox"
                            className="h-6 w-6 text-orange-600 focus:ring-orange-500 border-2 border-gray-300 rounded-md transition-all duration-200 hover:border-orange-400"
                          />
                          {watch('acceptTerms') && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="h-3 w-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <label className="text-gray-900 leading-relaxed flex-1">
                          <span className="font-bold text-lg">I agree to the</span>{' '}
                          <Link to="/terms" className="text-orange-600 hover:text-orange-500 font-bold underline decoration-2 underline-offset-2 hover:decoration-orange-300 transition-all duration-200">
                            Terms and Conditions
                          </Link>{' '}
                          <span className="font-bold">and</span>{' '}
                          <Link to="/privacy" className="text-orange-600 hover:text-orange-500 font-bold underline decoration-2 underline-offset-2 hover:decoration-orange-300 transition-all duration-200">
                            Privacy Policy
                          </Link>
                          <span className="block mt-3 text-sm text-gray-600 bg-white p-3 rounded-lg border border-orange-100">
                            🔒 <strong>Your privacy matters:</strong> We'll use your information only to provide restaurant services and ensure the best dining experience. Your data is secure with us.
                          </span>
                        </label>
                      </div>
                    </motion.div>
                    
                    {errors.acceptTerms && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium">{errors.acceptTerms.message}</span>
                      </motion.div>
                    )}

                    <div className="flex space-x-4">
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 text-gray-700 py-4 px-8 rounded-2xl font-bold text-xl hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3"
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      >
                        {isLoading ? (
                          <>
                            <Loader className="h-6 w-6 animate-spin" />
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-6 w-6" />
                            <span>Create My Account</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Login Link */}
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border border-orange-200">
                <p className="text-gray-700 text-lg">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text hover:from-orange-700 hover:to-red-700 transition-all duration-200 underline decoration-2 underline-offset-4 hover:decoration-orange-400"
                  >
                    Sign in here
                  </Link>
                </p>
                <motion.div 
                  className="mt-3 flex justify-center"
                  animate={{ 
                    x: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <span className="text-2xl">👆</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center border border-white/30 hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Zap className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Fast Delivery</h3>
            <p className="text-gray-600 leading-relaxed">Get your food delivered within 30 minutes with our lightning-fast service</p>
            <motion.div 
              className="mt-4 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1 }}
            />
          </motion.div>
          
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center border border-white/30 hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Fresh Food</h3>
            <p className="text-gray-600 leading-relaxed">Made with fresh, locally sourced ingredients for authentic Sri Lankan taste</p>
            <motion.div 
              className="mt-4 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center border border-white/30 hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl"
              animate={{ 
                rotateY: [0, 180, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Secure Payments</h3>
            <p className="text-gray-600 leading-relaxed">Your data and payments are 100% secure with advanced encryption</p>
            <motion.div 
              className="mt-4 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "90%" }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterEnhanced;
