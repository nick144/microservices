export const depositeMoney = (amount: any) => {
    return (dispatch) => {
        dispatch({
            type: 'deposite',
            payload: amount
        });
    };
}


export const withdrawMoney = (amount: any) => {
    return (dispatch) => {
        dispatch({
            type: 'withdraw',
            payload: amount
        });
    };
}