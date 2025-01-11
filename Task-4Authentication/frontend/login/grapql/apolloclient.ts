// client.ts
import { ApolloClient, InMemoryCache, createHttpLink,ApolloLink } from "@apollo/client";


const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");  // Retrieve token from localStorage
  if (token) {
    // Set the Authorization header if token is found
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,  // Attach the token to each request
      },
    });
  }
  return forward(operation);  // Send the request to the next link
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/", // Your backend GraphQL URL
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
