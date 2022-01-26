import { GalleryItem, GalleryItemImage } from "../Style/styled";
import PropTypes from "prop-types";

function ImageGalleryItem({ tags, webImage, largeImage }) {
  return (
    <GalleryItem>
      <GalleryItemImage src={webImage} data-source={largeImage} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
