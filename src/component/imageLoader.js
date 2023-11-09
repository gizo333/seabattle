import React, { useState, useEffect } from 'react';

function ImageLoader({ imageUrl, alt, className }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
          setImageSrc(objectURL);
        } else {
          console.error('Ошибка при получении изображения');
        }
      } catch (error) {
        console.error('Ошибка при получении изображения:', error);
      }
    };

    loadImage();
  }, [imageUrl]);

  return <img src={imageSrc} alt={alt} className={className} />;
}

export default ImageLoader;
