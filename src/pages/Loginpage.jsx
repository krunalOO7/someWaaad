import { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import{Link, useNavigate} from 'react-router-dom'


const Loginpage = () => {
  const {user,handleUserLogin} = useAuth()
  const navigate = useNavigate()

  const [credentials,setCredentials] = useState({
    email:'',
    password:''
  })

  useEffect(()=>{
    if(user){

      navigate('/')
    }
  })

  const handleInputChange = (e) =>{
    let name = e.target.name 
    let value = e.target.value
    setCredentials({...credentials, [name]:value})
  }
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit = {(e)=> {
          handleUserLogin(e,credentials)
        }}>
          <div className='field--wrapper'>
            <label>Email:</label>
            <input type="email"
            required
            name="email"
            placeholder='Enter your email...'
            onChange={handleInputChange}
            value={credentials.email}
            />
            </div>
            
            <div className='field--wrapper'>
            <label>Password:</label>
            <input type="password"
            required
            name="password"
            placeholder='Enter your password...'
            onChange={handleInputChange}
            value={credentials.password}
            />
            </div>
            <div className='field--wrapper'>
                <input className='btn btn--lg btn--main' type="submit" value="Login"/>
            </div>
        </form>
        <p>Dont have account? Register <Link to="/register">here</Link></p>
        <p>*You can use email: testemail@gmail.com and password:testuser1 to Login</p>

        
        
      </div>
    </div>
  )
}

export default Loginpage