import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { LoginQuery } from "../utils/queries";
import { Context } from "../store/globalstore";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login(){ 
    const navigate = useNavigate();
    const [ login, userData] = useLazyQuery(LoginQuery);
    const { dispatch } = useContext(Context);
    const [data, setData] = useState({ email: "", password: ""})
    const { email, password } = data
    
    useEffect(() => {
        dispatch({ type: 'LOADING', payload: {status: userData.loading}})
        if(userData.data && !userData.loading) {
            dispatch({ type : "AUTH", payload: userData.data.login});
            localStorage.setItem('first login', true);
            
            // Cookies.set('refreshtoken', userData.data.login.refreshtoken, {
            //     expires : 7,
            // });
            return navigate('/')
        }
    }, [userData])

    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) return console.log('please add all fields');
        login({
            variables : data
        });
    }
    return (
        <div className="container login">
            <div className="row">
                <div style={{margin: "30px auto"}} className="col-12-xs col-7-lg" >
                    <div style={{ padding: '25px'}} className="card">
                        <h4 className="card-title">Login</h4>
                        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>                   
                            <input className="form-control w-50" name="email" placeholder="email" onChange={handleChange}/>                    
                            <input className="form-control w-50" name="password" placeholder="password" onChange={handleChange}/> 
                            <button type="submit" className="btn btn-outlined-primary w-50">login</button>                   
                        </form>
                        <p className="mt-2">dont have an account ? <Link to="/register">register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}