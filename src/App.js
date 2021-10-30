import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import TodoList from "./Components/TodoList";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <TodoList/>
    </ApolloProvider>
  );
}

export default App;
