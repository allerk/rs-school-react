import { Page } from './components/Page.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
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
