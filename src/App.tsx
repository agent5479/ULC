import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MoreAtTheShop } from './components/MoreAtTheShop'
import { PrintSelector } from './components/PrintSelector'
import { Services } from './components/Services'
import { Visit } from './components/Visit'
import { EnquiryProvider } from './enquiryContext'

export default function App() {
  return (
    <EnquiryProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <PrintSelector />
        <Visit />
        <ContactForm />
        <MoreAtTheShop />
      </main>
      <Footer />
    </EnquiryProvider>
  )
}
