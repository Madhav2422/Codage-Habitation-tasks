//In Apollo Server, the context function is used to provide shared data (like authentication info) to all GraphQL resolvers during each request.

import { authenticate } from "./middleware/auth";

export  const context = ({ req }: any) => {
  const userId = authenticate(req);
  return { userId };
};
