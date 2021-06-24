import {ButtonHTMLAttributes} from 'react'

import './styles.scss'

type ButtonDefaultProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutilined?: boolean;
}

const Button = ({isOutilined = false, ...props}: ButtonDefaultProps) => {
    return (
        <button 
        className={`button ${isOutilined? 'outlined' : ''}`}
         {...props}
        />
    )
}


export {Button}