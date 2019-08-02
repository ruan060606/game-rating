import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import GameList from './components/GameList';
import Profile from './components/Profile';

const client = new ApolloClient({
  uri: '/graphql',
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App" id="main">
            <h1>My Game Rating</h1>
            <Route exact path="/" component={GameList} />
            <Route exact path="/:id" component={Profile} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
