import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import AuthStyles from '../../styles/Authstyles.css'


const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [answer, setAnswer] = useState('')
  const navigate = useNavigate()

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer })
      if (res && res.data.success) {
        alert(res.data.message)
        navigate('/login')
      } else {
        alert(res.data.message)
        //react-hot-toast
      }
    } catch (error) {
      console.log(error)

    }
  }


  return (
    <Layout title={'Register Now'}>
      <div className='register form-container'>
        <h4 className='title'>Register</h4>
        <form onSubmit={handleSubmit} >
          <div class="mb-3">

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter Your Name' required />
          </div>
          <div class="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
          </div>
          <div class="mb-3">
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter Your Phone No.' required />
          </div>
          <div class="mb-3">
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' required />
          </div>
          <div class="mb-3">
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='What is Your Favourite Sports' required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register