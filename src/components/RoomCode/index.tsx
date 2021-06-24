
import './styles.scss'
import copyImg from '../../assets/copy.svg'


type RoomCodeProps = {
    roomCode: string;
}

const RoomCode = (props: RoomCodeProps) => {


    function copyRoomCode() {
        navigator.clipboard.writeText(props.roomCode)
    }

    return (
        <button className='room-code' onClick={copyRoomCode}>
            <div><img src={copyImg} alt="letmeask" /></div>
            <span>Sala {props.roomCode}</span>
        </button>
    )
}


export { RoomCode }