import { useState } from 'react';
import { getImageUrl } from '../content/contentLoader';

const DynamicImage = ({ 
  src, 
  alt, 
  caption, 
  className = '', 
  containerClassName = '',
  showCaption = true 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const imageUrl = getImageUrl(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!imageUrl) {
    return null;
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse rounded-lg" />
      )}
      
      {hasError ? (
        <div className="flex items-center justify-center bg-neutral-100 rounded-lg p-8 text-neutral-400">
          <svg 
            className="w-12 h-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={alt || ''}
          className={`w-full h-full object-cover rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
      
      {caption && showCaption && !hasError && (
        <p className="mt-2 text-sm text-neutral-600 italic">{caption}</p>
      )}
    </div>
  );
};

export default DynamicImage;
