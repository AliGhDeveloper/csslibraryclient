import { Routes, Route } from 'react-router-dom';
import { Context } from "./store/globalstore";
import { useContext, useEffect, useState } from "react";
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import DocsLayout from './components/layout/DocsLayout';
import DocPage from './pages/Docs/Docs';
import CreatePage from './pages/Docs/CreatePage';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import IntroPage from './pages/Docs/IntroPage';
import Modal from './components/layout/Modal';


export default function App() {
    const { state: {pages, auth, sidebar, loading}, dispatch } = useContext(Context);
    const [syncing, setSyncing] = useState(true);
    
    useEffect(() => {
        if(pages.length > 0) setSyncing(false)
    },[pages])

    useEffect(() => {
        dispatch({type: 'LOADING', payload: {status: syncing}})
    },[syncing])

    const handleClick = (e) => {
        if(!e.target.closest('.sidebar')){
            dispatch({type: 'SIDEBAR', payload: {...sidebar, open: false}})
        }
    }
    if(!syncing) {
        return (
            <>
                <Navbar />
                <Modal />
                <div onClick={handleClick}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path="/docs" element={<DocsLayout />}>
                        <Route path="/docs/intro" element={<IntroPage />} />
                        {   
                            pages && pages.map( page =><Route key={page.id} path={`/docs/${page.name}/:id`} element={<DocPage />} />)
                        }
                        {
                            auth && auth.accesstoken && 
                            <>
                            <Route path="/docs/modify" element={<CreatePage />}/>
                            <Route path="/docs/modify/:id" element={<CreatePage />}/>
                            </>
                        }
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </div>
            </>
        )
    } else {
        return null
    }
};
