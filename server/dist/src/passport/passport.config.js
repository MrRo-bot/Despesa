import passport from "passport";
import bcrypt from "bcryptjs";
import { GraphQLLocalStrategy } from "graphql-passport";
import User from "../models/user.model.js";
export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("serializing user");
        //@ts-ignore
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing user");
        try {
            const user = await User.findById(id);
            done(null, user);
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    });
};
passport.use(
//@ts-ignore
new GraphQLLocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("Invalid Username");
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new Error("Invalid Password");
        }
        else {
            return done(null, user);
        }
    }
    catch (error) {
        return done(error);
    }
}));
