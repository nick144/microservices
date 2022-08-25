import { useEffect, useReducer } from "react";
import BlogData from "../../types/BlogActionType";
import formJson from "../../config/blogForm.json";
import Form from "../../FormBuilder/Form";
import BlogService from "../../services/Blog.service";
import PostReducer, { INITIAL_STATE } from "../../reducer/PostReducer";
import { ACTIONS_TYPES } from "../../types/PostActionType";
import { useNavigate, useParams } from "react-router-dom";

const AddBlog = () => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);
  const params = useParams();
  const postId = params.id;
  const nav = useNavigate();

  useEffect(() => {
    dispatch({ type: ACTIONS_TYPES.INIT, payload: { formConfig: formJson } });

    if (!postId) {
      return;
    }
    
    BlogService.get(postId).then(response => {
        if (!response.status) {
            return;
        }
        const post = response.data.data;
        dispatch({ type: ACTIONS_TYPES.FETCH_USER_POST, payload: {
            post: post
        } });
    }, error => {
      if (error.response && error.response.data) {
        nav('/logout');
      }
      dispatch({
          type: ACTIONS_TYPES.FETCH_ERROR, payload: {
              errorMsg: 'There was some error while fetching blog, please try again'
          }
      });
    })

  }, []);
  
  const handleSubmit = (value: BlogData) => {
    dispatch({ type: ACTIONS_TYPES.FETCH_START, payload: {} });

    if (!postId) {
      addBlog(value);
      return;
    }
    updateBlog(value);
  };

  const addBlog = (value: BlogData) => {
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
  }

  const updateBlog = (value: BlogData) => {
    BlogService.update(value, postId)
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
  }

  return (
    <div className="add-blog px-5 py-5 my-20 max-w-3xl mx-auto space-y-6">
      <Form
        template={state.template}
        handleSubmit={handleSubmit}
        resetValue={state.resetValue}
        feildValues={state.posts}
      />
      {state.formError && (
        <h4 className="text-red-500 text-xs italic">{state.formError}</h4>
      )}
      {state.success && <h4 className="text-grey-500 text-xs italic">{state.success}</h4>}
    </div>
  );
};

export default AddBlog;
