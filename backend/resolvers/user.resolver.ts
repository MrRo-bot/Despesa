import { users } from "../dummyData/data";
const userResolver = {
  Query: {
    users: () => users,
    user: (_: any, { userId }: any) =>
      users.find((user) => user._id === userId),
  },
  Mutation: {},
};

export default userResolver;
