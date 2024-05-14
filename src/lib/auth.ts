import NextAuth, { DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './mongoPromise'
import Credentials from 'next-auth/providers/credentials'
import user_model from '../models/user_model'
import dbConnect from '../db/dbConnect'
import bcrypt from 'bcrypt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
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
        const { email, password, remember } = body as any
        await dbConnect()
        const user = await user_model.findOne({
          email,
        })
        if (!user) {
          return null
        }
        const matchPass = bcrypt.compareSync(password, user.password)
        if (matchPass) {
          return { id: user._id, name: user.name, email: user.email }
        }
        return null
      },
    }),
  ],
})
