import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
import '../../styles/Authstyles.css'
import { useAuth  } from '../../context/Auth'


const Login = () => {

    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res= await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/login`,{email,password})
          if(res && res.data.success){
            alert(res && res.data.message)
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            })
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
          }else{
            alert(res.data.message)
            //react-hot-toast
          }
        } catch (error) {
          console.log(error)
          
        }
    }

  return (
    
    <Layout title={'Login Now'}>
    <div className=' form-container'>
        <h4 className='title'>Login</h4>
        <form onSubmit={handleSubmit} >
<div class="mb-3">
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required/>
</div>
<div className="mb-3">
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required/>
</div>
<div className="mb-3">
<button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>forget Password</button>
</div>
<button type="submit" className="btn btn-primary">Login</button>
</form> 
    </div>
</Layout>
  )
}

export default Login