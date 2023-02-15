import React, { lazy, Suspense } from 'react';

const LazyForgotpswd = lazy(() => import('./Forgotpswd'));

const Forgotpswd = props => (
  <Suspense fallback={null}>
    <LazyForgotpswd {...props} />
  </Suspense>
);

export default Forgotpswd;
