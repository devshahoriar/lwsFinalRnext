import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './mongoPromise'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(body) {
        const user = { id: 1, name: 'J Smith', email: body.email }
        return user as any
      },
    }),
  ],
})
