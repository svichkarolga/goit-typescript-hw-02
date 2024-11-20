import React from "react";
import styles from "./ImageCard.module.css";

interface Photo {
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

interface ImageCardProps {
  data: Photo;
  onImageClick: (imageData: {
    imageUrl: string;
    author: string;
    description: string | null;
  }) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ data, onImageClick }) => {
  const handleClick = () => {
    console.log("Full image URL:", data.urls.regular);
    onImageClick({
      imageUrl: data.urls.regular,
      author: data.user.name,
      description: data.alt_description,
    });
  };
  return (
    <div>
      <img
        className={styles.photoCard}
        src={data.urls.small}
        alt={data.alt_description || "No description available"}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />

      <div className={styles.cardUl}>
        <p className={styles.cardInfo}>Likes:{data.likes}</p>
      </div>
    </div>
  );
};

export default ImageCard;
