/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGameQuery } from '../queries/queries';


class GameDetails extends Component {
  displayGameDetails() {
    const { game } = this.props.data;
    if (game) {
      return (
        <div>
          <h2>
Name:
            {' '}
            {game.name}
          </h2>
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
          <p>
All Game by
            {' '}
            {game.creator.name}
          </p>
          <ul>
            {
                        game.creator.games.map(item => <li key={item.id}>{item.name}</li>)
                    }
          </ul>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.displayGameDetails()}
      </div>
    );
  }
}

export default graphql(getGameQuery, {
  options: props => ({
    variables: {
      name: props.gameId,
    },
  }),
})(GameDetails);
