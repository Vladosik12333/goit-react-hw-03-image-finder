import Spinner from 'react-loader-spinner';
import { Container } from './Lodaer.styled';

export default function Loader(props) {
  return (
    <Container>
      <Spinner type="Puff" color="#00BFFF" height={100} width={100} />
    </Container>
  );
}
