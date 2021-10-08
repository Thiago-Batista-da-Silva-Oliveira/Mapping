import "./register.css"
import { Room, Cancel} from '@material-ui/icons';
import {useState,useRef} from 'react'
import axios from 'axios'

export default function Register ({setShowRegister}) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async(e) => {
             e.preventDefault()
             const newUser = {
                 username: nameRef.current.value,
                 email: emailRef.current.value,
                 password: passwordRef.current.value,
             }
             try{
                    await axios.post('/users/register', newUser)
                    setSuccess(true)
                    setError(false)
             } catch(err){
                 setError(true)
             }

    }
    return (
        <>
        <div className="registerContainer">
            <div className="logo"><Room />TBSO</div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} placeholder="username" />
                <input type="email" ref={emailRef} placeholder="email" />
                <input type="password" ref={passwordRef} placeholder="password" />
                <button className="registerBtn" type="submit">Register</button>
                {success && (
                        <span className="success">Successfull. You can login now!</span>
                )}
                {error && (
                         <span className="error">Something went wrong!</span>
                )}
                 
            </form>
            <Cancel onClick={() => setShowRegister(false)} className="registerCancel" />
        </div>
        </>
    )
}