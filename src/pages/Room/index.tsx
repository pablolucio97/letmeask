
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import './styles.scss'

type RoomParams = {
    id: string
}

type FirebaseQuestions = Record<string, {

    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;

}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

function Room() {

    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [classTitle, setClassTitle] = useState('')

    const params = useParams<RoomParams>()
    const roomId = params.id

    useEffect(() => {

        const roomRef = database.ref(`/rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {}
            const parsedQuestions = Object.entries(firebaseQuestions).map( ([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighLighted
                }
            })
            setQuestions(parsedQuestions)
            setClassTitle(databaseRoom.title)
        })



    }, [roomId])


    console.log(roomId)

    const { user } = useAuth()

    async function createNewQuestion(e: FormEvent) {

        e.preventDefault()

        if (newQuestion.trim() === '') {
            return
        }

        if (!user) {
            throw new Error('You must be loged in.')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                id: user.id,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')

    }

    return (
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div><RoomCode roomCode={roomId} /></div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {classTitle}</h1>
                    {questions.length > 0 ?  
                        <span>{questions.length} pergunta(s)</span>
                        :
                        <span>Ainda não existem perguntas</span>
                    }
                </div>
                <form onSubmit={createNewQuestion}>
                    <textarea
                        placeholder='O que você quer perguntar?'
                        onChange={e => { setNewQuestion(e.target.value) }}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {
                            user ?
                                <div className='user-info'>
                                    <img src={user.avatar} alt="letmeask" />
                                    <span>{user.name}</span>
                                </div>
                                :
                                <span>Para enviar uma pergunta,
                                    <button>faça seu login.</button>
                                </span>
                        }
                        <Button type='submit'>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                {questions.map(question => (
                   <div className="questions-list">
                        <Question
                        key={question.id}
                        author={question.author}
                        content={question.content}
                    />
                   </div>
                ))}

            </main>
        </div>
    )
}

export { Room }