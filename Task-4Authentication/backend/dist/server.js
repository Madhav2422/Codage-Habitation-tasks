"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const index_1 = require("./schema/index");
const resolvers_1 = require("./resolvers/resolvers");
const context_1 = require("./context");
const server = new apollo_server_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: context_1.context,
    // Adding CORS middleware
    cors: {
        origin: ["http://localhost:3000", "https://your-frontend-domain.com"], // List your allowed origins here
        methods: ["GET", "POST", "OPTIONS"], // Define allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Define allowed headers
        credentials: true, // Allow cookies to be sent if necessary
    },
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
