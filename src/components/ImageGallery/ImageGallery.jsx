import React, { Component } from 'react';
import api from '../../service/pixabayApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { List } from './ImageGallery.styled';
import propTypes from 'prop-types';

export default class ImageGallery extends Component {
  static propTypes = {
    search: propTypes.string.isRequired,
    onClickToModal: propTypes.func.isRequired,
  };

  state = {
    status: 'idle',
    error: null,
    images: null,
    nextPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevResp = prevProps.search;
    const nextResp = this.props.search;

    if (prevResp !== nextResp) {
      this.setState({ nextPage: 1, images: null });
      this.fetchImages();
    }

    if (prevResp !== nextResp || this.state.status === 'pending') {
      setTimeout(() => {
        this.scrollToBottom();
      }, 1000);
    }
  }

  onClickButton = () => {
    this.fetchImages();
  };

  fetchImages = () => {
    const nextResp = this.props.search;

    this.setState({ status: 'pending' });
    api(nextResp, this.state.nextPage).then(resp => {
      if (typeof resp !== 'string') {
        this.setState(state => {
          if (state.images === null)
            return { images: resp.hits, status: 'resolved' };
          return {
            images: [...state.images, ...resp.hits],
            status: 'resolved',
          };
        });
        this.setState(state => {
          state.nextPage++;
        });
        return;
      }

      this.setState({ error: resp, status: 'rejected' });
      this.setState({ nextPage: 1, images: null });
    });
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: 999999999,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, error, images } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <List>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  url={webformatURL}
                  tags={tags}
                  onClickToModal={() =>
                    this.props.onClickToModal(largeImageURL)
                  }
                />
              );
            })}
          </List>
          <Button onClickButton={this.onClickButton} />
        </>
      );
    }

    return <></>;
  }
}
