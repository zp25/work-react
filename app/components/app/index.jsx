import React, {
  lazy,
  Suspense,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import pMinDelay from 'p-min-delay';

import Routes from 'components/routes';
import Helmet from 'components/utils/helmet';
import Portal from 'components/utils/portal';
import Mask from 'components/utils/mask';
import Spinner from 'components/utils/spinner';

import zpWebp from 'images/zp.webp';
import zpJpg from 'images/zp.jpg';

import 'styles/root.scss';
import 'normalize.css/normalize.css';
import style from './style.scss';

import Links from './links';

const Picture = lazy(() => pMinDelay(
  import(/* webpackChunkName: "picture" */ 'components/utils/picture'),
  1000,
));

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

const App = ({
  modal,
  closeModal,
}) => (
  <div className={style.app}>
    <Helmet />

    <Links />

    <div className={cx(style.content, style.container)}>
      <Routes />
    </div>

    <Suspense fallback={<Spinner />}>
      <Picture
        className={style.picture}
        {...picture}
      />
    </Suspense>

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

App.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default App;
