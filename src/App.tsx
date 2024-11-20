import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchPhotos } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import { ModalProps, Photo } from "./types";

export interface ApiResponse {
  results: Photo[];
  total_pages: number;
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<Photo | null>(null);

  const handleSearch = async (newTopic: string) => {
    setPhotos([]);
    setPage(1);
    setTopic(newTopic);
  };

  const handleLoadMore = () => {
    console.log(handleLoadMore);
    setPage(page + 1);
  };

  const handleImageClick = (imageData: ModalProps) => {
    setSelectedImageUrl(imageData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }
    async function getPhotos() {
      try {
        setLoading(true);
        setError(false);
        const { results, total_pages }: ApiResponse = await fetchPhotos(
          topic,
          page
        );
        if (page === 1) {
          setTotalPages(total_pages);
        }
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPhotos();
  }, [page, topic]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {photos.length > 0 && (
        <ImageGallery items={photos} onImageClick={handleImageClick} />
      )}
      {loading && <Loader isLoading={loading} />}
      {error && (
        <ErrorMessage
          message={
            "Whoops, something went wrong! Please try reloading this page!"
          }
        />
      )}
      {photos.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid black",
              padding: "16px",
              color: "black",
              background: "aqua",
            },
          }}
          containerStyle={{
            position: "relative",
          }}
        />
        {selectedImageUrl && (
          <ImageModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            imageUrl={selectedImageUrl.imageUrl}
            author={selectedImageUrl.author}
            description={selectedImageUrl.description}
          />
        )}
      </div>
    </div>
  );
}

export default App;
