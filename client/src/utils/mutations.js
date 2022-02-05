import { gql } from '@apollo/client';

export const SUBMIT_SCORE = gql `
  mutation submitScore(
    $score: Number!
  ) {
    submitScore(
      score: $score
    ) {
      _id
      scores
    }
  }
`;