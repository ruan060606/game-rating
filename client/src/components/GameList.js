import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGamesQuery } from '../queries/queries';
import GameDetails from './GameDetails';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  displayGames() {
    const { games } = this.props.data;
    if (this.props.data.loading) {
      return (
        <div>Spinner</div>
      );
    }
    return games.map(game => (
      <li>
<a key={game.id} href={game.name}>
        <h1>{game.name}</h1>
      </a>

      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul id="game-list">
          {this.displayGames()}
        </ul>
        <GameDetails gameId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getGamesQuery)(GameList);
