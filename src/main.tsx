import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { apolloClient } from './lib/apollo.ts';
import { ApolloProvider } from '@apollo/client';
import { API_URL } from './config/constant.ts';

if(!API_URL){
  throw new Error('API_URL is not defined');
}

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
