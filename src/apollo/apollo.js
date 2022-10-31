import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: "include"
  });
  

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        addTypename: false,
    })
});



export default function APProvider({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}