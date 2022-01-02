import React, { Component } from 'react';
import api from '../../service/pixabayApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import { List } from './ImageGallery.styled';
import propTypes from 'prop-types';
import Spinner from 'components/Spinner';

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

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ page: 1, images: [] });
    }

    if (
      (prevSearch !== nextSearch && nextPage === 1) ||
      prevPage !== nextPage
    ) {
      this.setState({
        status: 'pending',
      });
      api(nextSearch, this.state.page)
        .then(resp => {
          this.setState(state => {
            return {
              images: [...state.images, ...resp.hits],
              status: 'resolved',
            };
          });
          this.scrollToBottom();
        })
        .catch(error => {
          this.setState({
            error: error.message,
            status: 'rejected',
            page: 1,
            images: [],
          });
        });
    }
  }

  onClickButton = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, error, images } = this.state;

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    return (
      <>
        {images.length !== 0 && (
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
        )}
        {status === 'pending' && <Spinner />}
        {status === 'resolved' && <Button onClickButton={this.onClickButton} />}
      </>
    );
  }
}
