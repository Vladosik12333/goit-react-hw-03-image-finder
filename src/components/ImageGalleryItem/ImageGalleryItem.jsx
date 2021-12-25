import { Item } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';

export default function ImageGalleryItem({ url, tags, onClickToModal }) {
  return (
    <Item>
      <img src={url} alt={tags} onClick={onClickToModal} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  url: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  onClickToModal: propTypes.func.isRequired,
};
