// import localFont from "next/font/local"
import "./globals.css"
import { AppProvider } from "./context/AppContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

export const metadata = {
  title: "NHS Survey App",
  description: "Submit and manage NHS Health Care Team surveys efficiently",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
