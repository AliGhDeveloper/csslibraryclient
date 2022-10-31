import { Link } from "react-router-dom";
import { useContext } from "react";
import {Context} from '../../store/globalstore';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
export default function Navbar () {
    const { state, dispatch } = useContext(Context);
    const location = useLocation();
    

    const handleLogout = () => {
        dispatch({ type : 'AUTH', payload: {}});
        Cookies.remove('refreshtoken');
        localStorage.removeItem('first login')
    }

    const handleSidebar = () => {
        dispatch({type: 'SIDEBAR', payload: {...state.sidebar,  open : !state.sidebar.open}})
    }
    return (
        <div className="navbar bg-orange ">
            <div className="d-flex" style={{alignItems: 'center', cursor: 'pointer'}}>
                <h2 className="nav-brand"><Link style={{color:'black'}} to="/">Sass</Link></h2>
                {
                    location.pathname.includes('docs') && 
                    <span className="docmenu" onClick={handleSidebar}>Menu</span>
                }
            </div>
            <ul className="nav-list">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li> 
                {
                    state.auth.user && state.auth.accesstoken ? 
                    <li className="nav-item" onClick={handleLogout}>Logout</li>               
                    :
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>               
                }              
            </ul>
        </div>
    )
}