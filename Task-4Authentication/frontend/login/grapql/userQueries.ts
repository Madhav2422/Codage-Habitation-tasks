// /graphql/userQueries.ts
import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query GetUserData {
    me {
      id
      name
      email
    }
  }
`;
