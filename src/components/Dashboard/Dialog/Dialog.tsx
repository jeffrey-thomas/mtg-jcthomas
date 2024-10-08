import React, { PropsWithChildren } from "react";
import './Dialog.css'

//React component for a dialog box
export const Dialog = (props:PropsWithChildren)=>{

    return(
        <div className='dialog-exterior'>
            <div className='dialog-interior'>
                {props.children}
            </div>
        </div>
    )
}