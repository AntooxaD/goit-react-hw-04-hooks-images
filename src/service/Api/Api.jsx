import PropTypes from "prop-types";
async function fetchImages(searchQuery, page) {
  const KEY = "24234389-dbdb592ca842ff709e1e6a06c";

  return fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizonta&per_page=12&page=${page}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("No matches found"));
  });
}

const api = {
  fetchImages,
};
fetchImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
export default api;
