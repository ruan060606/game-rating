import React from 'react';
import { graphql } from 'react-apollo';
import { getGameQuery } from '../queries/queries';

class Profile extends React.Component {
  displayGame() {
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
All other games I played by
            {' '}
            {game.creator.name}
          </p>
          <ul>
            {
                        game.creator.games.map((item, i) => (
                          <li key={i}>
                            {' '}
                            <a key={item.id} href={item.name}>{item.name}</a>
                          </li>
                        ))
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
        {this.displayGame()}
      </div>
    );
  }
}

export default graphql(getGameQuery, {
  options: props => ({
    variables: {
      name: props.match.params.id,
    },
  }),
})(Profile);
