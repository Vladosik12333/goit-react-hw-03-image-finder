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
    images: [],
    page: 1,
  };

  componentDidUpdate(prevProps) {
    const prevResp = prevProps.search;
    const nextResp = this.props.search;

    if (prevResp !== nextResp) {
      this.setState({ page: 1, images: [] });
      this.fetchImages(1);
    }
  }

  onClickButton = () => {
    this.fetchImages(this.state.page);
  };

  fetchImages = page => {
    const nextResp = this.props.search;
    this.setState({ status: 'pending' });
    api(nextResp, page ?? this.state.page).then(resp => {
      if (typeof resp !== 'string') {
        this.setState(state => {
          return {
            images: [...state.images, ...resp.hits],
            status: 'resolved',
            page: state.page + 1,
          };
        });
        this.scrollToBottom();
        return;
      }

      this.setState({
        error: resp,
        status: 'rejected',
        page: 1,
        images: [],
      });
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
                  onClickToModal={this.props.onClickToModal}
                  largeImageURL={largeImageURL}
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
