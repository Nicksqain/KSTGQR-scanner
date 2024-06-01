
import { Toaster } from 'react-hot-toast'
import './App.css'
import { useTgProcessing } from './functions/tg'
import ScanQR from './pages/ScanQR'

function App() {
  useTgProcessing()
  return (
    <>
      <ScanQR></ScanQR>
      <Toaster/>
    </>
  )
}

export default App
