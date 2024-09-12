import { Page } from './task1/Page.tsx';
import { ErrorBoundary } from './task1/ErrorBoundary.tsx';
import { ReactNode } from 'react';

function App(): ReactNode {
  return (
    <main role="main">
      <ErrorBoundary>
        <Page></Page>
      </ErrorBoundary>
    </main>
  );
}

export default App;
