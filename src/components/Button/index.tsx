import {ButtonHTMLAttributes} from 'react'

import './styles.scss'

type ButtonDefaultProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonDefaultProps) => {
    return (
        <button className='button' {...props}/>
    )
}


export {Button}