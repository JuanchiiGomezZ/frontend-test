import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://sandbox-api-test.samyroad.com/graphql',
  cache: new InMemoryCache(),
});
