import { gql } from 'apollo-boost';

const getGamesQuery = gql`
    {
        games{
            id
            name
            genre
            rating
            creator{
                name
            }
        }
    }
`;
const getGameQuery = gql`
    query($name: String) {
        game(name: $name) {
            name
            genre
            rating
            creator{
                name
                games{
                    name
                }
            }
        }
    }
`;

export { getGamesQuery, getGameQuery };
