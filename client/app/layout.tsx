import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Draw It",
  description: "Draw whatever you want",
  icons: {
    icon: ["./fav/favicon.ico?v=4"],
    apple: ["./fav/apple-touch-icon.png?v=4"],
    shortcut: ["./fav/apple-touch-icon.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
  )
}
