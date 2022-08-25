import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const Text = (props: any) => {
    const { title, type, name, validationProps, value } = props.field;
    const { register, formState: { errors }, setValue } = useFormContext();

    useEffect(() => {
        if (props.resetValue) {
            setValue(name, '');
        }
        console.log('useEffect -> reset -> ' + name);
    }, [props.resetValue]);


    useEffect(() => {
        if (value) {
            setValue(name, value);
        }
        console.log('useEffect -> set -> ' + name);
    }, [value]);
    
    return (
        <div key={ name } className="Text">
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={ name }>
                    { title }
                </label>
                <input 
                {...register(name, (validationProps) ? validationProps : {})}
                className={`${ (errors[name]) ? "border-red-500" : "border-grey-400" } appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                id={name}
                type={type}
                // value={value} 
                />
                {errors[name] && 
                // <p>{errors[name].message}</p>
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                }
            </div>
        </div>
    );
}

export default Text;