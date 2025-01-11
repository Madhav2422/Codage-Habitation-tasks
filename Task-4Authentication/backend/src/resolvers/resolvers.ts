import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma"

const JWT_SECRET = process.env.JWT_SECRET!;

export const resolvers = {

  // Fetches the currently authenticated user's data.

  Query: {
    me: async (_: any, __: any, { userId }: any) => {
      if (!userId) throw new ApolloError("Not authenticated");
      return await prisma.user.findUnique({ where: { id: userId } });
    },
  },

  Mutation: {

    signup: async (_: any, { name, email, password }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new ApolloError("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new ApolloError("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
      
      return { token, user };
    },
  },
};
