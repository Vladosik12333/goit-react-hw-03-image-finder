import { Item } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';

export default function ImageGalleryItem({
  url,
  tags,
  largeImageURL,
  onClickToModal,
}) {
  return (
    <Item>
      <img src={url} alt={tags} onClick={() => onClickToModal(largeImageURL)} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  url: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  onClickToModal: propTypes.func.isRequired,
};
