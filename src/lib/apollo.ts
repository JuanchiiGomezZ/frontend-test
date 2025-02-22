import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        images: {
          keyArgs: ['title'], // ahora el cache se separa por título de búsqueda
          merge(existing, incoming) {
            if (!existing) return incoming;

            return {
              ...incoming,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  uri: 'https://sandbox-api-test.samyroad.com/graphql',
  cache,
});
