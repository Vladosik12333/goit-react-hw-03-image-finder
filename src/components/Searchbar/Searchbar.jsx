import React, { Component } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleInputSearch = ({ target }) => {
    return this.setState({ [target.name]: target.value });
  };

  submitForm = event => {
    event.preventDefault();
    const { search } = this.state;

    if (search.trim() === '') return alert('You do not write anything :(');

    this.props.onSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    return (
      <SearchbarStyled>
        <form onSubmit={this.submitForm}>
          <button type="submit">
            <AiOutlineSearch stroke="black" size={25} />
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={search}
            onChange={this.handleInputSearch}
          />
        </form>
      </SearchbarStyled>
    );
  }
}
