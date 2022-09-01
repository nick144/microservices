import { useEffect, useReducer } from "react";
import UserLogin from "../../types/LoginActionType";
import formJson from "../../config/loginForm.json";
import Form from "../../FormBuilder/Form";
import UserService from "../../services/User.service";
import UserReducer, { INITIAL_STATE } from "../../reducer/UserReducer";
import { ACTIONS_TYPES } from "../../types/PostActionType";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: ACTIONS_TYPES.INIT, payload: { formConfig: formJson } });    
  }, []);
  
  const handleSubmit = (value: UserLogin) => {
    dispatch({ type: ACTIONS_TYPES.FETCH_START, payload: {} });
    UserService.login(value)
      .then((response: any) => {
        if (response) {
          dispatch({ type: ACTIONS_TYPES.FETCH_SUCCESS, payload: {
            response: response.data,
            success: 'Form submitted Sucessfully'
          } });

          sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
          sessionStorage.setItem("jwttoken", response.data.token);
        }
      })
      .catch((e: Error) => {
        console.log(Error);
        dispatch({
            type: ACTIONS_TYPES.FETCH_ERROR, payload: {
                errorMsg: 'There was some error while submitting form, please try again'
            }
        });
      });
  };

  return (
    <div className="add-blog px-5 py-5 my-20 max-w-3xl mx-auto space-y-6">
        {state.isLogin && (
            <div className="px-4 my-32 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-semibold">{state.user.username} Is login</h1>
            {/* <p><span onClick={logout}>logout</span></p> */}
            
            <p>
                <Link to="/logout">
                    <i className="fa fa-sign-out pull-right"></i> 
                    Log Out
                </Link>
            </p>
            </div>
        )}
        {!state.isLogin && (
            <Form
                template={state.template}
                handleSubmit={handleSubmit}
                resetValue={state.resetValue}
            />
        )}
      {state.formError && (
        <h4 className="text-red-500 text-xs italic">{state.formError}</h4>
      )}
      {state.success && <h4 className="text-grey-500 text-xs italic">{state.success}</h4>}
    </div>
  );
};

export default Login;
