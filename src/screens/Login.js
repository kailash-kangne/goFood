import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Login() {

  const [cred, setCred] = useState({  password: '', email: '' })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {

    //synthetic event
    e.preventDefault();

    console.log(JSON.stringify({
      
      email: cred.email,
      password: cred.password,
      
    }))

    const response = await fetch("http://localhost:5000/api/loginuser", {
      //mode: 'no-cors',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        email: cred.email,
        password: cred.password,
        
      })

    })

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials")
    }
    if (json.success)
    {
      navigate("/");
    }
  }

  const onChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  }


  return (
    <>
      <div> <Navbar /> </div>
      <div className='container '>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={cred.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={cred.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/createuser' className='m-3 btn btn-danger'>New user?</Link>
                </form>
            </div>
    </>
  )
}
