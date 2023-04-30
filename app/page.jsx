import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Navbar from "./components/Navbar";
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Tech from './components/Tech';
import Works from './components/Works';
import Feedbacks from './components/Feedbacks';
import Contact from './components/Contact';

export default function Home() {
  return (

    <main>
      <div>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div>
        <Contact />
      </div>
    </main>

  )
}