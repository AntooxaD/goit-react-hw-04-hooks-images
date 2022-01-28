import { GalleryItem, GalleryItemImage } from "../Style/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import LoaderSpin from "../Loader/Loader";

function ImageGalleryItem({ tags, webImage, largeImage }) {
  const [load, setLoad] = useState(true);
  const onLoad = () => {
    setLoad(false);
  };
  return (
    <GalleryItem>
      <div style={{ display: load ? "block" : "none" }}>
        <LoaderSpin />
      </div>

      <GalleryItemImage
        src={webImage}
        data-source={largeImage}
        alt={tags}
        onLoad={onLoad}
        style={{ opacity: load ? 0 : 1 }}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
