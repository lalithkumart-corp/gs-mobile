import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { authReducer } from '../reducers/auth';
import { dbReducer } from '../reducers/database';
export const getStore = () => {
    const rootReducer = combineReducers({
        auth: authReducer ,
        db: dbReducer
    });
    let store = createStore(rootReducer, applyMiddleware(reduxThunk));
    return store;
}