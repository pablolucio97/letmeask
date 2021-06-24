import { useHistory } from 'react-router-dom'

import './styles.scss'
import illustration from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'
import googleIconImg from '../../assets/google-icon.svg'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'


const Home = () => {

    const history = useHistory()

    const {signInWithGoogleFirebase, user} = useAuth()

    async function handleCreateRoom() {
        if(!user){
           await signInWithGoogleFirebase()
        }
        history.push('/new-room')
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
                    <button className='create-room'
                        onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="letmeask" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder='Digite o código da sala'
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export { Home }