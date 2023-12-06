import { CartWrapper } from '@/StateManager/CartContext'
import { Inter, Jost } from 'next/font/google'
import Footer from './Componets/Footer'
import NavBar from './Componets/Header/NavBar'
import { siteName, siteTag } from './META'
import { UIProvider } from './UIProvider'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })
const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  title: siteName,
  description: siteTag,
}


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8097"></script>
        <link rel='icon' href='public/Images/371104266_1371705300076286_136258277339424492_n.jpeg' />
      </head>
      <body className={jost.className}>
        <UIProvider>
          <CartWrapper>
            <NavBar />
              {children}
            <Footer />
          </CartWrapper>
        </UIProvider>
        </body>
    </html>
  )
}


