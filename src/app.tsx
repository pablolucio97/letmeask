import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/AdminRoom'
import './styles/styles.scss'
import { AuthContextProvider } from './contexts/AuthContextProvider'


function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/new-room' exact component={NewRoom} />
                    <Route path='/rooms/:id' component={Room} />
                    <Route path='/admin/rooms/:id' component={AdminRoom} />
                </Switch>
            </BrowserRouter>
        </AuthContextProvider>
    )
}

export default App;