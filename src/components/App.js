import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { AppStyled } from './App.styled.jsx';

export default class App extends Component {
  state = {
    modalNow: null,
    currentSearch: '',
  };

  onSubmit = search => {
    this.setState({ currentSearch: search });
  };

  onModal = url => {
    this.setState({ modalNow: url });
  };

  render() {
    const { modalNow } = this.state;

    return (
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          search={this.state.currentSearch}
          onClickToModal={this.onModal}
        />
        {modalNow && <Modal largeImg={modalNow} closeModal={this.onModal} />}
      </AppStyled>
    );
  }
}
