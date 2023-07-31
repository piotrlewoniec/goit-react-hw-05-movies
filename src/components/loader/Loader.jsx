import PropTypes from 'prop-types';
import css from './Loader.module.css';
import { Audio } from 'react-loader-spinner';
import { RotatingLines } from 'react-loader-spinner';

export const Loader = ({ name }) => {
  if (name === 'Audio') {
    return (
      <div className={css.overlay}>
        <div className={css.screencenter}>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      </div>
    );
  } else if (name === 'RotatingLines') {
    return (
      <div className={css.overlay}>
        <div className={css.screencenter}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      </div>
    );
  }
};

Loader.propTypes = {
  name: PropTypes.string,
};
