import { createContext,useState,useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
const AuthContext = createContext()


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) =>{
    const navigate=useNavigate()
    const[user,setUser] = useState(null)
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        setLoading(false)
        getUserOnLoad()

    },[])

    const getUserOnLoad= async () =>{
        try{
             const accountDetails = await account.get()
            setUser(accountDetails)
        }catch(error){
            console.info(error)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e,credentials) =>{
        e.preventDefault()
        try{
             await account.createEmailSession(credentials.email,credentials.password)
            const accountDetails = await account.get()
            setUser(accountDetails)
            console.log(accountDetails)
            navigate('/')
        }catch(error){
            console.error(error)
        }


    }

    const handleUserRegister = async (e,credentials) =>{
        e.preventDefault()
        if(credentials.password1!==credentials.password2){
            alert("Password do not match!")
            return
        }
        try{
            await account.create(ID.unique(),credentials.email,credentials.password1,credentials.name)
            await account.createEmailSession(credentials.email,credentials.password1)
            const accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/')
        }catch(error){
            console.error(error)
        }

    }
    
    const handleUserLogOut = async () =>{
       await account.deleteSession('current')
       setUser(null)
    }
    const contextData={
        user,
        handleUserLogin,
        handleUserLogOut,
        handleUserRegister

    }
    return <AuthContext.Provider value={contextData}>
            {loading? <p>Loading...</p>: children}    
         </AuthContext.Provider>

}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth=()=>{
    return useContext(AuthContext)
}
export default AuthContext