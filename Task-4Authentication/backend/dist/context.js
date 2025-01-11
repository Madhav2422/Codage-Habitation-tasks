"use strict";
//In Apollo Server, the context function is used to provide shared data (like authentication info) to all GraphQL resolvers during each request.
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const auth_1 = require("./middleware/auth");
const context = ({ req }) => {
    const userId = (0, auth_1.authenticate)(req);
    return { userId };
};
exports.context = context;
