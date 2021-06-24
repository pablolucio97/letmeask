
import { FormEvent, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import deleteImg from '../../assets/delete.svg'

import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { useRoom } from '../../hooks/useRoom'

import './styles.scss'


type RoomParams = {
    id: string
}



function AdminRoom() {

    const [newQuestion, setNewQuestion] = useState('')


    const params = useParams<RoomParams>()
    const roomId = params.id

    const history = useHistory()


    const { classTitle, questions } = useRoom(roomId)

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

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
             await database.ref(`rooms/${roomId}/questions/${questionId}`)
            .remove()
        }
    }

    async function handleEndRoom(){
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    return (
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode roomCode={roomId} />
                        <Button isOutilined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
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
               
                {questions.map(question => (
                    <div className="questions-list">
                        <Question
                            key={question.id}
                            author={question.author}
                            content={question.content}
                        >
                            <button
                                className='like-button'
                                type='button'
                                aria-label='Marcar como gostei'
                                onClick={() => {handleDeleteQuestion(question.id)}}
                            >
            
                            <img src={deleteImg} alt="letmeask" />
                            </button>
                        </Question>
                    </div>
                ))}

            </main>
        </div>
    )
}

export { AdminRoom }