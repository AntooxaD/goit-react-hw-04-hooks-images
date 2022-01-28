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
  const [hideBtn, setHideBtn] = useState(false);

  useEffect(() => {
    const fetchImg = async () => {
      if (searchQuery === "") {
        return;
      }
      setLoading(false);

      api
        .fetchImages(searchQuery, page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            setHideBtn(true);
            setImages([]);
            return toast.error(
              `Не удалось найти картинку по запросу ${searchQuery}`
            );
          }

          setImages([...images, ...hits]);
          setPage(page);
          if (hits.length < 12) {
            setHideBtn(true);
          }
          if (hits.length === 12) {
            setHideBtn(false);
          }
        })
        .catch((error) => setError({ error: "Побробуйте снова" }))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const handleImageClick = (e) => {
    if (!e.target.matches("img")) return;
    e.preventDefault();

    setOpenModal(true);
    setSelectedImage(e.target.dataset.source);
  };

  const closeModal = () => {
    setOpenModal(false);
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

  const handleSubmit = (query) => {
    if (query === searchQuery) {
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setError(error);
    setImages([]);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {loading && <LoaderSpin />}
      {images.length > 0 && !error && (
        <>
          <ImageGallery openModal={handleImageClick} images={images} />

          {hideBtn || <Button onClick={handleLoadMoreBnt} />}
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
        theme="colored"
      />
    </div>
  );
}
