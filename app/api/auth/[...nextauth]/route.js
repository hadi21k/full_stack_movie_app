import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        connectToDB();

        const user = await User.findOne({ email: session.user.email });

        session.user.id = user._id.toString();

        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          await User.create({
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            email: profile.email,
            image: profile.image,
            collections: [],
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
