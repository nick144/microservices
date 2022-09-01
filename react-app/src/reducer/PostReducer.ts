export const INITIAL_STATE= {
    template: {},
    loading: false,
    posts: [],
    formError: '',
    success: '',
    resetValue: false,
    isLogin:false,
    user: {}
}


const PostReducer = (state: any, action: { type: any, payload?: any }) => {
    switch (action.type) {
        case 'INIT':
            const loggedIn = sessionStorage.getItem('jwttoken') || false;
            const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : '';
            return {
                ...state,
                template: action.payload?.formConfig || {},
                isLogin: (loggedIn && user) ? true : false,
                user: user
            }
        case 'FETCH_USER_POST':
            return {
                ...state,
                posts: action.payload.post,
            }
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                posts: action.payload.post,
                success: action.payload.success,
                resetValue: true
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

export default PostReducer;