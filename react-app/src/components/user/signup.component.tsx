import { useEffect, useReducer } from "react";
import UserData from "../../types/UserActionType";
import formJson from "../../config/signupForm.json";
import Form from "../../FormBuilder/Form";
import UserService from "../../services/User.service";
import UserReducer, { INITIAL_STATE } from "../../reducer/UserReducer";
import { ACTIONS_TYPES } from "../../types/PostActionType";

const SignUp = () => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: ACTIONS_TYPES.INIT, payload: { formConfig: formJson } });    
  }, []);
  
  const handleSubmit = (value: UserData) => {
    dispatch({ type: ACTIONS_TYPES.FETCH_START, payload: {} });
    UserService.create(value)
      .then((response: any) => {
        if (response) {
          dispatch({ type: ACTIONS_TYPES.FETCH_SUCCESS, payload: {
            response: response.data,
            success: 'Form submitted Sucessfully'
          } });
        }
      })
      .catch((e: Error) => {
        dispatch({
            type: ACTIONS_TYPES.FETCH_ERROR, payload: {
                errorMsg: 'There was some error while submitting form, please try again'
            }
        });
      });
  };

  return (
    <div className="add-blog px-5 py-5 my-20 max-w-3xl mx-auto space-y-6">
      <Form
        template={state.template}
        handleSubmit={handleSubmit}
        resetValue={state.resetValue}
      />
      {state.formError && (
        <h4 className="text-red-500 text-xs italic">{state.formError}</h4>
      )}
      {state.success && <h4 className="text-grey-500 text-xs italic">{state.success}</h4>}
    </div>
  );
};

export default SignUp;
