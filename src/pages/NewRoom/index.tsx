import illustration from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'

import './styles.scss'
import { Button } from '../../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'



const NewRoom = () => {

    const [newRoom, setNewRoom] = useState('')

    const { user } = useAuth()

    const history = useHistory()


    async function createRoom(e: FormEvent) {
        e.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms');

        const newFirebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${newFirebaseRoom.key}`)

    }

    return (
        <div className='page-auth' id='page-auth'>
            <aside>
                <img src={illustration} alt="letmeask" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real.</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={createRoom}>
                        <input
                            type="text"
                            placeholder='Nome da sala'
                            onChange={e => setNewRoom(e.currentTarget.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente?
                        <Link to="/" style={{ textDecoration: 'none' }}> Clique aqui.</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export { NewRoom }