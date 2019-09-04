/**
 * 回到头部，仅在加载时执行一次，不需要smooth效果
 */

import { memo, useLayoutEffect } from 'react';

export default memo(() => {
  useLayoutEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'auto',
    });
  }, []);

  return null;
});
