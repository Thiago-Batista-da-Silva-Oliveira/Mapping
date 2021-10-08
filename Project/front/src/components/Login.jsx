import "./login.css"
import { Room, Cancel} from '@material-ui/icons';
import {useState,useRef} from 'react'
import axios from 'axios'

export default function Login ({setShowLogin, myStorage, setCurrentUser}) {
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
             e.preventDefault()
             const User = {
                 username: nameRef.current.value,
                 password: passwordRef.current.value,
             }
             try{
                   const res = await axios.post('/users/login',User)
                    setError(false)
                    myStorage.setItem("user", res.data.username )
                    setCurrentUser(res.data.username)
                    setShowLogin(false)
             } catch(err){
                 setError(true)
             }

    }
    return (
        <>
        <div className="loginContainer">
            <div className="logo"><Room />TBSO</div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} placeholder="username" />
               
                <input type="password" ref={passwordRef} placeholder="password" />
                <button className="loginBtn" type="submit">Login</button>
               
                {error && (
                         <span className="error">Something went wrong!</span>
                )}
                 
            </form>
            <Cancel onClick={() => setShowLogin(false)} className="registerCancel" />
        </div>
        </>
    )
}