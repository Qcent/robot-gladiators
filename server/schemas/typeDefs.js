const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type HiScore {
    _id: ID
    robot: String
    trainer: String
    score: Int
    rounds: Int
    points: Int
  }

  type Query {
    getScores: [HiScore]
  }

  type Mutation {
    submitScore(
      robot: String!,
      trainer: String!,
      score: Int!,
      rounds: Int!,
      points: Int!
    ) : HiScore


  }
`;

module.exports = typeDefs;