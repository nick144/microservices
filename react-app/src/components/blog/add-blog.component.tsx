import { useEffect, useReducer } from "react";
import BlogData from "../../types/BlogActionType";
import formJson from "../../config/formElement.json";
import Form from "../../FormBuilder/Form";
import BlogService from "../../services/Blog.service";
import PostReducer, { INITIAL_STATE } from "../../reducer/PostReducer";
import { ACTIONS_TYPES } from "../../types/PostActionType";

const AddBlog = () => {
//   const [template] = useState(formJson);
//   const [formError, setFormError] = useState("");
//   const [success, setFormSuccess] = useState("");
//   const [resetValue, setResetValue] = useState(false);

  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: ACTIONS_TYPES.INIT, payload: { formConfig: formJson } });    
  }, []);
  
  const handleSubmit = (value: BlogData) => {
    dispatch({ type: ACTIONS_TYPES.FETCH_START, payload: {} });
    BlogService.create(value)
      .then((response: any) => {
        if (response) {
          dispatch({ type: ACTIONS_TYPES.FETCH_SUCCESS, payload: {
            post: response.data,
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

export default AddBlog;
