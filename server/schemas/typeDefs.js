const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type HiScore {
    _id: ID
    scores: Int
  }

  type Query {
    getScores: HiScore
  }

  type Mutation {
    submitScore(score: Int!): HiScore
  }
`;

module.exports = typeDefs;