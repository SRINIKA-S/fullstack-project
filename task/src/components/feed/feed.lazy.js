import React, { lazy, Suspense } from 'react';

const LazyFeed = lazy(() => import('./Feed'));

const Feed = props => (
  <Suspense fallback={null}>
    <LazyFeed {...props} />
  </Suspense>
);

export default Feed;
