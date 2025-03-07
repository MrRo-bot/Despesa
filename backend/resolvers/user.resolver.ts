import bcrypt from "bcryptjs";
import { users } from "../dummyData/data";
import User from "../models/user.model";
const userResolver = {
  Mutation: {
    signUp: async (_: any, { input }: any, context: any) => {
      const { username, name, password, gender } = input;
      try {
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = User.findOne({ username });
        if (username) {
          throw new Error(`${username} already exists`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfile : girlProfile,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error: any) {
        console.error(`Error signing up: ${error}`);
        throw new Error(error.message || `Internal Server Error`);
      }
    },
    login: async (_: any, { input }: any, context: any) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error: any) {
        console.error(`Error in login: ${error}`);
        throw new Error(error.message || `Internal Server Error`);
      }
    },
    logout: async (_: any, __: any, context: any) => {
      try {
        await context.logout();
        context.req.session.destroy((err: any) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out Successfully!" };
      } catch (error: any) {
        console.error(`Error in logout: ${error}`);
        throw new Error(error.message || `Internal Server Error`);
      }
    },
  },
  Query: {
    authUser: async (_: any, __: any, context: any) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error: any) {
        console.error(`Error in authUser: ${error}`);
        throw new Error(error.message || `Internal Server Error`);
      }
    },
    user: async (_: any, { userId }: any) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error: any) {
        console.error(`Error in user query: ${error}`);
        throw new Error(error.message || `Error getting Error`);
      }
    },
  },
};

export default userResolver;
