export const INITIAL_STATE= {
    template: {},
    loading: false,
    post: {},
    formError: '',
    success: '',
    resetValue: false
}


const PostReducer = (state: any, action: { type: any, payload: any }) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                template: action.payload.formConfig,
            }
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                post: action.payload.post,
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