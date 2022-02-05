const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type HiScore {
    _id: ID
    scores: Number
  }

  type Query {
    getScores: HiScore
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    submitScore(score: Number!): HiScore
  }
`;

module.exports = typeDefs;