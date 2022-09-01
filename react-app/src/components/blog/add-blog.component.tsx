import {  useState } from "react";
import BlogData from "../../models/Blog.type";
import formJson from "../../config/formElement.json";
import Form from "../../FormBuilder/Form";
import BlogService from "../../services/Blog.service";

const AddBlog = () => {
    const [template] = useState(formJson);
    const [formError, setFormError] = useState('');
    const [success, setFormSuccess] = useState('');
    const [resetValue, setResetValue] = useState(false);

    const handleSubmit = (value: BlogData) => {
        BlogService.create(value)
        .then((response: any) => {
            if (response){
                console.log(response.data);
                setResetValue(true);
                setFormError('');
                setFormSuccess('Form submitted Sucessfully');
            }
          })
        .catch((e: Error) => {
            console.log(e);
            setFormError('There was some error while submitting form, please try again');
          });
    }
    
    return (
        <div className="add-blog px-5 py-5 my-20 max-w-3xl mx-auto space-y-6">
            <Form
            template={template} handleSubmit={handleSubmit} resetValue={resetValue} />
            { formError && 
                <h4 className="text-red-500 text-xs italic">{formError}</h4>
            }
            { success && 
                <h4 className="text-grey-500 text-xs italic">{success}</h4>
            }
        </div>
    )
};



export default AddBlog;