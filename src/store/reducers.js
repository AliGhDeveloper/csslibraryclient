import * as actions from './actions';

export const initialValue = { sidebar: {open: false}, pages : [], auth: {}, loading: {status: false}, modal: {show: false} };

const reducer = (state, action) => {
    switch(action.type) {
        case actions.ADD_PAGES :
            return { ...state, pages: action.payload };
        case actions.AUTH :
            return { ...state, auth: action.payload };
        case actions.LOADING :
            return { ...state, loading: action.payload };
        case actions.SIDEBAR :
            return { ...state, sidebar: action.payload };
        case actions.MODAL :
            return { ...state, modal: action.payload }
        default : 
            return state
    }
};

export default reducer