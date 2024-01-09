import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import prisma from './database'
import type { Adapter } from 'next-auth/adapters'

// Для приведения типов того что вернет PrismaAdapter, потому что без этого ошибка.
const getPrismaAdapter = (): Adapter => PrismaAdapter(prisma) as Adapter

export const authOptions = {
	adapter: getPrismaAdapter(),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET_ID as string,
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
} satisfies NextAuthOptions
