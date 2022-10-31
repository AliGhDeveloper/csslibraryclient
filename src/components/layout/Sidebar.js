import { useContext, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from '../../store/globalstore';



export default function Sidebar() {
    const { state, dispatch } = useContext(Context)
    const bar = useRef()
    useEffect(() => {
        dispatch({type: 'SIDEBAR', payload: {...state.sidebar, target: bar.current}})
    }, [])

    const location = useLocation();
    if(location.pathname.includes('docs')){
        return (
            <div ref={bar}  className={`${state.sidebar.open ? 'open' : ''} sidebar p-1 col-3-lg p-sticky`}>
                <ul className="list">
                    <li className="list-item"><Link to={`/docs/intro`}>Introduction</Link></li>
                    <hr />
                    {
                        state.pages && state.pages.map(item =>
                            <li className="list-item" key={item.id}>
                                <Link to={`/docs/${item.name}/${item.id}`}>{item.name}</Link>
                            </li>
                        ) 
                    }
                    {
                        state.auth.user && state.auth.accesstoken &&
                        <>
                            <hr />
                            <li className="list-item"><Link to="/docs/modify">Create Page</Link></li>
                        </>
                    }
                </ul>
            </div>
        )
    } else { 
        return null
    }
}