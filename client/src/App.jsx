import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Inventory from './pages/Inventory.jsx'
import VehicleForm from './pages/VehicleForm.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/vehicles/new" element={<PrivateRoute><VehicleForm /></PrivateRoute>} />
          <Route path="/vehicles/:vehicleId/edit" element={<PrivateRoute><VehicleForm /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
