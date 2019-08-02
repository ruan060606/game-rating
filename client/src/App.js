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
            <div className="container">
              <h1><Link className="header-link" to="/">My Game Rating</Link></h1>
              <Route exact path="/" component={GameList} />
              <Route exact path="/:id" component={Profile} />
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
