
import { ReactNode } from 'react'
import './styles.scss'
import ClassNames from 'classnames'

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string
    };
    children?: ReactNode;
    isAnswered?: boolean;
}

const Question = ({
    author,
    content,
    children,
    isAnswered = false,
}: QuestionsProps) => {
    return (
        <div className={
            ClassNames(
                'question',
                {answered : isAnswered},
            )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}


export {Question}