import './index.css'

export const metadata = {
  title: 'Hicham Full-Stack Developer',
  description: "Welcome on my portfolio, I'am Hicham a fullstack web developer, I can develop applications, websites, databases et more, contact me and your dream will be true",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="relative z-0 bg-primary">
        {children}
      </body>
    </html>
  )
}
