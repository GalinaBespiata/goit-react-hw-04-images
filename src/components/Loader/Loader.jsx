import { CirclesWithBar } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';
export function Loader() {
  return (
    <CirclesWithBar
      className={css.loader}
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"
    />
  );
}
