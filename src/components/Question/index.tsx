
import './styles.scss'

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string
    }
}

const Question = ({author, content}: QuestionsProps) => {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    )
}


export {Question}