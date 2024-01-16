import { useState } from "react"
import { useAuth } from "../utils/AuthContext"
import { Link } from "react-router-dom"

const RegisterPage = () => {

  const {handleUserRegister}=useAuth()
  
  const handleInputChange = (e) =>{
    let name = e.target.name 
    let value = e.target.value
    setCredentials({...credentials, [name]:value})
  }

  const [credentials,setCredentials] = useState({
    name:'',
    email:'',
    password1:'',
    password2:''
  })




  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit = {(e)=> {
          handleUserRegister(e,credentials)
        }}>
          <div className='field--wrapper'>
            <label>Name:</label>
            <input type="text"
            required
            name="name"
            placeholder='Enter your name...'
            onChange={handleInputChange}
            value={credentials.name}
            />
            </div>

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
            name="password1"
            placeholder='Enter your password...'
            onChange={handleInputChange}
            value={credentials.password1}
            />
            </div>

            <div className='field--wrapper'>
            <label>Confirm your Password:</label>
            <input type="password"
            required
            name="password2"
            placeholder='Enter your password again'
            onChange={handleInputChange}
            value={credentials.password2}
            />
            </div>

            <div className='field--wrapper'>
                <input className='btn btn--lg btn--main' type="submit" value="Login"/>
            </div>
        </form>
        <p>Already have account? Login <Link to="/login">here</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage