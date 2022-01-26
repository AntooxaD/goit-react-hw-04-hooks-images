import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import Searchbar from "./сomponents/Searchbar/Searchbar";
import ImageGallery from "./сomponents/ImageGallery/ImageGallery";
import api from "./service/Api/Api";
import Button from "./сomponents/Button/Button";
import Modal from "./сomponents/Modal/Modal";
import LoaderSpin from "./сomponents/Loader/Loader";

export default class App extends Component {
  state = {
    searchQuery: ``,
    images: [],
    loading: false,
    error: null,
    openModal: false,
    selectedImage: null,
    page: 1,
    fetchLength: "",
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      await this.fetchImg();
    }
  }
  fetchImg = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    api
      .fetchImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          this.setState({ hits: null });
          return toast.error(
            `Не удалось найти картинку по запросу ${searchQuery}`
          );
        }

        this.setState(({ images, page }) => ({
          images: [...images, ...hits],
          page: page,
          fetchLength: hits.length,
        }));
      })
      .catch((error) => this.setState({ error: "Побробуйте снова" }))
      .finally(() => {
        this.setState({ loading: false });
        console.log(this.state.images);
      });
  };
  handleImageClick = (e) => {
    if (!e.target.matches("img")) return;
    e.preventDefault();
    this.setState({
      openModal: true,
      selectedImage: e.target.dataset.source,
    });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  handleLoadMoreBnt = (hits) => {
    this.setState({ page: this.state.page + 1 });
    this.scrolling();
  };

  scrolling = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  handleSubmit = (searchQuery) => {
    this.setState({ searchQuery, images: [], page: 1, error: null });
  };

  render() {
    const { images, error, loading, openModal, selectedImage, fetchLength } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <LoaderSpin />}
        {images.length > 0 && !error && (
          <>
            <ImageGallery openModal={this.handleImageClick} images={images} />

            {images && images.length >= 11 && fetchLength === 12 && (
              <Button onClick={this.handleLoadMoreBnt} />
            )}
          </>
        )}
        {openModal && (
          <Modal onClose={this.closeModal} src={selectedImage}></Modal>
        )}

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
}
