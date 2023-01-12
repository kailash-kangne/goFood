import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Signup() {

    const [cred, setCred] = useState({ name: '', password: '', email: '', geoloc: "" })

    const handleSubmit = async (e) => {

        //synthetic event
        e.preventDefault();

        console.log(JSON.stringify({
            name: cred.name,
            email: cred.email,
            password: cred.password,
            location: cred.geoloc
        }))

        const response = await fetch("http://localhost:5000/api/createuser", {
            //mode: 'no-cors',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: cred.name,
                email: cred.email,
                password: cred.password,
                location: cred.geoloc
            })

        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("enter valid credentials")
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
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={cred.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={cred.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={cred.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geoloc" value={cred.geoloc} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already user?</Link>
                </form>
            </div>
        </>
    )
}
