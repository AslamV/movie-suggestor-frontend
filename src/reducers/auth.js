
const authReducer =  (authData = {}, action) => {
    switch (action.type) {
        case 'AUTH':
            console.log(action.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            const {result} = action?.data
            return authData = result
        case 'LOGOUT':
            localStorage.clear()
            return authData = null;
        case 'ADD_FAVOURITE':
            console.log(authData)
            return authData = action?.result;
        default:
            return authData;
    }
}

export default authReducer;