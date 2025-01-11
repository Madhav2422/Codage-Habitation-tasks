"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const apollo_server_1 = require("apollo-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const JWT_SECRET = process.env.JWT_SECRET;
exports.resolvers = {
    // Fetches the currently authenticated user's data.
    Query: {
        me: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { userId }) {
            if (!userId)
                throw new apollo_server_1.ApolloError("Not authenticated");
            return yield prisma_1.default.user.findUnique({ where: { id: userId } });
        }),
    },
    Mutation: {
        signup: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name, email, password }) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma_1.default.user.create({
                data: { name, email, password: hashedPassword },
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
            return { token, user };
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            const user = yield prisma_1.default.user.findUnique({ where: { email } });
            if (!user)
                throw new apollo_server_1.ApolloError("Invalid credentials");
            const valid = yield bcrypt_1.default.compare(password, user.password);
            if (!valid)
                throw new apollo_server_1.ApolloError("Invalid credentials");
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
            return { token, user };
        }),
    },
};
