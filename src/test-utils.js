import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const customRender = (ui, options) => {
  const history = createMemoryHistory();

  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...options }), history };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
