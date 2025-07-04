import type { Metadata } from "next"
import "./globals.css"
// import { DatadogScript } from "./components/DatadogScript"
// import { GoogleAnalytics } from "./components/GoogleAnalytics"
import { GeistSans } from "geist/font/sans"
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "docai",
  description: "",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" className={GeistSans.variable}>
      {/* <DatadogScript /> */}
      {/* <GoogleAnalytics /> */}
      <body className={`antialiased ${GeistSans.className}`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
