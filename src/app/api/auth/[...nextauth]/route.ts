import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const {
	handlers: { GET, POST }
} = NextAuth(async (req) => {
	console.log(req); // do something with the request
	return {
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID!,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			}),
		],
	};
});
