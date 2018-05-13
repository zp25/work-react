import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/page.scss';

const Home = (props) => {
  const {
    title,
    countdown,
    setModal,
    closeModal,
  } = props;

  return (
    <div className={style.page}>
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
    </div>
  );
};

Home.propTypes = {
  countdown: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Home;
