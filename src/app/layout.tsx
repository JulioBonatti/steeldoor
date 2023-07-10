import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SteelDoor web app',
  description: 'Generated by Julio Bonatti',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-bs-theme="dark" >
      <Head>
        <link rel="shortcut icon" href="/faveicon.ico" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
