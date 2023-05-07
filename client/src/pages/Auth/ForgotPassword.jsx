import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
import '../../styles/Authstyles.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");


  const navigate = useNavigate();


    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res= await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newPassword})
          if(res && res.data.success){
            alert(res && res.data.message)
            navigate("/login");
          }else{
            alert(res.data.message)
          }
        } catch (error) {
          console.log(error)
          
        }
    }

  return (
    <Layout title={'Forgot PAssword - Ecommerce App'}>
    <div className=' form-container'>
        <h4 className='title'>Forgot Password</h4>
        <form onSubmit={handleSubmit} >
<div class="mb-3">
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required/>
</div>
<div class="mb-3">
<input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Favourite Sport' required/>
</div>
<div className="mb-3">
<input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your New Password' required/>
</div>
<button type="submit" className="btn btn-primary">Reset Password</button>
</form> 
    </div>  
    </Layout>
  )
}

export default ForgotPassword