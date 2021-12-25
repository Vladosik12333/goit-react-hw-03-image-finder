import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import propTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    largeImg: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onPressKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressKey);
  }

  onClickOverlay = ({ target, currentTarget }) => {
    if (target === currentTarget) this.props.closeModal(null);
  };

  onPressKey = event => {
    if (event.code === 'Escape') this.props.closeModal(null);
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onClickOverlay}>
        <ModalStyled>
          <img src={this.props.largeImg} alt="big img" />
        </ModalStyled>
      </Overlay>,
      document.querySelector('#root-modal'),
    );
  }
}
