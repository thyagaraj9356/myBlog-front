import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        setError(false)
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            })
            console.log(res)
            res.data && window.location.replace("/login")
        } catch (err) {
            setError(true)
        }
    }

    return (
        <div className='register'>
            <span className="registerTittle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className='registerInput'
                    placeholder='Enter your Userame'
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="text"
                    className='registerInput'
                    placeholder='Enter your Email'
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Paasword</label>
                <input
                    type="password"
                    className='registerInput'
                    placeholder='Enter your Password'
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className='link' to="/login">Login</Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "10px" }} >Something went wrong!</span>}
        </div>
    )
}
