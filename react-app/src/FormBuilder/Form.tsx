import { FormProvider, useForm } from 'react-hook-form';
import Text from './element/Text';
import Textarea from './element/Textarea';
import Button from './element/Button';


const renderFields = (fields: any, resetValue: Boolean) => {
    if (!fields) {
        return (
            <div>
                <span className='text-grey-500 px-3 mb-6 md:mb-0'>Loading...</span>
            </div>
        );
    }
    return fields.map( (field: any) => {
        const { name, type } = field;
        switch (type) {
            case 'text':
            case 'email':
            case 'tel':
                return (
                    <Text key={name} field={field} resetValue={resetValue} />
                )
            case 'textarea':
                return (
                    <Textarea key={name} field={field} resetValue={resetValue} />
                )
            case 'button':
                return (
                    <Button key={name} field={field} />
                )
            default:
                return (
                    <div key={name}>
                        <span className='text-red-500 px-3 mb-6 md:mb-0'>Invalid Field</span>
                    </div>
                );
        }
        
    });
}


const Form = (props: any) => {
    const { title, fields } = props.template;
    const methods = useForm();
    
    return (
        <FormProvider {...methods}>
            <div className='Form'>
                <form
                className="px-5 py-5 my-20 max-w-3xl mx-auto space-y-6 border border-teal-400 rounded"
                onSubmit={methods.handleSubmit((props.handleSubmit)? props.handleSubmit : (v) => {
                    console.log(v);
                })}>
                    <h4> {title} </h4>
                    { renderFields(fields, props.resetValue) }
                </form>
            </div>
        </FormProvider>
    )
}

export default Form;