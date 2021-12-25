import { ButtonStyled } from './Button.styled';
import propTypes from 'prop-types';

export default function Button({ onClickButton }) {
  return (
    <ButtonStyled type="button" onClick={onClickButton}>
      Load more
    </ButtonStyled>
  );
}

Button.propTypes = {
  onClickButton: propTypes.func.isRequired,
};
