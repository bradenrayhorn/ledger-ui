import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { QueryClientProvider, QueryClient } from 'react-query';

const customRender = (ui, options) => {
  const history = createMemoryHistory();
  const queryClient = new QueryClient();

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Router history={history}>{children}</Router>
      </QueryClientProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...options }), history };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
