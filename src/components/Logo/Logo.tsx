import React from "react"

//React component for the app logo - allows recoloring with css
export const Logo = ()=>{



    return (
        <svg viewBox='0 0 52 42' className="Logo">
            <defs>
                <mask id='Mask'>
                    <rect x='0' y='0' width='50' height='50' fill='black'/>
                    <rect fill='#222' x='-2.5' y='-32.5' width='25' height='35' rx='2.5' ry='2.5' transform=' translate(16,39) rotate(-25)'/>
                    <rect fill='#444' x='-2.5' y='-32.5' width='25' height='35' rx='2.5' ry='2.5' transform=' translate(16,39) rotate(-20)'/>
                    <rect fill='#666' x='-2.5' y='-32.5' width='25' height='35' rx='2.5' ry='2.5' transform=' translate(16,39) rotate(-15)'/>
                    <rect fill='#888' x='-2.5' y='-32.5' width='25' height='35' rx='2.5' ry='2.5' transform=' translate(16,39) rotate(-10)'/>
                    <rect fill='#aaa' x='-2.5' y='-32.5' width='25' height='35' rx='2.5' ry='2.5' transform=' translate(16,39) rotate(-5)'/>
                    <g transform='translate(16, 39)'>
                        <rect fill='#fff' x='-2.5' y='-32.5' width='25' height='35' rx='2.5' ry='2.5'/>
                        <text x='0' y='-15' textLength='20' fill='black' fontSize='10px' fontWeight='bold'>MtG</text>
                        <text x='0' y='-8' textLength='20' fill='black' fontSize='5px' fontWeight='bold'>Organizer</text>
                    </g>
                </mask>
            </defs>
            <rect x='0' y='0' width='50' height='50' fill='current' mask='url(#Mask)'/>

        </svg>
    )
}