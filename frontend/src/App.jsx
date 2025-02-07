
import { Routes,Route } from 'react-router-dom'
import Signup from './pages/SignupPage'
import  Login from "./pages/Loginpage"
import Welcome from "./pages/Welcome"

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome/>} ></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
      
    </>
  )
}

export default App
