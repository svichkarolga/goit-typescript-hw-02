import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
  };
  description: string | null;
  alt_description: string | null;
  likes: number;
}

interface ImageGalleryProps {
  items: Photo[];
  onImageClick: (imageData: {
    imageUrl: string;
    author: string;
    description: string | null;
  }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {items.map((item) => (
        <li className={styles.galleryCard} key={item.id}>
          <ImageCard data={item} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
