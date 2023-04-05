const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type User {
    id: ID
    name: String!
    email: String!
    password: String
    token: String!
    createdAt: String
  }


  input UserInputLogin {
    email: String!
    password: String!
  }
  
  type UserRegister {
    id: ID
    name: String!
    email: String!
    createdAt: String
  }
  
  
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  
   type TokenResponse {
    status: String!
    access_token: String!
  }
  
  
  #message
  input Message {
    receiver: String
    title: String!
    body: String!
  }
  
  type MessageResponse {
    status: String!
    id: String!
  }
  
  type MessageResponseList {
    seen: Boolean!
    body: String!
    title: String!
    id: String!
  }

  type Query {
    users:[User!]
    messagesList(email: String!):[MessageResponseList!]
  }

  type Mutation {
    register(input:UserInput): UserRegister
    login(input:UserInputLogin): TokenResponse!
    
    
    sendMessage(input:Message): MessageResponse!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)