import illustration from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'

import './styles.scss'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


const NewRoom = () => {

 /*    const {user} = useAuth() */

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
                    <form>
                        <input
                            type="text"
                            placeholder='Nome da sala'
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? 
                        <Link to="/" style={{textDecoration: 'none'}}>Clique aqui.</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export { NewRoom }