import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getGamesQuery } from '../queries/queries';
// import GameDetails from './GameDetails';

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
        <div className="loader" />
      );
    }
    return games.map(game => (
      <div className="sticky">
        <div className="game-list">
          <img src="https://giantbomb1.cbsistatic.com/uploads/scale_small/13/135472/1891758-001bulbasaur.png" alt="alt_image" className="description-image" />
          <div>
            <Link className="game-link" key={game.id} to={game.name}>
              <h2>{game.name}</h2>
            </Link>
            <p>
Genre:
              {' '}
              {game.genre}
            </p>
            <p>
Rating:
              {' '}
              {game.rating}
            </p>
            <p>
Company:
              {' '}
              {game.creator.name}
            </p>
          </div>
        </div>
        <hr />
      </div>
    ));
  }

  render() {
    return (
      <div>

        {this.displayGames()}

        {/* <GameDetails gameId={this.state.selected} /> */}
      </div>
    );
  }
}

export default graphql(getGamesQuery)(GameList);
