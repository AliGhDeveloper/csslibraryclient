import { Link, useNavigate} from "react-router-dom";
import { useMutation } from "@apollo/client";
import { addUser } from '../utils/queries';
import { useState, useEffect } from "react";


export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({ username : "", email: "", password: ""})
    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }
    const [register, user] = useMutation(addUser);
    const { username, email, password } = data
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !password || !email) return console.log('please add all fields');
        register({
            variables : data
        });
        
    }
    useEffect(() => {
        if(user.data && !user.loading) {
            
            navigate('/login')
        }
    },[user])
    return (
        <div className="container register">
            <div className="row">
                <div style={{margin: "30px auto"}} className="col-12-xs col-7-lg" >
                    <div style={{ padding: '25px'}} className="card">
                        <h4 className="card-title">Register</h4>
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <input className="form-control w-50" name="username" placeholder="username" onChange={handleChange} />                    
                            <input className="form-control w-50" name="email" placeholder="email" onChange={handleChange} />                    
                            <input className="form-control w-50" name="password" placeholder="password" onChange={handleChange} /> 
                            <button type="submit" className="btn btn-outlined-primary w-50">register</button>                   
                        </form>
                        <p className="mt-2">already have an account ? <Link to="/login">login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}