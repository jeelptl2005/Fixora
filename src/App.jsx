import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './Components/Navbar'
import { Hero } from './Components/Hero'
import { Oservice } from './Components/Oservice'
import { HowWork } from './Components/HowWork'
import { Services } from './Components/Service'
import { Footer } from './Components/Footer'
import Login from './Components/Login'
import Signup from './Components/Signup'
import PageLoader from './PageLoader'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const LoginPage = () => {
  const navigate = useNavigate()
  return <Login onGoSignup={() => navigate('/signup')} />
}

const SignupPage = () => {
  const navigate = useNavigate()
  return <Signup onGoLogin={() => navigate('/login')} />
}

const AppContent = () => {
  const location = useLocation()
  // Hide navbar on login/signup pages
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup'
  // Hide footer on login/signup AND service page
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/service'

  return (
    <>
      <PageLoader />
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={
          <>
            <Hero />
            <Oservice />
            <HowWork />
          </>
        } />
        <Route path="/service" element={<Services />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App