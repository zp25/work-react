import React from 'react';
import PropTypes from 'prop-types';

import Helmet from '@/components/helmet';
import Button from '@/components/button';
import Mask from '@/components/mask';
import Portal from '@/components/portal';
import Picture from '@/components/picture';
import ErrorBoundary from '@/components/errorBoundary';

import zpWebp from '@/images/zp.webp';
import zpJpg from '@/images/zp.jpg';

import style from './style.module.scss';

const picture = {
  srcSet: {
    src: zpWebp,
    type: 'image/webp',
  },
  fallback: [
    {
      id: 1,
      src: zpJpg,
      alt: 'zp',
    },
  ],
};

/**
 * 加载图片失败替代组建
 */
const ErrorLoadPicture = ({ children }) => <p>{children}</p>;

ErrorLoadPicture.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

const Home = ({
  modal,
  errorLoadPicture,
  setErrorLoadPicture,
  openModal,
  closeModal,
}) => (
  <div className={style.home}>
    <Helmet>
      <title>首页</title>
    </Helmet>

    <Button
      type="button"
      onClick={openModal}
    >
      {'Modal'}
    </Button>

    <ErrorBoundary
      error={errorLoadPicture}
      onError={setErrorLoadPicture}
      render={({ message }) => (
        <ErrorLoadPicture>{message}</ErrorLoadPicture>
      )}
    >
      <Picture
        className={style.picture}
        {...picture}
      />
    </ErrorBoundary>

    {
      modal && (
        <Portal>
          <Mask onClick={closeModal}>
            <p className={style.modal}>点击任意位置关闭</p>
          </Mask>
        </Portal>
      )
    }
  </div>
);

Home.defaultProps = {
  errorLoadPicture: null,
};

Home.propTypes = {
  modal: PropTypes.bool.isRequired,
  errorLoadPicture: PropTypes.instanceOf(Error),
  setErrorLoadPicture: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Home;
