import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { authReducer } from '../reducers/auth';

export const getStore = () => {
    const rootReducer = combineReducers({
        auth: authReducer 
    });
    let store = createStore(rootReducer, applyMiddleware(reduxThunk));
    return store;
}