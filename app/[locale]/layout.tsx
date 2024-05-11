import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import '../globals.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Header from '@/src/components/shared/Header'
import NavBar from '@/src/components/shared/NavBar'
import Footer from '@/src/components/shared/Footer'
import Copyright from '@/src/components/shared/Copyright'
import { I18nProviderClient } from '@/src/locales/client'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--poppins',
})
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--roboto',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <I18nProviderClient locale={locale}>
          <Header />
          <NavBar />
          {children}
          <Footer />
          <Copyright />
        </I18nProviderClient>
      </body>
    </html>
  )
}
