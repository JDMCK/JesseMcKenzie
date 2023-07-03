import './globals.css'
import '../styles/SVG.css'
import { Inter } from 'next/font/google'
import 'devicon';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jesse McKenzie',
  description: 'Resumé',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
