import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Plan from './pages/Plan'
import Destinations from './pages/Destinations'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/plan"         element={<Plan />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about"        element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
