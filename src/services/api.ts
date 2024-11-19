import axios from "axios";
import ApiResponse from "../App";

axios.defaults.baseURL = "https://api.unsplash.com";
const CLIENT_ID = "51zLVqzMW1IyaGydfIDPgkvKGcvx2JDVAUCKiVuXH0o";

interface Photo {
  id: string;
  urls: {
    small: string;
  };
  user: {
    name: string;
  };
  description: string | null;
}

export const fetchPhotos = async <T>(
  topic: string,
  currentPage: number
): Promise<T> => {
  try {
    const response = await axios.get<T>(
      `/search/photos?client_id=${CLIENT_ID}&query=${topic}&page=${currentPage}&per_page=12`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Failed to fetch photos. Please try again later.");
  }
};
