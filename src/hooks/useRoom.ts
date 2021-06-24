import { useEffect, useState } from "react"
import { database } from "../services/firebase"


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


type FirebaseQuestions = Record<string, {

    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;

}>


const useRoom = (roomId: string) => {
    
    const [questions, setQuestions] = useState<Question[]>([])
    const [classTitle, setClassTitle] = useState('')

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

    return {questions, classTitle}

}

export {useRoom}