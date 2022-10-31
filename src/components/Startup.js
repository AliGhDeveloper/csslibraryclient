import { useContext, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { getPagesNamesQuery, refreshQuery } from '../utils/queries';
import { Context } from "../store/globalstore";
import { getData } from "../utils/fetchData";

export default function Startup({ children }) {
    const auth = useQuery(refreshQuery);

    const { dispatch } = useContext(Context);
    const result = useQuery(getPagesNamesQuery)
    useEffect(() => {
        if(auth.data && !auth.loading) {
            return dispatch({type: 'AUTH', payload: auth.data.refresh})
        }
    }, [auth])
    
    useEffect(() => {
        if(result.data) {
            dispatch({ type: 'ADD_PAGES', payload : result.data.pages })
        }
    }, [result])
    return (
        <>
            {children}
        </>
    )
}