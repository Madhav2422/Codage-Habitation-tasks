import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user:User!
   
  }

   
  type Query {
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

//Query
//  This is a query that allows fetching the details of the currently authenticated user. It returns a User object. It could be used in the backend to fetch the user's data based on the session or token