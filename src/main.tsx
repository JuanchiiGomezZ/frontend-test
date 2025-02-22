import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { apolloClient } from './lib/apollo.ts';
import { ApolloProvider } from '@apollo/client';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
