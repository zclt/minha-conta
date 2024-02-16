import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { queryMinhaConta } from './queryMinhaConta';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryMinhaConta}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
