import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import style from 'styles/content.scss';

const Home = (props) => {
  const {
    title,
    countdown,
    setModal,
    closeModal,
  } = props;

  return (
    <Fragment>
      <p className={style.text}>{`${title}: ${countdown}`}</p>
      <button
        type="button"
        className={style.btn}
        onClick={() => {
          setModal();

          setTimeout(() => {
            closeModal();
          }, 1500);
        }}
      >
        Loading
      </button>
    </Fragment>
  );
};

Home.propTypes = {
  countdown: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Home;
