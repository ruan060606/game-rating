const graphql = require('graphql');
// const _ = require('lodash');
const Game = require('../models/games');
const Creator = require('../models/creators');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    rating: { type: GraphQLString },
    creator: {
      type: CreatorType,
      resolve(parent, args) {
        return Creator.findById(parent.creatorId);
      },
    },
  }),
});

const CreatorType = new GraphQLObjectType({
  name: 'Creator',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    founded: { type: GraphQLInt },
    Headquarters: { type: GraphQLString },
    game: {
      type: new GraphQLList(GameType),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Game.find({ name: args.name });
      },
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return Game.find({ creatorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    game: {
      type: GameType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Game.findOne({ name: args.name });
      },
    },
    creator: {
      type: CreatorType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Creator.findOne({ name: args.name });
      },
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return Game.find({});
      },
    },
    creators: {
      type: new GraphQLList(CreatorType),
      resolve(parent, args) {
        return Creator.find({});
      },
    },
    genres: {
      type: new GraphQLList(GameType),
      args: { genre: { type: GraphQLString } },
      resolve(parent, args) {
        return Game.find({ genre: args.genre });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addCreator: {
      type: CreatorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        founded: { type: new GraphQLNonNull(GraphQLInt) },
        Headquarters: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingCreator = await Creator.findOne({ name: args.name });
        if (!existingCreator) {
          const creator = new Creator({
            name: args.name,
            founded: args.founded,
            Headquarters: args.Headquarters,
          });
          return creator.save();
        }
      },
    },
    addGame: {
      type: GameType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: new GraphQLNonNull(GraphQLString) },
        creatorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const existingGame = await Game.findOne({ name: args.name });
        if (!existingGame) {
          const game = await new Game({
            name: args.name,
            genre: args.genre,
            rating: args.rating,
            creatorId: args.creatorId,
          });
          return game.save();
        }
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
