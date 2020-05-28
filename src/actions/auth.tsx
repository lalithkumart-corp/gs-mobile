import { LOGGED_IN_SUCCESS, LOGGED_OUT_SUCCESS } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

export const doLogin = (params) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.setItem('USER_KEY', params.userName);
            let cl = await AsyncStorage.getItem('USER_KEY');
            console.log(cl);
            console.log('=====REFRESH TRIGGERD FROM SIGNIN page');
            dispatch({
                type: LOGGED_IN_SUCCESS,
                data: {username: cl}
            });
        } catch(e) {
            console.log('====Error in auth actions ', e);
        }
    }
}

export const doLogout = (params) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem('USER_KEY');
            dispatch({
                type: LOGGED_OUT_SUCCESS
            })
        } catch(e) {

        }
    }
}