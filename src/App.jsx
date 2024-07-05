import './App.css'
import Show from './components/Routes/show'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'

function App() {

  return (
    <>
     <Router>
     <AuthProvider>
     <Show/>
     </AuthProvider>
     </Router>
    </>
  )
}

export default App
