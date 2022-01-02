import Loader from 'react-loader-spinner';
import css from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={css.container}>
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
}
