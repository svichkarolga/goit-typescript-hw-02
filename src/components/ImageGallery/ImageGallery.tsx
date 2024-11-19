import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import Photo from "../../App";

interface ImageGalleryProps {
  items: Photo[];
  onImageClick: () => void;
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
