import { gql } from '@apollo/client';

export const QUERY_SCORES = gql `
  {
    HiScore {
      _id
      scores
    }
  }
`;