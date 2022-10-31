import { useContext, useEffect } from 'react';
import { Context } from '../../store/globalstore';
import { useMutation } from '@apollo/client';
import { deletePage } from '../../utils/queries';
import { useNavigate } from 'react-router-dom';
import { getPagesNamesQuery } from '../../utils/queries';
export default function Modal() {
    const navigate = useNavigate();
    const { state: { modal, auth }, dispatch } = useContext(Context)
    const [deleteP, data] = useMutation(deletePage);
    
    useEffect(() => {
        dispatch({type : 'LOADING', payload: {status: data.loading}})
    }, [data.loading])

    const handleDelete =() => {
        if(modal.actionType === 'ADD_PAGES') {
            if(auth.user && auth.accesstoken){
                deleteP({
                    variables : { id: modal.item, token: auth.accesstoken},
                    refetchQueries : [
                        {query : getPagesNamesQuery}
                    ]
                }).then(result => {
                    console.log(result)
                    if(result.data) return navigate('/docs/intro')
                })
            } else {
                console.log('authentication error')
            }
        }
        clear()
    }

    const clear = () => {
        dispatch({type: "MODAL", payload: {show: false}});
    }

    return (
        <div className={`modal ${modal.show? 'show' : ''}`}>
            <h2 className="modal-title">Are you sure to delete this item?</h2>
            <div className="modal-body">

            </div>
            <div className="modal-footer justify-space-between">
                <button className="btn btn-error" onClick={() => dispatch({ type: 'MODAL' ,payload: {show: false}})}>Close</button>
                <button className="btn btn-success" onClick={handleDelete}>Yes</button>
            </div>
        </div>
    )
}