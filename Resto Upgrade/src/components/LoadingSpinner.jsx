import React from 'react';

const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
