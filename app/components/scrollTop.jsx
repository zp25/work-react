/**
 * 回到头部，仅在加载时执行一次
 */

import { memo, useLayoutEffect } from 'react';

export default memo(() => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
});
