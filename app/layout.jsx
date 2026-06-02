import './globals.css'

export const metadata = {
  title: 'StudyMate.in - AI Tutoring for Indian Students',
  description: 'AI-powered tutoring for TN & CBSE students'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
