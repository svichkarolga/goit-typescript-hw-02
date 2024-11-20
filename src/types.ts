export interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
  };
  description: string;
  alt_description: string;
  likes: number;
}

export interface ModalProps {
  imageUrl: string;
  author: string;
  description: string;
}
