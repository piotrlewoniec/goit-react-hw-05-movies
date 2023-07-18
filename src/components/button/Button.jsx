import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ label, action, formButton = false, id }) => {
  return formButton === true ? (
    <button className={css.btn} type="submit" onClick={action}>
      {label}
    </button>
  ) : (
    <button className={css.btn} type="button" onClick={action} data-id={id}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  action: PropTypes.func,
  formButton: PropTypes.bool,
  id: PropTypes.string,
};
