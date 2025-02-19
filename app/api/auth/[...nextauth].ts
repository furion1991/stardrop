import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { API } from '@/shared/api'

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         try {
//           await API.post('/auth/login', {
//             email: credentials?.email,
//             password: credentials?.password
//           })

//           return {}
//         } catch (e) {
//           console.log(e)
//           return null
//         }
//       }
//     })
//   ]
// })
