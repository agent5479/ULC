import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Visit } from './components/Visit'
import { LogoProvider } from './logoContext'

export default function App() {
  return (
    <LogoProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Visit />
        <ContactForm />
      </main>
      <Footer />
    </LogoProvider>
  )
}
