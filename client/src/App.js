import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';

import { StoreProvider } from "./utils/GlobalState";

import Game from './components/Game';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
         <StoreProvider>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route component={NoMatch} />
          </Switch>
         </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;