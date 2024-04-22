import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigationBar from './components/NavigationBar'
import Mission from './components/Mission'
import Testimonials from './components/Testimonals'
import Features from './components/Features'
import Footer from './components/Footer'
import Title from './components/Title'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavigationBar />
    <Title />
    <Testimonials />
    <Features />
    <Mission />
    <Footer />
    </>
  )
}

export default App
