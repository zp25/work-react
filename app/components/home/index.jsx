import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/utils/button';

import style from './style.scss';

const Home = ({
  env,
  openModal,
}) => (
  <div className={style.home}>
    <p className={style.text}>
      {env}
    </p>

    <Button
      type="button"
      onClick={openModal}
    >
      {'Modal'}
    </Button>
  </div>
);

Home.propTypes = {
  env: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Home;
