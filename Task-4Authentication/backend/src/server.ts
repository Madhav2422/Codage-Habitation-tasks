import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/index";
import { resolvers } from "./resolvers/resolvers";
import { context } from "./context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
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
