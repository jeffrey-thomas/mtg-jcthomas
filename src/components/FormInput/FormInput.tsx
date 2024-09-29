import React from "react";
import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form"

import './FormInput.css'

type FormInputType = 'text' | 'number' | 'password';

type FormInputProps = { field:string, type?:FormInputType} & React.ComponentProps<'input'>;

export const FormInput=({field, children, ...props}:PropsWithChildren<FormInputProps>) => {

    // const {field, ...fieldProps } = props;
    const {register } = useFormContext();



    return (
            <label htmlFor={field} className="formInput">{children}
                <input {...props}  {...register(field,{valueAsNumber:props.type==='number'})} name={field} id={field} />
            </label>
    )
}