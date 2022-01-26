import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Searchbar from "./сomponents/Searchbar/Searchbar";
import ImageGallery from "./сomponents/ImageGallery/ImageGallery";
import api from "./service/Api/Api";
import Button from "./сomponents/Button/Button";
import Modal from "./сomponents/Modal/Modal";
import LoaderSpin from "./сomponents/Loader/Loader";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [fetchLength, setFetchImages] = useState("");

  useEffect(() => {
    if (setSearchQuery(searchQuery) || setPage(page)) {
      fetchImg();
    }
  }, [searchQuery]);

  const fetchImg = async () => {
    const { searchQuery, page } = this.state;
    setLoading(!loading);
    api
      .fetchImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          setImages(null);
          return toast.error(
            `Не удалось найти картинку по запросу ${searchQuery}`
          );
        }

        setImages([...images, ...hits]);
        setPage(page);
        setFetchImages(hits.length);
      })
      .catch((error) => setError({ error: "Побробуйте снова" }))
      .finally(() => {
        setLoading(true);
      });
  };

  const handleImageClick = (e) => {
    if (!e.target.matches("img")) return;
    e.preventDefault();

    setOpenModal(true);
    setSelectedImage(e.target.dataset.source);
  };

  const closeModal = () => {
    setOpenModal(openModal);
  };

  const handleLoadMoreBnt = () => {
    setPage(page + 1);
    scrolling();
  };

  const scrolling = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  const handleSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(error);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {loading && <LoaderSpin />}
      {images.length > 0 && !error && (
        <>
          <ImageGallery openModal={handleImageClick} images={images} />

          {images && images.length >= 11 && fetchLength === 12 && (
            <Button onClick={handleLoadMoreBnt} />
          )}
        </>
      )}
      {openModal && <Modal onClose={closeModal} src={selectedImage}></Modal>}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
