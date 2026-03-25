import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage'
import UploadPage from './pages/UploadPage'
import ImagesPage from './pages/ImagesPage'
import WinnerPage from './pages/WinnerPage'
import AdminPage from './pages/AdminPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/registration' element={<RegistrationPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/upload' element={<UploadPage/>} />
        <Route path='/images' element={<ImagesPage/>} />
        <Route path='/winner' element={<WinnerPage/>} />
        <Route path='/admin' element={<AdminPage/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
