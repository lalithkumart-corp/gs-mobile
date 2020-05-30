import { LOGGED_IN_SUCCESS, LOGGED_OUT_SUCCESS } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    isAuthenticated: true,
    userName: ""
};
export const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    //let userName = AsyncStorage.getItem('USER_KEY');
    // if(userName)
    //     newState = {...newState, isAuthenticated: true, userName: userName};
    switch(action.type) {
        case LOGGED_IN_SUCCESS:
            newState.userName = action.payload;
            newState.isAuthenticated = true;
            break;
        case LOGGED_OUT_SUCCESS:
            newState.userName = "";
            newState.isAuthenticated = false;
            break;
        default:
            return state;
    }
    return newState;
}