export const INITIAL_STATE= {
    template: {},
    loading: false,
    formError: '',
    success: '',
    resetValue: false,
    isLogin:false,
    user: {}
}


const UserReducer = (state: any, action: { type: any, payload: any }) => {
    switch (action.type) {
        case 'INIT':
            const loggedIn = sessionStorage.getItem('jwttoken') || false;
            const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : '';
            return {
                ...state,
                template: action.payload.formConfig,
                isLogin: (loggedIn && user),
                user: user
            }
        
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                success: action.payload.success,
                resetValue: true,
                isLogin: action.payload.response.auth || false,
                user: action.payload.response.data.user || {}
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                formError: action.payload.errorMsg
            }
        default:
            return state;
    }

}

export default UserReducer;