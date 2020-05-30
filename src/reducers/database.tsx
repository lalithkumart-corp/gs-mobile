
const initialState = {
    dbReference: null,
    dbRefSet: false
};
export const dbReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case "DB_REFERENCE":
            newState.dbReference = action.data.dbReference;
            newState.dbRefSet = true;
            break;
        default:
            return state;
    }
    return newState;
}