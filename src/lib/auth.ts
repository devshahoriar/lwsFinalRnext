import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Facebook from 'next-auth/providers/facebook'
import Google from 'next-auth/providers/google'
import dbConnect from '../db/dbConnect'
import user_model from '../models/user_model'
import clientPromise from './mongoPromise'

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
  jwt: {
    async encode({ secret, token }) {
      const alg = 'HS256'
      const jwt = await new jose.SignJWT(token)
        .setProtectedHeader({ alg })
        .sign(new TextEncoder().encode(secret as any))

      return jwt
    },
    async decode({ secret, token }) {
      try {
        const { payload } = await jose.jwtVerify(
          token as any,
          new TextEncoder().encode(secret as any)
        )
        return payload
      } catch (error) {
        return null
      }
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
