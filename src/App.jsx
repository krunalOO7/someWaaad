import {BrowserRouter as Router,Route,Routes}  from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import {AuthProvider} from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'
import Room from './pages/Room'
import Loginpage from './pages/Loginpage'


const App = () => {
  return (
     <Router>
      <AuthProvider>
      <Routes>

        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route element={<PrivateRoutes/>}> 
          <Route path='/' element={<Room/>}/>
        
        </Route>
      </Routes>
      </AuthProvider>
     </Router>
  )
}

export default App