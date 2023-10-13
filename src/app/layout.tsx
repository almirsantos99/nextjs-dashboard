import './globals.scss'
import { Roboto } from 'next/font/google'
import Header from '../components/layout/header'

const roboto = Roboto({ 
  weight: ['300', '400', '500'],
  subsets: ['latin']
})

export const metadata = {
  title: 'NextJS',
  description: 'Dashboard application created to testing skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
        </body>
    </html>
  )
}
