import {useEffect, useState} from 'react'
import client, {databases,DATABASE_ID,COLLECTION_ID_MESSAGES} from '../appwriteConfig'
import {ID,Query} from 'appwrite'
import {Trash2} from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'
const Room = () => {
  const{user} = useAuth()

    const [messages,setMessages] = useState([])
    const [messageBody,setMessageBody]=useState('')
    useEffect(()=>{
        getMessages()
       const unsubscribe = client.subscribe([`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`], response => {
         
          if(response.events.includes("databases.*.collections.*.documents.*.create"))
          {
            console.log("message was created")
            setMessages(prevState => [response.payload,...prevState]) 
          }
          if(response.events.includes("databases.*.collections.*.documents.*.delete"))
          {
            console.log("message was deleted")
            setMessages(prevState=> prevState.filter(message=>message.$id!==response.payload.$id))
          }
      });
      return () => {
        unsubscribe()
      }
    },[])

    const handleSubmit = async (e)=>{
      e.preventDefault()
      let payload = {
        user_id:user.$id,
        username:user.name,
        body:messageBody
      }
     
      
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        ID.unique(),
        payload
      )
      
      // setMessages(prevState => [response,...messages])  
      setMessageBody('')
        
    }

    const getMessages = async ()=>{
        const response = await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES,[
          Query.orderDesc('$createdAt')
        ])
        setMessages(response.documents)

    }

    const deleteMessage= async (message_id) =>{
     
      
      databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
     

    }
  return (
    <main className='container'>
       <Header/>
      <div className='room--container'>
       
        <form id="message--form" onSubmit={handleSubmit}>
          <textarea required maxLength='1000' placeholder='lets talk...'
          onChange={(e)=>{
            setMessageBody(e.target.value)
          }} 
          value={messageBody}> 
          </textarea>
          <div className='send-btn--wrapper'>
            <input className='btn btn-secondary' type="submit" value="Send"/>
          </div>
        </form>
      {messages.map(message=>(
        <div className='message--wrapper' style={user.$id === message.user_id?{alignContent:'flex-end'}:null} key={message.id}>
          <div className='message--header'>
            
            <span style={user.$id===message.user_id?{textAlign:'right'}:{}}>
              <p style={{display:'inline'}}>
              {message?.username ?(
                <span>{message.username}</span>
              ):(
                <span>
                  Anonymous user
                </span>
              )
              }
              
            </p>
              {message.$permissions.includes(`delete(\"user:${user.$id}\")`)
              &&
              <Trash2 className='delete--btn' onClick={()=>{ deleteMessage(message.$id)}}/>
            } 
            </span>
            
            <small style={user.$id === message.user_id?{textAlign:'right'}:{}}>
              {new Date(message.$createdAt).toLocaleString().substring(0,6) + new Date(message.$createdAt).toLocaleString().substring(8,10)}
          </small>
          <small style={user.$id === message.user_id?{textAlign:'right'}:{}}>
              {new Date(message.$createdAt).toLocaleString().substring(11)}
          </small>

             
             </div>
          <div className='message--body' style={user.$id===message.user_id?{backgroundColor:'#61677A'}:null}>


           {user.$id===message.user_id? <span style={{justifyContent:'left'}}> {message.body}</span>: <span> {message.body}</span>} 
          
          </div>
        </div>
      ))}
      </div>
    </main>
  )
}

export default Room