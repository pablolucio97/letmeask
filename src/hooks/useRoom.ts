import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"


type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}


type FirebaseQuestions = Record<string, {
    
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>

}>


const useRoom = (roomId: string) => {
    
    const [questions, setQuestions] = useState<Question[]>([])
    const [classTitle, setClassTitle] = useState('')

    const {user} = useAuth()

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
                    isHighlighted: value.isHighLighted,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes?? {}).find(([key, value]) => value.authorId === user?.id)?.[0]
                }
            })
            setQuestions(parsedQuestions)
            setClassTitle(databaseRoom.title)
        })

        return () => {roomRef.off('value')}


    }, [roomId, user?.id])

    return {questions, classTitle}

}

export {useRoom}